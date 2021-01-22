DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL primary key,
    product_name VARCHAR(255) NOT NULL,
    product_price VARCHAR(255) NOT NULL,
    product_description VARCHAR NOT NULL,
    product_picture VARCHAR
);




        UPDATE products 
        SET product_picture = 'https://julianbucketthreehouse.s3.eu-central-1.amazonaws.com/CoiF5im01z0T3yKEd4-Pvh6P916La1jN.png'
        WHERE id = 6
        ;


