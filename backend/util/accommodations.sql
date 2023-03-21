CREATE TABLE accommodations (
  accm_id BIGSERIAL PRIMARY KEY,
  accm_street VARCHAR(255) NOT NULL,
  accm_number VARCHAR(10),
  accm_city VARCHAR(20) NOT NULL,
  accm_state VARCHAR(20),
  accm_country VARCHAR(20) NOT NULL DEFAULT 'Puerto Rico',
  accm_zipcode VARCHAR(10) NOT NULL,
  accm_description VARCHAR(255),
  landlord_id BIGINT REFERENCES landlords(landlord_id) ON DELETE CASCADE,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

-- INSERT INTO accommodations (accm_street, accm_number, accm_city, accm_zipcode, accm_description, landlord_id) 
-- VALUES ('Calle Emiterio Betances', '50N', 'Mayaguez', '00680', 'Plaza Gloriel', 4);

-- INSERT INTO accommodations (accm_street, accm_number, accm_city, accm_zipcode, accm_description, landlord_id) 
-- VALUES ('Calle Bosque', '51', 'Mayaguez', '00681', 'Bosque 51', 4);

CREATE TABLE shared_amenities (
  shared_amenities_id BIGSERIAL PRIMARY KEY,
  bedrooms INT NOT NULL DEFAULT 0,
  bathrooms  NUMERIC(2,1) NOT NULL DEFAULT 0.0,
  kitchen BOOLEAN NOT NULL DEFAULT FALSE,
  washer BOOLEAN NOT NULL DEFAULT FALSE,
  dryer BOOLEAN NOT NULL DEFAULT FALSE,
  internet BOOLEAN NOT NULL DEFAULT FALSE,
  pets_allowed BOOLEAN NOT NULL DEFAULT FALSE,
  accm_id BIGINT UNIQUE REFERENCES accommodations(accm_id) ON DELETE CASCADE,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

-- INSERT INTO shared_amenities (washer, dryer, accm_id) VALUES (true, true, 1);
-- INSERT INTO shared_amenities (accm_id) VALUES (2);

CREATE TABLE notices (
  notice_id BIGSERIAL PRIMARY KEY,
  notice_send_date TIMESTAMPTZ DEFAULT NOW()::TIMESTAMP(0),
  notice_title VARCHAR(100) NOT NULL,
  notice_content VARCHAR(255) NOT NULL,
  accm_id BIGINT REFERENCES accommodations(accm_id),
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reviews (
  review_send_date TIMESTAMP PRIMARY KEY,
  rating INT NOT NULL,
  comment VARCHAR(255),
  accm_id BIGINT REFERENCES accommodations(accm_id),
  tenant_id BIGINT REFERENCES tenants(tenant_id),
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);
