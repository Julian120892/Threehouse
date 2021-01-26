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
    RETURNING id; `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.loginIn = (email) => {
    const q = `SELECT password, id FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getEmail = (email) => {
    const q = `SELECT email FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserData = (id) => {
    const q = `SELECT first, last, email, adress, city, zip 
                FROM users 
                WHERE id = $1;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.updateAdress = (id, adress, city, zip) => {
    const q = `UPDATE users 
    SET adress = $2, city = $3, zip = $4
    WHERE id = $1; `;
    const params = [id, adress, city, zip];
    return db.query(q, params);
};

module.exports.addOrder = (id, items, price) => {
    const q = `INSERT INTO orders (customer_id, items, price, payment_status, shipping)
    VALUES ($1, $2, $3, false, false)
    RETURNING id
    ;`;
    const params = [id, items, price];
    return db.query(q, params);
};

module.exports.getOrders = () => {
    const q = `
        SELECT users.first, users.last, users.email, users.adress, orders.id, 
        users.zip, users.city, customer_id, items, order_timestamp, shipping_reference,
        price, payment_status, shipping
        FROM orders
        JOIN users
        ON ( customer_id = users.id)
        ORDER BY order_timestamp DESC;`;
    return db.query(q);
};

module.exports.changePaymentStatus = (orderId) => {
    const q = `UPDATE orders 
    SET payment_status = true
    WHERE id = $1
    ;`;
    const params = [orderId];
    return db.query(q, params);
};

module.exports.getLastOrder = () => {
    const q = `SELECT users.first, users.last, users.email, users.adress, orders.id, 
                users.zip, users.city, customer_id, items, order_timestamp,
                price, payment_status, shipping
                FROM orders 
                JOIN users
                ON ( customer_id = users.id)
                ORDER BY order_timestamp DESC
                LIMIT 1
                ;
    `;
    return db.query(q);
};

module.exports.deleteOrder = (id) => {
    const q = ` 
        DELETE FROM orders 
        WHERE id = $1
        ;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.updateShipping = (id, ref) => {
    const q = `UPDATE orders 
    SET shipping = true, shipping_reference = $2
    WHERE id = $1
    ;`;
    const params = [id, ref];
    return db.query(q, params);
};
