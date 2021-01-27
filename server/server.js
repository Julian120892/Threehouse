const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const s3 = require("./s3");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const db = require("./db");
const multer = require("multer");
const config = require("./config.json");
const uidSafe = require("uid-safe");
const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/uploads");
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 20971520,
    },
});
const cookieSessionMiddleware = cookieSession({
    secret: `crocs are awesome`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

/////////////////////////////////Middlewear/////////////////////////////////
app.use(compression());

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

/////////////////////////////////Server Routes/////////////////////////////////
app.get("/getShoppingCartItems", (req, res) => {
    console.log("request for shoopigcart", req.query.value);

    if (!req.query.value) {
        console.log("no items in cart");
    } else {
        db.getSpecificProduct(req.query.value)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("error in getShoppingCartItems", err);
                res.statusCode(500);
            });
    }
});

app.get("/userData", (req, res) => {
    db.getUserData(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in get user data ", err);
        });
});

app.post("/adress", (req, res) => {
    console.log(req.body);
    db.updateAdress(
        req.session.userId,
        req.body.adress,
        req.body.city,
        req.body.zip
    )
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(300);
        });
});

/////////////////////LOGIN AND REGISTRATION///////////////////////////////

app.get("/userLoggedIn", (req, res) => {
    console.log("request for login data");
    console.log(req.session.userId);
    if (!req.session.userId) {
        console.log("user is not logged in");
        res.json({ loggedin: false });
    } else if (req.session.userId) {
        console.log("user is logged in");
        res.json({ loggedin: true });
    }
});

app.post("/logout", (req, res) => {
    req.session.userId = null;
    res.json({
        success: true,
    }).catch((err) => {
        console.log(err);
        res.sendStatus(300);
    });
});

app.post("/registration", (req, res) => {
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hash) => {
            db.newUser(first, last, email, hash)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.redirect("/");
                })
                .catch((err) => {
                    console.log("error in db.register", err);
                    res.sendStatus(300);
                });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(300);
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.loginIn(email)
        .then(({ rows }) => {
            compare(password, rows[0].password).then((result) => {
                if (result) {
                    console.log("true");
                    req.session.userId = rows[0].id;
                    res.redirect("/");
                } else {
                    res.sendStatus(404);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(300);
        });
});

/////////////////////////////////Orders/////////////////////////////////

app.post("/order", (req, res) => {
    console.log(req.body);
    db.addOrder(req.session.userId, req.body.items, req.body.price)
        .then(({ rows }) => {
            console.log("succes", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(300);
        });
});

app.get("/recent", (req, res) => {
    console.log("request fpr orders");
    db.getOrders()
        .then(({ rows }) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/paymentstatus", (req, res) => {
    console.log(req.body.params.orderId);
    db.changePaymentStatus(req.body.params.orderId)
        .then(() => {
            console.log("success");
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in paymentstatus", err);
            res.sendStatus(500);
        });
});

app.get("/payment", (req, res) => {
    db.getLastOrder()
        .then(({ rows }) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

/////////////////////////////////Admin Console/////////////////////////////////
app.get("/product-list", (req, res) => {
    db.getProducts()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("error in getProducts", err);
            res.sendStatus(500);
        });
});

app.post("/product", (req, res) => {
    db.addNewProduct(
        req.body.productName,
        req.body.productPrice,
        req.body.productDescription
    )
        .then(({ rows }) => {
            req.session.productId = rows[0].id;
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in addNewProduct", err);
            res.sendStatus(500);
        });
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    if (req.file) {
        const url = config.s3Url + req.file.filename;
        let id = req.session.productId;
        console.log(id);

        db.uploadProductPic(id, url)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("error in uploader", err);
                res.sendStatus(500);
            });
    } else {
        res.json({ success: false });
    }
});

app.post("/upload/:id", uploader.single("image"), s3.upload, (req, res) => {
    console.log("request for picture");
    if (req.file) {
        const url = config.s3Url + req.file.filename;
        let id = req.path.split("/");
        console.log("id", id[2]);

        db.uploadProductPic(id[2], url)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("error in uploader", err);
                res.sendStatus(500);
            });
    } else {
        res.json({ success: false });
    }
});

app.post("/product/edit", (req, res) => {
    db.updateProduct(
        req.body.updateObj.updateName,
        req.body.updateObj.updatePrice,
        req.body.updateObj.updateDescription,
        req.body.updateObj.id
    )
        .then(() => {
            console.log("succes");
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in uploader", err);
            res.sendStatus(500);
        });
});

app.post("/product/delete", s3.delete, (req, res) => {
    console.log(req.body.params);
    db.deleteProduct(req.body.params.id)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in uploader", err);
            res.sendStatus(500);
        });
});

app.post("/deleteorder", (req, res) => {
    console.log(req.body.params.orderId);
    db.deleteOrder(req.body.params.orderId)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in deleteOrder", err);
            res.sendStatus(500);
        });
});

app.post("/dispatch", (req, res) => {
    let id = req.body.params.orderId;
    let ref = req.body.params.referenceNumber;

    console.log(ref);
    db.updateShipping(id, ref)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in dispatch", err);
            res.sendStatus(500);
        });
});

/////////////////////////////////////////////////

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening on 3000.");
});
