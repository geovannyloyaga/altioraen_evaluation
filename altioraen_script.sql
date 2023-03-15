/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/03/2023 22:42:03                          */
/*==============================================================*/

create database altioraen;

use altioraen;

alter table articles 
   drop foreign key fk_articles_relations_order;

alter table orders 
   drop foreign key fk_order_relations_clients;


alter table articles 
   drop foreign key fk_articles_relations_order;

drop table if exists articles;

drop table if exists clients;


alter table orders 
   drop foreign key fk_order_relations_clients;

drop table if exists orders;

/*==============================================================*/
/* Table: articles                                              */
/*==============================================================*/
create table articles
(
   id          int not null auto_increment comment '',
   order_id             int  comment '',
   code                 varchar(5) unique not null  comment '',
   name_article         varchar(200) not null  comment '',
   unit_price           decimal(18,2) not null  comment '',
   created_at           timestamp comment '',
   updated_at           timestamp null comment '',
   primary key (id)
);

/*==============================================================*/
/* Table: clients                                               */
/*==============================================================*/
create table clients
(
   id            int not null auto_increment comment '',
   dni                  varchar(13)  comment '',
   name                 varchar(100) not null  comment '',
   last_name            varchar(100) not null  comment '',
   created_at           timestamp  comment '',
   updated_at           timestamp null  comment '',
   primary key (id)
);

/*==============================================================*/
/* Table: "order"                                               */
/*==============================================================*/
create table orders
(
   id             int not null auto_increment comment '',
   client_id            int  comment '',
   date                 date not null  comment '',
   subtotal             decimal(18,2) not null  comment '',
   created_at           timestamp  comment '',
   updated_at           timestamp null comment '',
   primary key (id)
);

alter table articles add constraint fk_articles_relations_order foreign key (order_id)
      references orders (order_id);

alter table orders add constraint fk_order_relations_clients foreign key (client_id)
      references clients (client_id);
