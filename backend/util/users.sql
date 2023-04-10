CREATE TABLE landlords (
  landlord_id BIGSERIAL PRIMARY KEY,
  landlord_name VARCHAR(255) NOT NULL,
  landlord_email VARCHAR(255) UNIQUE NOT NULL,
  landlord_password VARCHAR(255) NOT NULL,
  landlord_phone VARCHAR(12) UNIQUE NOT NULL,
  landlord_rating NUMERIC(2,1) NOT NULL DEFAULT 0.0,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE tenants (
  tenant_id BIGSERIAL PRIMARY KEY,
  tenant_name VARCHAR(255) NOT NULL,
  tenant_email VARCHAR(255) UNIQUE NOT NULL,
  tenant_password VARCHAR(255) NOT NULL,
  tenant_phone VARCHAR(12) UNIQUE NOT NULL,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

SELECT AVG(rating) FROM reviews NATURAL INNER JOIN accommodations WHERE landlord_id = 2;

UPDATE landlords SET landlord_rating = (SELECT AVG(rating) FROM reviews NATURAL INNER JOIN accommodations WHERE landlord_id = 1) WHERE landlord_id = 1 RETURNING *;

CREATE TABLE messages (
  message_id BIGSERIAL PRIMARY KEY,
  landlord_id BIGINT REFERENCES landlords(landlord_id),
  tenant_id BIGINT REFERENCES tenants(tenant_id),
  msg_send_date TIMESTAMPTZ DEFAULT NOW()::TIMESTAMP(0),
  landlord_sent_msg BOOLEAN NOT NULL,
  msg_content VARCHAR(255) NOT NULL,
  msg_read BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT user_message UNIQUE (landlord_id, tenant_id, msg_send_date, landlord_sent_msg)
);

-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 12, false, 'Test 1');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 12, true, 'Test 2');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 12, false, 'Test 3');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 12, true, 'Test 4');

-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 6, false, 'Test 5');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (32, 6, true, 'Test 6');

-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (16, 4, false, 'Test 7');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (16, 4, true, 'Test 8');

-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (16, 2, false, 'Test 9');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (16, 2, true, 'Test 10');

-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (18, 10, true, 'Test 11');
-- INSERT INTO messages (landlord_id, tenant_id, landlord_sent_msg, msg_content) VALUES (18, 10, false, 'Test 12');

SELECT * FROM MESSAGES WHERE landlord_id = 32 AND tenant_id = 12;
SELECT * FROM MESSAGES WHERE landlord_id = 32 AND tenant_id = 12 AND msg_send_date = '2023-03-17T07:11:57.000Z';
SELECT * FROM MESSAGES WHERE landlord_id = 32 AND tenant_id = 12 AND msg_send_date = '2023-03-17T07:12:03.000Z';
SELECT * FROM MESSAGES WHERE landlord_id = 32 AND tenant_id = 12 AND msg_send_date = '2023-03-17T07:13:25.000Z';
SELECT * FROM MESSAGES WHERE landlord_id = 32 AND tenant_id = 12 AND msg_send_date = '2023-03-17T07:13:33.000Z';
