DROP DATABASE IF EXISTS
    pharmacy_db;

CREATE DATABASE pharmacy_db;

\c pharmacy_db

CREATE EXTENSION postgis;

DROP TABLE IF EXISTS
    cart_items,
    order_items,
    catalogs,
    shipping_methods,
    logistic_partners,
    orders,
    order_groups,
    payment_methods,
    order_statuses,
    product_category_maps,
    products,
    manufacturers,
    product_forms,
    product_classifications,
    product_categories,
    pharmacists,
    pharmacies,
    partners,
    addresses,
    users,
    admins,
    credentials,
    roles;

CREATE TABLE roles (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                       deleted_at TIMESTAMP
);

CREATE TABLE credentials (
                             id BIGSERIAL PRIMARY KEY,
                             role_id BIGINT NOT NULL REFERENCES roles(id),
                             email VARCHAR NOT NULL,
                             password VARCHAR,
                             created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             deleted_at TIMESTAMP
);

CREATE TABLE admins (
                        id BIGSERIAL PRIMARY KEY,
                        credential_id BIGINT NOT NULL REFERENCES credentials(id),
                        name VARCHAR NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at TIMESTAMP
);

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       credential_id BIGINT NOT NULL REFERENCES credentials(id),
                       name VARCHAR NOT NULL,
                       gender BOOLEAN,
                       profile_picture VARCHAR,
                       is_verified BOOLEAN NOT NULL DEFAULT FALSE,
                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                       deleted_at TIMESTAMP
);

CREATE TABLE partners (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR NOT NULL,
                          year_founded INTEGER NOT NULL,
                          active_days VARCHAR NOT NULL,
                          operational_hour_start TIME NOT NULL,
                          operational_hour_end TIME NOT NULL,
                          is_active BOOLEAN NOT NULL DEFAULT FALSE,
                          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          deleted_at TIMESTAMP
);

CREATE TABLE pharmacies (
                            id BIGSERIAL PRIMARY KEY,
                            partner_id BIGINT NOT NULL REFERENCES partners(id),
                            location GEOGRAPHY(Point, 4326) NOT NULL,
                            days INTEGER NOT NULL,
                            logo VARCHAR NOT NULL,
                            name VARCHAR NOT NULL,
                            is_active BOOLEAN NOT NULL DEFAULT FALSE,
                            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            deleted_at TIMESTAMP
);

CREATE TABLE addresses (
                           id BIGSERIAL PRIMARY KEY,
                           user_id BIGINT REFERENCES users(id),
                           pharmacy_id BIGINT REFERENCES pharmacies(id),
                           province VARCHAR NOT NULL,
                           city VARCHAR NOT NULL,
                           district VARCHAR NOT NULL,
                           subdistrict VARCHAR NOT NULL,
                           postal_code VARCHAR NOT NULL,
                           name VARCHAR NOT NULL,
                           phone_number VARCHAR NOT NULL,
                           is_active BOOLEAN NOT NULL DEFAULT FALSE,
                           location GEOGRAPHY(Point, 4326) NOT NULL,
                           label VARCHAR,
                           created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                           updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                           deleted_at TIMESTAMP
);

CREATE TABLE pharmacists (
                             id BIGSERIAL PRIMARY KEY,
                             credential_id BIGINT NOT NULL REFERENCES credentials(id),
                             pharmacy_id BIGINT REFERENCES pharmacies(id),
                             name VARCHAR NOT NULL,
                             sipa_number VARCHAR NOT NULL,
                             phone_number VARCHAR NOT NULL,
                             years_of_experience INTEGER NOT NULL,
                             created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             deleted_at TIMESTAMP
);

CREATE TABLE product_categories (
                                    id BIGSERIAL PRIMARY KEY,
                                    name VARCHAR NOT NULL,
                                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                    deleted_at TIMESTAMP
);

CREATE TABLE product_classifications (
                                         id BIGSERIAL PRIMARY KEY,
                                         name VARCHAR NOT NULL,
                                         created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                         updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                         deleted_at TIMESTAMP
);

CREATE TABLE product_forms (
                               id BIGSERIAL PRIMARY KEY,
                               name VARCHAR NOT NULL,
                               created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                               updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                               deleted_at TIMESTAMP
);

CREATE TABLE manufacturers (
                               id BIGSERIAL PRIMARY KEY,
                               name VARCHAR NOT NULL,
                               created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                               updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                               deleted_at TIMESTAMP
);

CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          product_classification_id BIGINT NOT NULL REFERENCES product_classifications(id),
                          product_form_id BIGINT REFERENCES product_forms(id),
                          manufacturer_id BIGINT NOT NULL REFERENCES manufacturers(id),
                          name VARCHAR NOT NULL,
                          generic_name VARCHAR,
                          description VARCHAR NOT NULL,
                          unit_in_pack INTEGER,
                          selling_unit VARCHAR,
                          weight DECIMAL NOT NULL,
                          height DECIMAL NOT NULL,
                          length DECIMAL NOT NULL,
                          width DECIMAL NOT NULL,
                          image VARCHAR NOT NULL,
                          is_active BOOLEAN NOT NULL DEFAULT FALSE,
                          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          deleted_at TIMESTAMP
);

CREATE TABLE product_category_maps (
                                       id BIGSERIAL PRIMARY KEY,
                                       product_id BIGINT NOT NULL REFERENCES products(id),
                                       product_category_id BIGINT NOT NULL REFERENCES product_categories(id),
                                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                       updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                       deleted_at TIMESTAMP
);

CREATE TABLE order_statuses (
                                id BIGSERIAL PRIMARY KEY,
                                name VARCHAR NOT NULL,
                                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                deleted_at TIMESTAMP
);

CREATE TABLE payment_methods (
                                 id BIGSERIAL PRIMARY KEY,
                                 name VARCHAR NOT NULL,
                                 created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                 updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                 deleted_at TIMESTAMP
);

CREATE TABLE order_groups (
                              id BIGSERIAL PRIMARY KEY,
                              user_id BIGINT NOT NULL REFERENCES users(id),
                              proof VARCHAR,
                              created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                              updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                              deleted_at TIMESTAMP
);

CREATE TABLE logistic_partners (
                                   id BIGSERIAL PRIMARY KEY,
                                   name VARCHAR NOT NULL,
                                   code VARCHAR,
                                   rate BIGINT,
                                   courier VARCHAR,
                                   days INTEGER NOT NULL,
                                   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                   updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                   deleted_at TIMESTAMP
);

CREATE TABLE orders (
                        id BIGSERIAL PRIMARY KEY,
                        user_id BIGINT NOT NULL REFERENCES users(id),
                        address_id BIGINT NOT NULL REFERENCES addresses(id),
                        status_id BIGINT NOT NULL REFERENCES order_statuses(id),
                        payment_method_id BIGINT NOT NULL REFERENCES payment_methods(id),
                        pharmacy_id BIGINT NOT NULL REFERENCES pharmacies(id),
                        logistic_partner_id BIGINT NOT NULL REFERENCES logistic_partners(id),
                        order_group_id BIGINT NOT NULL REFERENCES order_groups(id),
                        total_price_product DECIMAL NOT NULL,
                        total_price_shipping DECIMAL NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at TIMESTAMP
);

