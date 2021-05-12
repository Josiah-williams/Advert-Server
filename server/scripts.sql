CREATE DATABASE adverts;

\c bank_account;

CREATE TABLE users(
   email character varying(255) COLLATE pg_catalog."default" NOT NULL,
   first_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
   last_name character varying(128) COLLATE pg_catalog."default" NOT NULL,
   password character varying(128) COLLATE pg_catalog."default" NOT NULL,
   CONSTRAINT users_email_key UNIQUE (email),
   CONSTRAINT users_first_name_key UNIQUE (first_name),
   CONSTRAINT users_last_name_key UNIQUE (last_name)
);
CREATE TABLE TOKENS(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  userid BIGSERIAL NOT NULL,
  FOREIGN KEY(userid) REFERENCES users(userid)
);