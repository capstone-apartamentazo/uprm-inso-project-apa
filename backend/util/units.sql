CREATE TABLE units (
  unit_id BIGSERIAL PRIMARY KEY,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  shared BOOLEAN NOT NULL DEFAULT FALSE,
  price BIGINT NOT NULL,
  init_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL DEFAULT CURRENT_DATE + INTERVAL '1 year',
  accm_id BIGINT REFERENCES accommodations(accm_id),
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE private_amenities (
  priv_amenities_id BIGSERIAL PRIMARY KEY,
  electricity BOOLEAN NOT NULL DEFAULT FALSE,
  water BOOLEAN NOT NULL DEFAULT FALSE,
  internet BOOLEAN NOT NULL DEFAULT FALSE,
  bed BOOLEAN NOT NULL DEFAULT FALSE,
  microwave BOOLEAN NOT NULL DEFAULT FALSE,
  air_conditioner BOOLEAN NOT NULL DEFAULT FALSE,
  parking BOOLEAN NOT NULL DEFAULT FALSE,
  balcony BOOLEAN NOT NULL DEFAULT FALSE,
  unit_id BIGINT REFERENCES units(unit_id) ON DELETE CASCADE,
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE requests (
  request_id BIGSERIAL PRIMARY KEY,
  tenant_wants_tour BOOLEAN NOT NULL DEFAULT FALSE,
  tour_date TIMESTAMPTZ,
  comment VARCHAR(255) NOT NULL,
  landlord_approves BOOLEAN NOT NULL DEFAULT FALSE,
  tenant_approves BOOLEAN NOT NULL DEFAULT FALSE,
  unit_id BIGINT REFERENCES units(unit_id),
  tenant_id BIGINT REFERENCES tenants(tenant_id),
  CONSTRAINT tenant_request UNIQUE (unit_id, tenant_id),
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE leases (
  lease_id BIGSERIAL PRIMARY KEY,
  price BIGINT NOT NULL,
  init_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current_tenant BOOLEAN DEFAULT FALSE,
  unit_id BIGINT REFERENCES units(unit_id),
  tenant_id BIGINT REFERENCES tenants(tenant_id),
  CONSTRAINT tenant_rent UNIQUE (unit_id, tenant_id, init_date, end_date),
  deleted_flag BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO leases (price, init_date, end_date, unit_id, tenant_id) VALUES (500, '2023-03-22', '2024-03-22', 2, 11) RETURNING *;