CREATE TABLE shipping_methods (
                                  id BIGSERIAL PRIMARY KEY,
                                  pharmacy_id BIGINT NOT NULL REFERENCES pharmacies(id),
                                  logistic_partner_id BIGINT NOT NULL REFERENCES logistic_partners(id),
                                  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                                  deleted_at TIMESTAMP
);

CREATE TABLE catalogs (
                          id BIGSERIAL PRIMARY KEY,
                          pharmacy_id BIGINT NOT NULL REFERENCES pharmacies(id),
                          product_id BIGINT NOT NULL REFERENCES products(id),
                          stock INTEGER NOT NULL,
                          price DECIMAL NOT NULL,
                          is_active BOOLEAN NOT NULL DEFAULT FALSE,
                          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                          deleted_at TIMESTAMP
);

CREATE TABLE order_items (
                             id BIGSERIAL PRIMARY KEY,
                             order_id BIGINT NOT NULL REFERENCES orders(id),
                             catalog_id BIGINT NOT NULL REFERENCES catalogs(id),
                             quantity INTEGER NOT NULL,
                             created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                             deleted_at TIMESTAMP
);

CREATE TABLE cart_items (
                            id BIGSERIAL PRIMARY KEY,
                            user_id BIGINT NOT NULL REFERENCES users(id),
                            product_id BIGINT NOT NULL REFERENCES products(id),
                            quantity INTEGER NOT NULL,
                            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                            deleted_at TIMESTAMP
);

--CREATE TABLE raja_ongkir_ids (
--	id BIGSERIAL PRIMARY KEY,
--	postal_code VARCHAR NOT NULL,
--	raja_ongkir_id BIGINT NOT NULL,
--	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
--	deleted_at TIMESTAMP
--);


DROP INDEX IF EXISTS
    idx_products_active,
    idx_catalogs_pharmacy_product,
    idx_catalogs_available,
    idx_pharmacies_active,
    idx_pharmacies_location;

CREATE INDEX idx_products_active
    ON products(is_active, deleted_at)
    INCLUDE(id, name, image, selling_unit);

CREATE INDEX idx_catalogs_pharmacy_product
    ON catalogs(pharmacy_id, product_id);

CREATE INDEX idx_catalogs_available
    ON catalogs(is_active, deleted_at, stock)
    INCLUDE(id, product_id, pharmacy_id, price, stock);

CREATE INDEX idx_pharmacies_active
    ON pharmacies(is_active, deleted_at)
    INCLUDE(id, location, days);

CREATE INDEX idx_pharmacies_location
    ON pharmacies USING GIST(location);

-- DML
INSERT INTO roles(id, name)
VALUES
    (1, 'admin'),
    (2, 'user'),
    (3, 'pharmacist');

