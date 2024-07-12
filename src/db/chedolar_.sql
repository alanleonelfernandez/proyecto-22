DROP SCHEMA IF EXISTS chedolar_db; 
CREATE SCHEMA chedolar_db; 
USE chedolar_db;

CREATE TABLE IF NOT EXISTS tipo_usuario
(
   id_tipo_usuario varchar(1) NOT NULL, 
   tipo varchar(30) NOT NULL,
   PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE IF NOT EXISTS usuarios
(
   id_usuario   SERIAL NOT NULL, 
   email        varchar(100) NOT NULL,
   password     varchar(100),
   nombre       varchar(30) NOT NULL, 
   apellido     varchar(30) NOT NULL,
   id_tipo_usuario varchar(1) NULL DEFAULT 'U',
   saldo_ars    decimal(10,2) NULL DEFAULT '500000',
   saldo_usd    decimal(10,2) NULL DEFAULT '10000',
   FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario (id_tipo_usuario),
   PRIMARY KEY (id_usuario)
);

INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES ('A', 'Administrador');
INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES ('U', 'Usuario');

CREATE TABLE IF NOT EXISTS moneda
(
    id_moneda  int NOT NULL PRIMARY KEY, 
    nombre     varchar(30) NOT NULL
);

INSERT INTO moneda (id_moneda, nombre) VALUES (1, 'Peso Argentino');
INSERT INTO moneda (id_moneda, nombre) VALUES (2, 'Dólar (oficial)');
INSERT INTO moneda (id_moneda, nombre) VALUES (3, 'Dólar (blue)');
INSERT INTO moneda (id_moneda, nombre) VALUES (4, 'Dólar (contado con liqui)');
INSERT INTO moneda (id_moneda, nombre) VALUES (5, 'Dólar (mayorista)');
INSERT INTO moneda (id_moneda, nombre) VALUES (6, 'Dólar (cripto)');
INSERT INTO moneda (id_moneda, nombre) VALUES (7, 'Dólar (tarjeta)');

CREATE TABLE IF NOT EXISTS tipo_operacion
(
    id_tipo_operacion varchar(1) NOT NULL PRIMARY KEY, 
    nombre    varchar(30) NOT NULL
);

INSERT INTO tipo_operacion (id_tipo_operacion, nombre) VALUES ('C', 'Compra USD');
INSERT INTO tipo_operacion (id_tipo_operacion, nombre) VALUES ('V', 'Venta USD');

CREATE TABLE IF NOT EXISTS operaciones
(
    id_operacion        SERIAL NOT NULL PRIMARY KEY, 
    id_usuario          integer NOT NULL REFERENCES usuarios (id_usuario),
    fecha               timestamp NOT NULL DEFAULT current_timestamp, 
    id_tipo_operacion   varchar(1) NOT NULL REFERENCES tipo_operacion (id_tipo_operacion),
    id_moneda           int NOT NULL REFERENCES moneda (id_moneda),
    importe_ars         decimal(10,2) NOT NULL, 
    importe_usd         decimal(10,2) NOT NULL
);