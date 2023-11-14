DROP DATABASE IF EXISTS expensesdb;

CREATE DATABASE expensesdb;
USE expensesdb;

create table expense (
	id INT not null auto_increment,
	name VARCHAR(50) not null,
	price INT not null,
	category enum('gastosFijos', 'compras', 'gato', 'permitidos') not null,
	username varchar(50) not null,
	created_at TIMESTAMP not null DEFAULT(NOW()),
	primary key (id)
);

insert into expense (name, price, category, username)
values ("Carrefour", 3000, "compras", "Edu"),
("Alimento balanceado", 7500, "gato", "Janis"),
("Agua", 1450, "gastosFijos", "Edu");

select * from expense