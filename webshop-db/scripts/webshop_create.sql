------------------------------------------------------------------------------------------------
-- COUNTRY, CITY

CREATE TABLE country (
    country_id serial PRIMARY KEY,
    name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE city (
    city_id serial PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    country_id INTEGER NOT NULL,
    CONSTRAINT city_country_id_fkey FOREIGN KEY (country_id)
        REFERENCES country (country_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

------------------------------------------------------------------------------------------------
-- ROLE, USER ACCOUNT, USER DETAILS

CREATE TABLE role (
 role_id serial PRIMARY KEY,
 role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE user_account (
 user_account_id serial PRIMARY KEY,
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

CREATE TABLE user_details (
    user_details_id serial PRIMARY KEY,
    user_account_id INTEGER NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    female BOOLEAN NOT NULL,
    city_id INTEGER,
    full_street TEXT,
    phone VARCHAR (25),
    CONSTRAINT user_details_user_account_id_fkey FOREIGN KEY (user_account_id)
        REFERENCES user_account (user_account_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT user_details_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES city (city_id) MATCH SIMPLE
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
    price MONEY NOT NULL,
    CONSTRAINT product_product_subcategory_id_fkey FOREIGN KEY (product_subcategory_id)
        REFERENCES product_subcategory (product_subcategory_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT product_product_manufacturer_id_fkey FOREIGN KEY (product_manufacturer_id)
        REFERENCES product_manufacturer (product_manufacturer_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE game_details (
    game_details_id serial PRIMARY KEY,
    product_id INTEGER UNIQUE NOT NULL,
    players_min INTEGER NULL,
    players_max INTEGER NULL,
    playtime_from INTEGER NULL,
    playtime_to INTEGER NULL,
    instructions_video_url TEXT NULL,
    CONSTRAINT game_details_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE expansion_details (
    expansion_details_id serial PRIMARY KEY,
    product_id INTEGER UNIQUE NOT NULL,
    base_game_id INTEGER NOT NULL,
    added_players_num INTEGER NULL,
    added_playtime INTEGER NULL,
    CONSTRAINT expansion_details_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT expansion_details_base_game_id_fkey FOREIGN KEY (base_game_id)
        REFERENCES game_details (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

------------------------------------------------------------------------------------------------
-- RECEIPT, ITEM

CREATE TABLE receipt (
    receipt_id serial PRIMARY KEY,
    user_details_id INTEGER NOT NULL,
    receipt_number VARCHAR (25) NOT NULL,
    credit_card BOOLEAN NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    CONSTRAINT receipt_user_details_id_fkey FOREIGN KEY (user_details_id)
        REFERENCES user_details (user_details_id) MATCH SIMPLE
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