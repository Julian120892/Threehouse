const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL || "postgres:julian:pet@localhost:5432/threehouse"
);
//("WhoAreWeTalkingTo:WichDBuserWillRunCommands:TheUserPassword@WhichPort/nameOfDatabase")

module.exports.newProduct = (name, price, description) => {
    const q = `INSERT INTO users (name, price, description)
    VALUES ($1, $2, $3)
    RETURNING id `;
    const params = [name, price, description];
    return db.query(q, params);
};

module.exports.uploadProductPic = (product_id, url) => {
    console.log("server upload of picture");
    const q = ` 
        UPDATE product 
        SET picture = $2
        WHERE id = $1
        ;
    `;
    const params = [product_id, url];
    return db.query(q, params);
};
