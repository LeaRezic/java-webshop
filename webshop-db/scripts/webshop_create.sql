
------------------------------------------------------------------------------------------------
-- ROLE, USER ACCOUNT, USER DETAILS

CREATE TABLE role (
 role_id serial PRIMARY KEY,
 role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE user_account (
 user_account_id serial PRIMARY KEY,
 uuid VARCHAR(36) UNIQUE NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 password VARCHAR (50) NOT NULL,
 role_id integer NOT NULL,
 created_on TIMESTAMP NOT NULL,
 last_login TIMESTAMP,
 active BOOLEAN NOT NULL,
 CONSTRAINT user_account_role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role (role_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


------------------------------------------------------------------------------------------------
-- LOGS

CREATE TABLE login_log (
    login_log_id serial PRIMARY KEY,
    username VARCHAR(355) NOT NULL,
    ip_address VARCHAR(16) NOT NULL,
    login_date TIMESTAMP NOT NULL,
    register BOOLEAN NOT NULL,
    CONSTRAINT login_log_username_fkey FOREIGN KEY (username)
        REFERENCES user_account (email) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

------------------------------------------------------------------------------------------------
-- CATEGORY, SUBCATEGORY, MANUFACTURER

CREATE TABLE product_category (
    product_category_id serial PRIMARY KEY,
    name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE product_subcategory (
    product_subcategory_id serial PRIMARY KEY,
    product_category_id INTEGER NOT NULL,
    name VARCHAR (255) NOT NULL,
    CONSTRAINT product_subcategory_product_category_id_fkey FOREIGN KEY (product_category_id)
        REFERENCES product_category (product_category_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE product_manufacturer (
    product_manufacturer_id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL
);

------------------------------------------------------------------------------------------------
-- PRODUCT, GAME DETAILS, EXPANSION DETAILS

CREATE TABLE product (
    product_id serial PRIMARY KEY,
    product_subcategory_id INTEGER NOT NULL,
    product_manufacturer_id INTEGER NOT NULL,
    name VARCHAR (255) NOT NULL,
    description TEXT,
    picture_url VARCHAR (255),
    external_url VARCHAR (255),
    price NUMERIC(15,2) NOT NULL,
    CONSTRAINT product_product_subcategory_id_fkey FOREIGN KEY (product_subcategory_id)
        REFERENCES product_subcategory (product_subcategory_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT product_product_manufacturer_id_fkey FOREIGN KEY (product_manufacturer_id)
        REFERENCES product_manufacturer (product_manufacturer_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

------------------------------------------------------------------------------------------------
-- RECEIPT, ITEM

CREATE TABLE receipt (
    receipt_id serial PRIMARY KEY,
    user_account_id INTEGER NOT NULL,
    receipt_number VARCHAR (25) NOT NULL,
    credit_card BOOLEAN NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    CONSTRAINT receipt_user_account_id_fkey FOREIGN KEY (user_account_id)
        REFERENCES user_account (user_account_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE receipt_item (
    receipt_item_id serial PRIMARY KEY,
    receipt_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    CONSTRAINT receipt_item_receipt_id_fkey FOREIGN KEY (receipt_id)
        REFERENCES receipt (receipt_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
