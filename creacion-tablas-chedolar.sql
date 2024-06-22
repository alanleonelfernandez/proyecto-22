drop schema if exists chedolar; 
create schema chedolar; 
use chedolar;

create table tipo_usuario
(
   id_tipo_usuario varchar(1) not null, 
   tipo varchar(30) not null,
   primary key (id_tipo_usuario)
);

INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES ('A', 'Administrador');
INSERT INTO tipo_usuario (id_tipo_usuario, tipo) VALUES ('U', 'Usuario');

create table usuarios
(
   id_usuario  serial not null, 
   email        varchar(100) not null,
   password		varchar(30),
   nombre		varchar(30), 
   apellido     varchar(30),
   id_tipo_usuario varchar(1) not null,
   saldo_ars	numeric, 
   saldo_usd    numeric,
   foreign key (id_tipo_usuario) references tipo_usuario (id_tipo_usuario),
   primary key (id_usuario)
);

create table moneda
(
	id_moneda  varchar(5) not null primary key, 
    nombre     varchar(30) not null
);

INSERT INTO moneda (id_moneda, nombre) VALUES ('ARS', 'Peso Argentino');
INSERT INTO moneda (id_moneda, nombre) VALUES ('USD', 'Dólar (oficial)');
INSERT INTO moneda (id_moneda, nombre) VALUES ('XUSDB', 'Dólar (blue)');
INSERT INTO moneda (id_moneda, nombre) VALUES ('XUSDM', 'Dólar (MEP)');

create table tipo_operacion
(
	id_tipo_operacion varchar(1) not null primary key, 
    nombre    varchar(30) not null
);

INSERT INTO tipo_operacion (id_tipo_operacion, nombre) VALUES ('C', 'Compra USD');
INSERT INTO tipo_operacion (id_tipo_operacion, nombre) VALUES ('V', 'Venta USD');

create table operaciones
(
	id_operacion		serial not null primary key, 
    id_usuario          integer not null references usuarios (id_usuario),
    fecha				timestamp not null default current_timestamp, 
    id_tipo_operacion	varchar(1) not null references tipo_operacion, 
    id_moneda			varchar(5) not null references moneda,
    importe_ars			numeric not null, 
    importe_usd  		numeric not null
);


