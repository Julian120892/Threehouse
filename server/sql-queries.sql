DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL primary key,
    product_name VARCHAR(255) NOT NULL,
    product_price VARCHAR(255) NOT NULL,
    product_description VARCHAR NOT NULL,
    product_picture VARCHAR
);




DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    zip VARCHAR(255),
    adress VARCHAR(255)
);



DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL primary key,
    customer_id INT REFERENCES users(id) NOT NULL,
    order_id SERIAL,
    items VARCHAR(255),
    price DECIMAL(10,2),
    order_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    shipping BOOLEAN,
    payment_status BOOLEAN,
    shipping_reference VARCHAR
);