INSERT INTO credentials(role_id, email, password)
VALUES
    (1, 'admin@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'adam@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'alice@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'andrew@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'ben@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'charles@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'daniel@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'emma@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'grace@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'jack@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'jessica@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'julia@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'lucas@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'matthew@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'noah@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (2, 'sarah@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'alex@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'amanda@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'anna@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'brian@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'chloe@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'david@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'ethan@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'hannah@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'james@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'john@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'lily@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'mary@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'micheal@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'olivia@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G'),
    (3, 'sophia@mail.com', '$2a$10$Drf9XIq9dRWFrjifTuMjf.MBGDvKL0bi.3z5imaoNWm5WhFIWfh/G');

INSERT INTO admins(credential_id, name)
VALUES
    (1, 'Administrator');

INSERT INTO users(credential_id, name, gender, profile_picture)
VALUES
    (2, 'Adam', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (3, 'Alice', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (4, 'Andrew', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (5, 'Ben', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (6, 'Charles', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (7, 'Daniel', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (8, 'Emma', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (9, 'Grace', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (10, 'Jack', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (11, 'Jessica', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (12, 'Julia', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (13, 'Lucas', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (14, 'Matthew', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (15, 'Noah', FALSE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png'),
    (16, 'Sarah', TRUE, 'https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png');

INSERT INTO partners(name, year_founded, active_days, operational_hour_start, operational_hour_end, is_active)
VALUES
    ('Care Clinic', 2025, 'Monday,Tuesday,Wednesday,Thursday,Friday', '21:00:00', '22:00:00', TRUE),
    ('Care Solutions', 2015, 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '22:00:00', '23:00:00', TRUE),
    ('Care Wellness', 1999, 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '13:00:00', '15:00:00', TRUE),
    ('Elite Center', 1996, 'Monday,Tuesday,Friday,Sunday,Wednesday', '09:00:00', '14:00:00', TRUE),
    ('Global Aid', 2014, 'Tuesday,Wednesday,Thursday,Friday,Sunday', '07:00:00', '12:00:00', TRUE),
    ('Global Hospital', 2013, 'Monday,Tuesday,Thursday,Friday,Saturday', '18:00:00', '22:00:00', TRUE),
    ('Global Network', 2020, 'Monday,Tuesday,Wednesday,Thursday,Friday,Sunday', '22:00:00', '23:00:00', TRUE),
    ('Health Assist', 2024, 'Monday,Wednesday,Friday,Saturday,Sunday', '09:00:00', '16:00:00', TRUE),
    ('Health Center', 2022, 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '07:00:00', '15:00:00', TRUE),
    ('Health Group', 2022, 'Wednesday,Thursday,Saturday,Sunday', '13:00:00', '20:00:00', TRUE),
    ('Health Network', 1997, 'Monday,Thursday,Friday,Saturday,Wednesday', '16:00:00', '19:00:00', TRUE),
    ('Health Services', 2018, 'Monday,Tuesday,Thursday,Friday,Sunday', '20:00:00', '22:00:00', TRUE),
    ('Life Assist', 2019, 'Monday,Thursday,Wednesday,Friday,Saturday,Sunday', '11:00:00', '13:00:00', TRUE),
    ('Life Group', 1996, 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', '15:00:00', '17:00:00', TRUE),
    ('Medi Assist', 2007, 'Monday,Tuesday,Friday,Saturday,Sunday', '16:00:00', '19:00:00', TRUE),
    ('Medi Hospital', 2024, 'Monday,Tuesday,Wednesday,Saturday,Sunday,Thursday', '08:00:00', '10:00:00', TRUE),
    ('Medi Assist', 2001, 'Monday,Tuesday,Thursday,Friday,Saturday,Sunday', '18:00:00', '22:00:00', TRUE),
    ('Prime Aid', 1997, 'Monday,Tuesday,Wednesday,Thursday,Saturday,Sunday', '09:00:00', '12:00:00', TRUE),
    ('Vital Aid', 1997, 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '09:00:00', '12:00:00', TRUE),
    ('Vital Center', 2019, 'Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', '22:00:00', '23:00:00', TRUE);

INSERT INTO pharmacies(partner_id, name, logo, is_active, location, days)
VALUES
    (1, 'Care Pharmacy Point', 'logo_care_pharmacy_point', TRUE, 'SRID=4326;POINT (106.41151768231195 -6.1513630426202575)', 0),
    (1, 'Care Health Center', 'logo_care_health_center', FALSE, 'SRID=4326;POINT (106.74016082867598 -6.633972132949863)', 0),
    (3, 'Vital Medicines Store', 'logo_vital_medicines_store', FALSE, 'SRID=4326;POINT (106.55410367249598 -6.2139266681220136)', 0),
    (4, 'Elite Medic Hub', 'logo_elite_medic_hub', TRUE, 'SRID=4326;POINT (106.821235928229 -6.567998414613636)', 0),
    (5, 'Health Point Depot', 'logo_health_point_depot', TRUE, 'SRID=4326;POINT (107.13915810947603 -6.139690919917938)', 0),
    (5, 'Global Pharmacy Hub', 'logo_global_pharmacy_hub', TRUE, 'SRID=4326;POINT (106.73358421402138 -6.638667413881086)', 0),
    (7, 'True Medic Hub', 'logo_true_medic_hub', FALSE, 'SRID=4326;POINT (106.76456632355077 -6.502914207998171)', 0),
    (8, 'Prime Medic Mart', 'logo_prime_medic_mart', FALSE, 'SRID=4326;POINT (106.8095085662984 -6.279789490562294)', 0),
    (8, 'Health Supplies Point', 'logo_health_supplies_point', FALSE, 'SRID=4326;POINT (107.04958715382514 -6.396638272228415)', 0),
    (11, 'Prime Pharmacy Hub', 'logo_prime_pharmacy_hub', TRUE, 'SRID=4326;POINT (106.70909209558837 -6.373466098756126)', 0),
    (12, 'Medi Pharmacy Depot', 'logo_medi_pharmacy_depot', FALSE, 'SRID=4326;POINT (106.41151768231195 -6.1513630426202575)', 0),
    (12, 'Safe Medicines Hub', 'logo_safe_medicines_hub', TRUE, 'SRID=4326;POINT (106.55410367249598 -6.2139266681220136)', 0),
    (12, 'Safe Drug Store', 'logo_safe_drug_store', FALSE, 'SRID=4326;POINT (106.74016082867598 -6.633972132949863)', 0),
    (15, 'True Pharmacy Center', 'logo_true_pharmacy_center', FALSE, 'SRID=4326;POINT (106.821235928229 -6.567998414613636)', 0),
    (16, 'Well Pharmacy Depot', 'logo_well_pharmacy_depot', FALSE, 'SRID=4326;POINT (107.13915810947603 -6.139690919917938)', 0),
    (17, 'Well Supplies Store', 'logo_well_supplies_store', FALSE, 'SRID=4326;POINT (106.73358421402138 -6.638667413881086)', 0),
    (18, 'Medi Drug Mart', 'logo_medi_drug_mart', TRUE, 'SRID=4326;POINT (106.76456632355077 -6.502914207998171)', 1),
    (19, 'Global Drug Mart', 'logo_global_drug_mart', FALSE, 'SRID=4326;POINT (106.8095085662984 -6.279789490562294)', 0),
    (19, 'Vital Pharmacy Supplies', 'logo_vital_pharmacy_supplies', TRUE, 'SRID=4326;POINT (107.04958715382514 -6.396638272228415)', 0),
    (20, 'Elite Drug Mart', 'logo_elite_drug_mart', FALSE, 'SRID=4326;POINT (106.70909209558837 -6.373466098756126)', 0);

INSERT INTO pharmacists(credential_id, pharmacy_id, name, sipa_number, phone_number, years_of_experience)
VALUES
    (17, 4, 'Alex', '28055319', '+16079756171', 5),
    (18, 2, 'Amanda', '49137241', '+17122569303', 4),
    (19, 1, 'Anna', '72678520', '+16650531184', 2),
    (20, 6, 'Brian', '41572051', '+19449236838', 8),
    (21, 1, 'Chloe', '41493956', '+15224459768', 4),
    (22, 2, 'David', '88516233', '+12148719556', 3),
    (23, 5, 'Ethan', '79860855', '+17105778077', 4),
    (24, 5, 'Hannah', '27935034', '+11141357444', 3),
    (25, 7, 'James', '66062909', '+16326588884', 10),
    (26, 7, 'John', '82306940', '+11702289369', 8),
    (27, 3, 'Lily', '45658309', '+18174014146', 0),
    (28, 4, 'Mary', '14101571', '+16573094065', 7),
    (29, 5, 'Michael', '71090925', '+18656886221', 0),
    (30, 4, 'Olivia', '80062707', '+16594599975', 4),
    (31, 3, 'Sophia', '37106386', '+17672005497', 10);

INSERT INTO payment_methods(id, name)
VALUES
    (1, 'Manual Transfer');

INSERT INTO order_statuses(id, name)
VALUES
    (1, 'Waiting For Payment'),
    (2, 'Processed'),
    (3, 'Sent'),
    (4, 'Order Confirmed'),
    (5, 'Canceled'),
    (6, 'Verifying');

INSERT INTO logistic_partners(name, rate, code, courier, days)
VALUES
    ('Official Instant', 2500, NULL, NULL, 0),
    ('Official SameDay', 1000, NULL, NULL, 1),
    ('JNE CTC', NULL, 'CTC', 'jne', 1),
    ('JNE CTCYES', NULL, 'CTCYES', 'jne', 1),
    ('JNE REG', NULL, 'REG', 'jne', 2),
    ('Pos Reguler', NULL, 'Pos Reguler', 'pos', 2),
    ('Pos Nextday', NULL, 'Pos Nextday', 'pos', 1),
    ('Pos Sameday', NULL, 'Pos Sameday', 'pos', 0);

-- user address
INSERT INTO addresses (user_id,pharmacy_id,province,city,district,subdistrict,postal_code,name,phone_number,is_active,location,created_at,updated_at,deleted_at)
VALUES
    (1,NULL,'BANTEN','SERANG','PULO AMPEL','PULO AMPEL','42455','Jalan Kebon Menteng No.81B','+628182869',true,'SRID=4326;POINT (106.41151768231195 -6.1513630426202575)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (2,NULL,'JAWA BARAT','CIANJUR','SUKARESMI','PAKUON','12950','Jalan Jendral Ancol No.9B','+628131352',true,'SRID=4326;POINT (106.74016082867598 -6.633972132949863)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (3,NULL,'JAWA BARAT','CIANJUR','SUKARESMI','CIKANYERE','43254','Jalan Kebon Cipinang No.31A','+62817338749',true,'SRID=4326;POINT (106.55410367249598 -6.2139266681220136)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (4,NULL,'JAWA BARAT','BOGOR','PAMIJAHAN','CIBUNIAN','16810','Jalan Pulo Senen No.45','+628183296',true,'SRID=4326;POINT (106.821235928229 -6.567998414613636)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (5,NULL,'JAWA BARAT','CIANJUR','TANGGEUNG','BOJONGPETIR','43267','Jalan Kebon Menteng No.74B','+628192963',true,'SRID=4326;POINT (107.13915810947603 -6.139690919917938)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (6,NULL,'JAWA BARAT','SUKABUMI','GUNUNG PUYUH','GUNUNG PUYUH','43123','Jalan Kampung Senen No.29','+6281151960',true,'SRID=4326;POINT (106.73358421402138 -6.638667413881086)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (7,NULL,'JAWA BARAT','KUNINGAN','PASAWAHAN','CIWIRU','45559','Jalan Muara Cipinang No.87B','+6281932159',true,'SRID=4326;POINT (106.76456632355077 -6.502914207998171)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (8,NULL,'JAWA BARAT','SUMEDANG','TANJUNGKERTA','BOROS','45354','Jalan Pasar Kelapa No.18B','+628160209',true,'SRID=4326;POINT (106.8095085662984 -6.279789490562294)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (9,NULL,'JAWA BARAT','INDRAMAYU','GABUSWETAN','RANCAMULYA','45263','Jalan Pondok Kuningan No.27','+6281153377',true,'SRID=4326;POINT (107.04958715382514 -6.396638272228415)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL),
    (10,NULL,'JAWA BARAT','TASIKMALAYA','CIHIDEUNG','CILEMBANG','46123','Jalan Gang Kelapa No.86A','+62812694650',true,'SRID=4326;POINT (106.70909209558837 -6.373466098756126)'::public.geography,'2025-01-14 07:45:45.362196','2025-01-14 07:45:45.362196',NULL);
-- pharmacy address
INSERT INTO addresses (user_id,pharmacy_id,province,city,district,subdistrict,postal_code,"name",phone_number,is_active,"location",created_at,updated_at,deleted_at) VALUES
                                                                                                                                                                         (NULL,1,'JAWA BARAT','TASIKMALAYA','KARANG JAYA','SIRNAJAYA','46198','Jalan Jendral Sawah No.7B','+628193923',true,'SRID=4326;POINT (106.41151768231195 -6.1513630426202575)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,2,'JAWA BARAT','GARUT','CISURUPAN','SUKAWARGI','44163','Jalan Pondok Fatmawati No.22','+6281719309',true,'SRID=4326;POINT (106.55410367249598 -6.2139266681220136)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,3,'JAWA BARAT','MAJALENGKA','MALAUSMA','CIMUNCANG','45464','Jalan Tanah Sawah No.31A','+6281472867',true,'SRID=4326;POINT (106.74016082867598 -6.633972132949863)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,4,'JAWA BARAT','GARUT','CIKELET','TIPAR','44177','Jalan Gang Kelapa No.58A','+628145340',true,'SRID=4326;POINT (106.821235928229 -6.567998414613636)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,5,'JAWA BARAT','SUKABUMI','JAMPANG TENGAH','TANJUNGSARI','43171','Jalan Gang Sawah No.98A','+6281013465',true,'SRID=4326;POINT (107.13915810947603 -6.139690919917938)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,6,'JAWA BARAT','BANDUNG','UJUNG BERUNG','PASIRWANGI','40618','Jalan Pondok Kuningan No.70A','+628105739',true,'SRID=4326;POINT (106.73358421402138 -6.638667413881086)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,7,'BANTEN','LEBAK','CIPANAS','GIRIHARJA','42372','Jalan Tanah Kapuk No.32A','+628152865',true,'SRID=4326;POINT (106.76456632355077 -6.502914207998171)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,8,'JAWA BARAT','BOGOR','TAMANSARI','SIRNAGALIH','16610','Jalan Pulo Kuningan No.43B','+62811812124',true,'SRID=4326;POINT (106.8095085662984 -6.279789490562294)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,9,'JAWA BARAT','SUMEDANG','TANJUNGMEDAR','WARGALUYU','45354','Jalan Pulo Kelapa No.63','+62815054882',true,'SRID=4326;POINT (107.04958715382514 -6.396638272228415)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,10,'JAWA BARAT','MAJALENGKA','RAJAGALUH','SADOMAS','45472','Jalan Kampung Ancol No.62B','+6281982543',true,'SRID=4326;POINT (106.70909209558837 -6.373466098756126)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL);
INSERT INTO addresses (user_id,pharmacy_id,province,city,district,subdistrict,postal_code,"name",phone_number,is_active,"location",created_at,updated_at,deleted_at) VALUES
                                                                                                                                                                         (NULL,11,'BANTEN','PANDEGLANG','CIKEUDAL (CIKEDAL)','CIPICUNG','42271','Jalan Tanjung Sudirman No.42A','+62819796916',true,'SRID=4326;POINT (106.98872357589802 -6.514336136640281)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,12,'JAWA BARAT','CIREBON','PALIMANAN','BALERANTE','45161','Jalan Gang Kuningan No.16A','+62813543602',true,'SRID=4326;POINT (106.73800194335686 -6.640888434033362)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,13,'JAWA BARAT','KUNINGAN','CIDAHU','CIHIDEUNGGIRANG','45595','Jalan Tanah Menteng No.16A','+6281172084',true,'SRID=4326;POINT (107.04625035269265 -6.479597557479941)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,14,'DKI JAKARTA','JAKARTA PUSAT','CEMPAKA PUTIH','RAWASARI','10570','Jalan Tanah Kapuk No.81A','+628180457',true,'SRID=4326;POINT (107.06887424303962 -6.3325251301181265)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,15,'BANTEN','TANGERANG','TIGARAKSA','TIGARAKSA','15720','Jalan Tanah Sudirman No.24B','+62813604844',true,'SRID=4326;POINT (106.88180820256491 -6.621173494698856)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,16,'JAWA BARAT','TASIKMALAYA','PUSPAHIANG','PUSPASARI','46471','Jalan Gang Ancol No.51','+6281467634',true,'SRID=4326;POINT (106.51972128875367 -6.450198695367222)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,17,'JAWA BARAT','SUKABUMI','WARUNG KIARA','SIRNAJAYA','11430','Jalan Tanah Senen No.13','+6281449229',true,'SRID=4326;POINT (106.5611144455462 -6.4985722853484384)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,18,'BANTEN','PANDEGLANG','CIKEUSIK','CIKIRUHWETAN','42286','Jalan Gang Ancol No.63B','+62816157231',true,'SRID=4326;POINT (106.95484641804191 -6.243621834183249)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,19,'JAWA BARAT','KARAWANG','CIAMPEL','KUTANEGARA','41363','Jalan Kampung Fatmawati No.20B','+628120870',true,'SRID=4326;POINT (106.42046722336576 -6.229780615856904)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL),
                                                                                                                                                                         (NULL,20,'JAWA BARAT','SUMEDANG','SITURAJA','WANAKERTA','45371','Jalan Pulo Menteng No.21','+628173535',true,'SRID=4326;POINT (106.96137053388838 -6.760166325754805)'::public.geography,'2025-01-14 07:45:27.516906','2025-01-14 07:45:27.516906',NULL);

INSERT INTO product_categories(name)
VALUES
    ('Antihistamines'),
    ('Analgesic'),
    ('Cough Medicine'),
    ('Antacid'),
    ('Antipyretic'),
    ('Antihypertensive'),
    ('Antiarrhythmic'),
    ('Anticoagulants and Thrombolytics'),
    ('Antibiotics'),
    ('Antifungal'),
    ('Anti virus'),
    ('Antidiarrhoeal'),
    ('Laxatives'),
    ('Anticonvulsant'),
    ('Anxiety'),
    ('Antidepressants'),
    ('Ani-inflammatory'),
    ('Antipsychotic'),
    ('Corticosteroid'),
    ('Immunosuppressants'),
    ('Other Drug Categories');

INSERT INTO product_classifications(name)
VALUES
    ('Over-the-Counter Drugs'),
    ('Narcotic Drugs'),
    ('Limited Over-the-Counter Drugs'),
    ('Prescription Drugs'),
    ('Non Drugs');

INSERT INTO product_forms(name)
VALUES
    ('Tablet'),
    ('Capsule'),
    ('Pill'),
    ('Powder'),
    ('Suppository'),
    ('Ovule'),
    ('Ointment'),
    ('Cream'),
    ('Gel'),
    ('Syrup'),
    ('Suspension'),
    ('Elixir'),
    ('Infusion'),
    ('Drops'),
    ('Inhalation'),
    ('Aerosol'),
    ('Turbuhaler');

INSERT INTO manufacturers(name)
VALUES
    ('Manufacturer A'),
    ('Manufacturer B'),
    ('Manufacturer C'),
    ('Manufacturer D'),
    ('Manufacturer E');

INSERT INTO products (product_classification_id,product_form_id,manufacturer_id,"name",generic_name,description,unit_in_pack,selling_unit,weight,height,length,width,image,is_active,created_at,updated_at,deleted_at) VALUES
                                                                                                                                                                                                                           (5,15,3,'Caviplex CDEZ 10 Kaplet','500 mg vitamin C DC 97%, 400 IU vitamin D3, 10 mg vitamin E, 10 mg zinc','',10,'STRIP',64,13,15,15,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1691047962_caviplex_cdez_10-removebg-preview',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,5,4,'Blackmores Bio C 1000 Mg 30 Tablet','Komposisi Vitamin C (Asam askorbat) 400 mg, Natrium askorbat 350 mg (setara dengan asam askorbat 309 mg), Kalsium askorbat dihidrat 400 mg, ekstrak citrus bioflavonoids 25 mg, Rutoside 50 mg, Hesperidin 50 mg, Ekstrak rosa canina (Rosehips) (Setara dengan buah kering 250 mg), Ekstrak malphigia glabra (Acerola) (ekstrak setara dengan buah kering 50 mg)','',30,'BOTOL',23,5,5,14,'https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1659935216_61dff62de139ec05b9c8cadd',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,1,3,'L-Vit D3 1000 10 Tablet','Vitamin D3 1000 IU','L-Vit D3 1000 Tablet adalah suplemen untuk mencegah dan mengatasi kekurangan vitamin D.L-Vit D3 1000 Tablet adalah suplemen untuk mencegah dan mengatasi kekurangan vitamin D.L-Vit D3 1000 Tablet mengandung vitamin D3 sebanyak 1000 IU. Suplemen ini dapat memenuhi kebutuhan vitamin D dengan cepat pada lanjut usia, ibu hamil dan menyusui, serta penderita penyakit infeksi atau penyakit autoimun.Â L-Vit D3 1000 Tablet mengandung vitamin D3 sebanyak 1000 IU. Suplemen ini dapat memenuhi kebutuhan vitamin D dengan cepat pada lanjut usia, ibu hamil dan menyusui, serta penderita penyakit infeksi atau penyakit autoimun.Â ',10,'STRIP',58,8,13,3,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1661157175_62a19151f15ee840f566029c',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (4,15,4,'Redoxon Triple Action 10 Tablet','Vitamin C 1000 mg, zinc 10 mg, vitamin D 400 IU','Redoxon Triple Action Orange Flavour 10 Tablet Effervescent bermanfaat untuk menjaga dan memelihara daya tahan tubuh.Redoxon Triple Action Orange Flavour 10 Tablet Effervescent bermanfaat untuk menjaga dan memelihara daya tahan tubuh.Kombinasi dari vitamin C, vitamin D, dan zinc dalam Redoxon Triple Action Orange Flavour 10 Tablet Effervescent akan membantu meningkatkan daya tahan tubuh, serta baik untuk menjaga kesehatan kulit, tulang, dan gigi.Kombinasi dari vitamin C, vitamin D, dan zinc dalam Redoxon Triple Action Orange Flavour 10 Tablet Effervescent akan membantu meningkatkan daya tahan tubuh, serta baik untuk menjaga kesehatan kulit, tulang, dan gigi.',10,'TUBE',61,3,11,10,'https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1659932227_5fb38a0041ab59059e86a5f4',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (1,6,2,'Blackmores Daily Immune C 500 30 Tablet','Natrium askorbat 560,6 mg (setara dengan asam askorbat 500 mg)','Blackmores Daily Immune C 500 30 Tablet bermanfaat untuk membantu memenuhi kebutuhan vitamin C. Suplemen ini juga dapat membantu memelihara daya tahan tubuh.Blackmores Daily Immune C 500 30 Tablet mengandung vitamin C, yang berperan penting dalam berbagai proses yang terjadi di tubuh. Vitamin C dapat membantu memelihara daya tahan tubuh, membantu pembentukan kolagen, serta membantu penyerapan zat besi. ',30,'BOTOL',24,20,7,8,'https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1713752963_bm_daily_immune-removebg-preview',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (1,1,2,'Vitalife C 500 mg 30 Tablet','Vitamin C 500 mg, gelatin','Vitalife C 500 Mg 30 Kapsul bermanfaat untuk membantu memelihara daya tahan tubuh dan memebuhi kebutuhan vitamin C.Â Vitalife C 500 Mg 30 Kapsul bermanfaat untuk membantu memelihara daya tahan tubuh dan memebuhi kebutuhan vitamin C.Â Vitalife C 500 Mg 30 Kapsul mengandung vitamin C dan gelatin. Suplemen vitamin C akan membantu memelihara daya tahan tubuh.Â Â Vitalife C 500 Mg 30 Kapsul mengandung vitamin C dan gelatin. Suplemen vitamin C akan membantu memelihara daya tahan tubuh.Â Â ',30,'DUS',93,16,1,7,'https://res-5.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660203694_vitalife_c_500_mg_30_kapsul',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (2,1,2,'Hevit C 1000 mg 10 Kaplet','Vitamin C 1000 mg','Hevit C 1000 mg Tablet bermanfaat untuk memelihara daya tahan tubuh dan membantu memenuhi kebutuhan vitamin C harian Anda.Hevit C 1000 mg Tablet bermanfaat untuk memelihara daya tahan tubuh dan membantu memenuhi kebutuhan vitamin C harian Anda.Kandungan vitamin C di dalam Hevit C 1000 mg Tablet memiliki banyak fungsi penting bagi tubuh, seperti mengoptimalkan kerja sistem imun, serta membantu proses pemulihan dan penyembuhan luka. Vitamin C juga baik untuk kesehatan tulang, gigi, dan kulit.Kandungan vitamin C di dalam Hevit C 1000 mg Tablet memiliki banyak fungsi penting bagi tubuh, seperti mengoptimalkan kerja sistem imun, serta membantu proses pemulihan dan penyembuhan luka. Vitamin C juga baik untuk kesehatan tulang, gigi, dan kulit.',10,'STRIP',89,14,10,1,'https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660980249_61dff629e139ec05b9c8cad7',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (2,3,5,'Vitacimin Lemon 2 Tablet','Vitamin C 500 mg','Vitacimin Lemon 10 Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',2,'STRIP',66,20,13,14,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1701705407_vitacimin_lemon',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (2,10,3,'Hevit C 500 Mg 10 Tablet','Vitamin C 500 mg','Hevit C Tablet bermanfaat untuk memelihara daya tahan tubuh dan membantu memenuhi kebutuhan vitamin C harian Anda.Hevit C Tablet bermanfaat untuk memelihara daya tahan tubuh dan membantu memenuhi kebutuhan vitamin C harian Anda.Kandungan vitamin C di dalam Hevit C Tablet memiliki beragam fungsi penting bagi tubuh, seperti memaksimalkan kerja sistem imun, serta membantu proses pemulihan dan penyembuhan luka. Vitamin C juga baik untuk kesehatan tulang, gigi, dan kulit.Kandungan vitamin C di dalam Hevit C Tablet memiliki beragam fungsi penting bagi tubuh, seperti memaksimalkan kerja sistem imun, serta membantu proses pemulihan dan penyembuhan luka. Vitamin C juga baik untuk kesehatan tulang, gigi, dan kulit.',10,'STRIP',84,15,4,4,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660027808_61b36989b5a5e2062d9798df',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (4,12,1,'Inavitamax Vitamin C 30 Tablet','Vitamin C 500 mg','Inavitamax Vitamin C 30 Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',30,'BOTOL',57,5,13,9,'https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1701705461_inavitamax_vitamin_c_30_tablet',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL);
INSERT INTO products (product_classification_id,product_form_id,manufacturer_id,"name",generic_name,description,unit_in_pack,selling_unit,weight,height,length,width,image,is_active,created_at,updated_at,deleted_at) VALUES
                                                                                                                                                                                                                           (2,15,1,'You-C 1000 Lemon 140 ml','Vitamin C 1000 mg','You-C 1000 Orange 140 ml bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',140,'BOTOL',88,17,16,13,'https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1701705606_you_c_lemon',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (4,13,5,'CDR Effervescent 20 Tablet','Calcium carbonate, Vitamin B6, Vitamin C, Vitamin D','CDR 20 Tablet bermanfaat untuk memenuhi kebutuhan kalsium, menjaga tulang agar tetap kuat, membantu masa penyembuhan, dan masa pertumbuhan.CDR 20 Tablet bermanfaat untuk memenuhi kebutuhan kalsium, menjaga tulang agar tetap kuat, membantu masa penyembuhan, dan masa pertumbuhan.CDR 20 Tablet mengandung calcium carbonate, vitamin B6, vitamin C, vitamin D. CDR juga dapat digunakan untuk memenuhi kebutuhan kalsium pada ibu hamil dan menyusui.Â CDR 20 Tablet mengandung calcium carbonate, vitamin B6, vitamin C, vitamin D. CDR juga dapat digunakan untuk memenuhi kebutuhan kalsium pada ibu hamil dan menyusui.Â Namun, ibu hamil tetap dianjurkan untuk mengkonsultasikan dengan dokter terlebih dahulu untuk mendapatkan jenis, dosis, dan durasi penggunaan suplemen, yang sesuai dengan kebutuhannya.Â Namun, ibu hamil tetap dianjurkan untuk mengkonsultasikan dengan dokter terlebih dahulu untuk mendapatkan jenis, dosis, dan durasi penggunaan suplemen, yang sesuai dengan kebutuhannya.Â ',10,'DUS',3,15,13,1,'https://res-5.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1659930457_5fb37cd641ab59059e868614',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,3,1,'Sido Muncul Vitamin C 1000 Mg Sweet Orange 6 Sachet','Vitamin C 1000 mg, Vitamin E 25 mg, Vitamin B3 10 mg, Vitamin B6 5 mg, Vitamin B12 5 mcg, Madu 100 mg','Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange bermanfaat untuk memelihara daya tahan tubuh.Â Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange bermanfaat untuk memelihara daya tahan tubuh.Â Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange bermanfaat untuk menjaga daya tahan tubuh, melindungi tubuh dari radikal bebas, dan meningkatkan produksi energi. Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange aman untuk dikonsumsi oleh penderita diabetes.Â Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange bermanfaat untuk menjaga daya tahan tubuh, melindungi tubuh dari radikal bebas, dan meningkatkan produksi energi. Sido Muncul Vitamin C 1000 mg Sugar Free Rasa Sweet Orange aman untuk dikonsumsi oleh penderita diabetes.Â ',4,'DUS',49,10,3,11,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660122001_60f7f5ba1ef1133130010a40',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (1,8,1,'Vitamin C IPI 50 mg 90 Tablet','1 tablet berisi vitamin C 50 mg','Vitamin C IPI Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C IPI Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',90,'BOTOL',83,2,14,6,'https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660286295_62a18fdcf15ee840f565f587',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,2,4,'You-C 1000 Orange 140 ml','Vitamin C 1000 mg','You-C 1000 Orange 140 ml bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',140,'BOTOL',42,19,8,1,'https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1701705530_you-c_1000_orange_140_ml',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (4,8,2,'Arkavit-C Multivitamin 10 Kaplet','Vitamin B1 50 mg, Vitamin B2 25 mg, Vitamin B3 50 mg, Vitamin B5 20 mg, Vitamin B6 10 mg, Vitamin B12 5 mcg, Vitamin C 500 mg','Arkavit-C Multivitamin Kaplet bermanfaat untuk membantu memenuhi kebutuhan vitamin B kompleks dan vitamin C.Arkavit-C Multivitamin Kaplet bermanfaat untuk membantu memenuhi kebutuhan vitamin B kompleks dan vitamin C.Suplemen ini bisa digunakan untuk pemulihan setelah sakit dan juga untuk memelihara kesehatan.Â  Vitamin C dalam suplemen ini membantu mengoptimalkan daya tahan tubuh, menyembuhkan luka, dan meningkatkan penyerapan zat besi.Suplemen ini bisa digunakan untuk pemulihan setelah sakit dan juga untuk memelihara kesehatan.Â  Vitamin C dalam suplemen ini membantu mengoptimalkan daya tahan tubuh, menyembuhkan luka, dan meningkatkan penyerapan zat besi.',10,'STRIP',25,2,2,3,'https://res-4.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660791792_62a19194f15ee840f56604d3',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,14,3,'Vitamin C 500 mg 10 Tablet Promed','500 mg','DeskripsiDeskripsiVitamin C 500 mgÂ memiliki manfaat meningkatkan daya tahan tubuh serta nutrisi pembentuk kolagen, yaitu zat yang dibutuhkan untuk memperbaiki kulit. Vitamin C termasuk ke produk konsumen yang dapat dibeli bebas. Konsultasikan kepada dokter jika memiliki alergi pada makanan maupun obat.Vitamin C 500 mgÂ memiliki manfaat meningkatkan daya tahan tubuh serta nutrisi pembentuk kolagen, yaitu zat yang dibutuhkan untuk memperbaiki kulit. Vitamin C termasuk ke produk konsumen yang dapat dibeli bebas. Konsultasikan kepada dokter jika memiliki alergi pada makanan maupun obat.Indikasi UmumIndikasi UmumMembantu memenuhi kebutuhan vitamin C dan membantu menjaga daya tahan tubuh.Membantu memenuhi kebutuhan vitamin C dan membantu menjaga daya tahan tubuh.KomposisiKomposisiVitamin C 500 mgVitamin C 500 mgDosisDosis1 tablet, diminum 1 kali per hari1 tablet, diminum 1 kali per hariAturan PakaiAturan PakaiDikonsumsi sesudah makanDikonsumsi sesudah makanPerhatianÂ PerhatianÂ PerhatianHati-hati mengonsumi vitamin C bila memiliki: *Riwayat gagal ginjal. *Batu ginjal.Hati-hati mengonsumi vitamin C bila memiliki: *Riwayat gagal ginjal. *Batu ginjal.KemasanKemasanStrip @ 10 TabletStrip @ 10 Tablet',10,'STRIP',10,2,10,14,'https://res-2.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660293304_62a19009f15ee840f565f71c',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (3,3,5,'Vicee 500 Lemon 2 Tablet','Ascorbic acid 250 mg, Na ascorbate 281.25 mg','DeskripsiDeskripsiVicee 500 Lemon TabletÂ merupakan suplemen yang mengandung vitamin C. Suplemen ini digunakan untuk membantu memenuhi kebutuhan vitamin C tubuh.Vicee 500 Lemon TabletÂ merupakan suplemen yang mengandung vitamin C. Suplemen ini digunakan untuk membantu memenuhi kebutuhan vitamin C tubuh.Indikasi UmumIndikasi UmumMencegah dan mengobati defisiensi vitamin C, terutama dalam masa pemulihan dari sakit. Mencegah sariawan. Mengobati perdarahan gusi.Mencegah dan mengobati defisiensi vitamin C, terutama dalam masa pemulihan dari sakit. Mencegah sariawan. Mengobati perdarahan gusi.KomposisiKomposisiAscorbic acid 250 mg, Na ascorbate 281.25 mgAscorbic acid 250 mg, Na ascorbate 281.25 mgDosisDosisDewasa 1-2 tablet per hariDewasa 1-2 tablet per hariAturan PakaiAturan PakaiBerikan setelah makan, untuk dihisap seperti permenBerikan setelah makan, untuk dihisap seperti permenKontra IndikasiKontra IndikasihipersensitivitashipersensitivitasPerhatianPerhatianpenggunaan pada wanita hamil,Penggunaan lebih dari dosis yang direkomendasikan akan merubah faktor risiko menjadi C.penggunaan pada wanita hamil,Penggunaan lebih dari dosis yang direkomendasikan akan merubah faktor risiko menjadi C.Efek SampingEfek SampingDiare. Pengasaman urine oleh vitamin C dapat memudahkan kristalisasi oksalat dan sistin.Diare. Pengasaman urine oleh vitamin C dapat memudahkan kristalisasi oksalat dan sistin.KemasanKemasanStrip @ 2 tablet hisapStrip @ 2 tablet hisapManufakturManufakturDarya Varia LaboratoriaDarya Varia LaboratoriaNo. RegistrasiNo. RegistrasiD161549171D161549171',2,'STRIP',74,6,17,16,'https://res-1.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1687855858_vicee',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (4,2,4,'Forneuro 6 Kapsul','vitamin B1 100 mg, vitamin B6 50 mg, vitamin B12 100 mcg, vitamin E natural 200 IU, Folic acid 400 mcg','Forneuro Kapsul bermanfaat untuk mencegah dan mengobati kekurangan (defisiensi) vitamin B kompleks dan vitamin E, serta anemia megaloblastik.Forneuro Kapsul bermanfaat untuk mencegah dan mengobati kekurangan (defisiensi) vitamin B kompleks dan vitamin E, serta anemia megaloblastik.Foneuro Kapsul mengandung vitamin vitamin B1, B6, B12, dan B9 atau asam folat, serta vitamin E. Kombinasi vitamin tersebut berperan penting dalam menjaga fungsi saraf, menambah energi, serta mencegah kerusakan sel akibat paparan radikal bebas.Â Foneuro Kapsul mengandung vitamin vitamin B1, B6, B12, dan B9 atau asam folat, serta vitamin E. Kombinasi vitamin tersebut berperan penting dalam menjaga fungsi saraf, menambah energi, serta mencegah kerusakan sel akibat paparan radikal bebas.Â ',6,'STRIP',70,9,8,18,'https://res-5.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1660368796_62a19098f15ee840f565fc97',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL),
                                                                                                                                                                                                                           (2,4,5,'Biferce Vitamin C 1000 mg 10 Tablet',']Vitamin C 1000 mg','Biferce Vitamin C 1000 mg 10 Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.Vitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',10,'BOTOL',41,16,6,14,'https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_150,w_150/v1/production/pharmacy/products/1701705498_biferce_vitamin_c_1000_mg_10_tablet',true,'2025-01-15 11:40:48.95124','2025-01-15 11:40:48.95124',NULL);

INSERT INTO product_category_maps (product_id, product_category_id)
VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,2),
    (6,10),
    (7,8),
    (8,5),
    (9,2),
    (10,4),
    (4,2),
    (6,1),
    (2,8),
    (9,5),
    (11,1),
    (12,2),
    (13,3),
    (14,4),
    (15,2),
    (16,10),
    (17,8),
    (18,5),
    (19,2),
    (20,4);

INSERT INTO logistic_partners(name, rate, code, courier, days)
VALUES
    ('Official Instant', 2500, NULL, NULL, 0),
    ('Official SameDay', 1000, NULL, NULL, 1),
    ('JNE CTC', NULL, 'CTC', 'jne', 1),
    ('JNE CTCYES', NULL, 'CTCYES', 'jne', 1),
    ('JNE REG', NULL, 'REG', 'jne', 2),
    ('Pos Reguler', NULL, 'Pos Reguler', 'pos', 2),
    ('Pos Nextday', NULL, 'Pos Nextday', 'pos', 1),
    ('Pos Sameday', NULL, 'Pos Sameday', 'pos', 0);

INSERT INTO catalogs(pharmacy_id, product_id, stock, price, is_active)
VALUES
    (1,4,10,10000,true),
    (1,1,0,23817,true),
    (1,6,5,15000,true),
    (1,3,1,98937,true),
    (1,9,10,100000,true),
    (2,4,4,5000,true),
    (2,1,5,12323,true),
    (3,6,100,1000,true),
    (5,3,5,46724,true),
    (4,1,10,231231,true),
    (4,4,1,2313,true),
    (4,16,15,29032,true),
    (4,6,15,8832,true),
    (4,17,32,91234,true),
    (4,9,52,1230,true),
    (6,5,10,123000,true),
    (6,2,3,123093,true),
    (6,7,12,341203,true),
    (6,9,8,192313,true),
    (12,20,12,13210,true),
    (12,3,1,98042,true),
    (12,12,32,1232,true),
    (12,8,19,123901,true),
    (12,3,40,423102,true),
    (12,19,32,192381,true),
    (12,10,49,132030,true),
    (12,15,12,23932,true),
    (17,18,13,1233,true),
    (17,14,98,97132,true),
    (17,11,19,271231,true),
    (17,13,13,1284,true),
    (17,2,10,87123,true);

INSERT INTO shipping_methods (pharmacy_id, logistic_partner_id)
VALUES
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (4,2),
    (4,3),
    (5,1),
    (6,1),
    (6,3),
    (6,4),
    (7,1),
    (8,1),
    (9,1),
    (10,1),
    (11,1),
    (12,2),
    (12,3),
    (13,1),
    (14,1),
    (15,1),
    (16,1),
    (17,2),
    (17,3),
    (17,4),
    (18,1),
    (19,1),
    (20,1);


INSERT INTO order_groups (id, user_id,proof,created_at,updated_at,deleted_at)
VALUES
    (1,2,'https://res.cloudinary.com/du7gzvlxs/image/upload/v1737891264/g1buae421yeu0stx4mkx.jpg','2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (2,2,'https://res.cloudinary.com/du7gzvlxs/image/upload/v1737891264/g1buae421yeu0stx4mkx.jpg','2025-01-26 18:06:33.808568','2025-01-26 18:06:33.808568',NULL),
    (3,2,NULL,'2025-01-26 18:12:19.950498','2025-01-26 18:12:19.950498',NULL),
    (4,2,NULL,'2025-01-26 16:24:22.049589','2025-01-26 17:54:34.491281',NULL),
    (5,2,'https://res.cloudinary.com/du7gzvlxs/image/upload/v1737891264/g1buae421yeu0stx4mkx.jpg','2025-01-26 16:26:57.035482','2025-01-26 17:54:38.132857',NULL),
    (6,2,'https://res.cloudinary.com/du7gzvlxs/image/upload/v1737891264/g1buae421yeu0stx4mkx.jpg','2025-01-26 18:09:36.221393','2025-01-26 18:12:58.225317',NULL);

INSERT INTO orders (id,user_id,address_id,status_id,payment_method_id,pharmacy_id,logistic_partner_id,order_group_id,total_price_product,total_price_shipping,created_at,updated_at,deleted_at)
VALUES
    (1,2,2,1,1,4,2,3,11145,10000,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (2,2,2,1,1,12,2,3,37142,1000,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (3,2,2,2,1,4,1,2,231231,25000,'2025-01-26 16:26:57.035482','2025-01-26 17:55:00.017447',NULL),
    (4,2,2,2,1,17,3,2,3699,10000,'2025-01-26 16:26:57.035482','2025-01-26 17:55:00.017447',NULL),
    (5,2,2,2,1,12,2,2,192381,1000,'2025-01-26 16:26:57.035482','2025-01-26 17:55:00.017447',NULL),
    (6,2,2,3,1,4,1,1,12522,25000,'2025-01-26 16:24:22.049589','2025-01-26 18:04:27.378063',NULL),
    (7,2,2,1,1,12,2,4,264060,1000,'2025-01-26 18:06:33.808568','2025-01-26 18:06:33.808568',NULL),
    (8,2,2,5,1,6,1,4,341203,2500,'2025-01-26 18:06:33.808568','2025-01-26 18:08:41.755261',NULL),
    (9,2,2,5,1,4,2,6,17664,10000,'2025-01-26 18:12:19.950498','2025-01-26 18:13:07.079265',NULL),
    (10,2,2,4,1,4,2,5,693693,10000,'2025-01-26 18:09:36.221393','2025-01-26 18:23:39.93979',NULL);

INSERT INTO order_items (order_id,catalog_id,quantity,created_at,updated_at,deleted_at)
VALUES
    (1,13,1,'2025-01-26 16:24:22.049589','2025-01-26 16:24:22.049589',NULL),
    (1,15,3,'2025-01-26 16:24:22.049589','2025-01-26 16:24:22.049589',NULL),
    (2,10,1,'2025-01-26 16:26:57.035482','2025-01-26 16:26:57.035482',NULL),
    (3,28,3,'2025-01-26 16:26:57.035482','2025-01-26 16:26:57.035482',NULL),
    (4,25,1,'2025-01-26 16:26:57.035482','2025-01-26 16:26:57.035482',NULL),
    (5,11,1,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (5,13,1,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (6,27,1,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (6,20,1,'2025-01-26 17:53:52.599259','2025-01-26 17:53:52.599259',NULL),
    (7,18,1,'2025-01-26 18:06:33.808568','2025-01-26 18:06:33.808568',NULL),
    (8,26,2,'2025-01-26 18:06:33.808568','2025-01-26 18:06:33.808568',NULL),
    (9,10,3,'2025-01-26 18:09:36.221393','2025-01-26 18:09:36.221393',NULL),
    (10,13,2,'2025-01-26 18:12:19.950498','2025-01-26 18:12:19.950498',NULL);