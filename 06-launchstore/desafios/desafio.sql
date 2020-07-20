CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "age" int NOT NULL,
  "email" text NOT NULL,
  "phone" int NOT NULL
);

CREATE TABLE "adresses" (
  "id" SERIAL PRIMARY KEY,
  "street" text NOT NULL,
  "neighborhood" text NOT NULL,
  "number" int NOT NULL,
  "city" text NOT NULL
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "address_id" int NOT NULL UNIQUE,
  "phone" int NOT NULL,
  "email" text NOT NULL
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "model" text NOT NULL,
  "brand" text NOT NULL,
  "acessories" text NOT NULL,
  "initial_price" int NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "color" text NOT NULL,
  "license_plate" text NOT NULL,
  "year" int NOT NULL,
  "model_id" int NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int NOT NULL,
  "date" date NOT NULL,
  "hours" int NOT NULL,
  "agency_id" int NOT NULL
);

CREATE TABLE "orders_cars" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int NOT NULL,
  "car_id" int NOT NULL
);

ALTER TABLE "adresses" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("address_id");

ALTER TABLE "cars" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders_cars" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "orders_cars" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");
