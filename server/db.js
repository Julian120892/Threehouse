const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:julian:pet@localhost:5432/threehouse"
);
//("WhoAreWeTalkingTo:WichDBuserWillRunCommands:TheUserPassword@WhichPort/nameOfDatabase")

module.exports.addNewProduct = (name, price, description) => {
    const q = `INSERT INTO products (product_name, product_price, product_description)
    VALUES ($1, $2, $3)
    RETURNING id `;
    const params = [name, price, description];
    return db.query(q, params);
};

module.exports.uploadProductPic = (product_id, url) => {
    console.log("server upload of picture", url, product_id);
    const q = ` 
        UPDATE products 
        SET product_picture = $2
        WHERE id = $1
        ;
    `;
    const params = [product_id, url];
    return db.query(q, params);
};

module.exports.getProducts = () => {
    const q = `SELECT * FROM products;`;
    return db.query(q);
};

module.exports.updateProduct = (name, price, description, id) => {
    const q = ` 
        UPDATE products 
        SET product_name = $1, product_price = $2, product_description = $3
        WHERE id = $4
        ;
    `;
    const params = [name, price, description, id];
    return db.query(q, params);
};

module.exports.deleteProduct = (id) => {
    const q = ` 
        DELETE FROM products 
        WHERE id = $1
        ;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getSpecificProduct = (product) => {
    const q = `
SELECT * FROM products WHERE id = $1;
    `;
    const params = [product];
    return db.query(q, params);
};

///USER TABELS
module.exports.newUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.loginIn = (email) => {
    const q = `SELECT password, id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getEmail = (email) => {
    const q = `SELECT email FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};
