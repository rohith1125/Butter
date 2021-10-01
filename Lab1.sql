/*1.Create the above tables by properly specifying the primary keys and the foreign keys.*/
create table person
(ID varchar(5),name varchar(15),Address varchar(15),PRIMARY KEY(ID));

create table car
(regno varchar(15),model varchar(15),Year int,PRIMARY KEY(regno));

create table accident
(report_num int,accid_date date,location varchar(10),PRIMARY key(report_num));

create table owns
(ID varchar(5),regno varchar(10),PRIMARY KEY(ID,regno),foreign key(ID) references person on delete set null,
foreign key(regno) references car on delete set null);

create table participated
(ID varchar(5),regno varchar(10),report_num int,damage_accnt int, 6 foreign key(ID) references person on delete set null,
foreign key(regno) references car on delete set null,
foreign key(report_num) references accident on delete set null);

/* Enter at least five tuples for each relation.*/
insert into person
values('1','Jack','San Fransisco');

insert into person
values('2','Steve','Brooklyn');

insert into person
values('3','Peter','Manhattan');

insert into person
values('4','Tim','Cupertino');

insert into person
values('5','Craig','Las Vegas');

insert into car
values('1111','Mustang',1999);

insert into car
values('2222','Corvette',2004);

insert into car
values('3333','Volt',2004);

insert into car
values('4444','Punto',2014);

insert into car
values('5555','Civic',2018);


insert into accident
values(212,'15-feb-2005','Los Angeles');

insert into accident
values(213,'10-jun-2006','Bronx');

insert into accident
values(214,'15-nov-2011','Queens');

insert into accident
values(215,'22-mar-2016','Palo Alto');

insert into accident
values(216,'27-may-2019','SF Bay Area');


insert into owns
values('1','1111');

insert into owns
values('2','2222');

insert into owns 
values('3','3333');

insert into owns
values('4','4444');

insert into owns
values('5','5555');


insert into participated
values('1','1111',212,200);

insert into participated
values('2','2222',213,350);

insert into participated
values('3','3333',214,500);

insert into participated
values('4','4444',215,590);

insert into participated
values('5','5555',216,600);

/*Update the damage amount to 600 for the car with a specific reg. no in a 
PARTICIPATED table with report number 216.*/
update participated
set damage_accnt = 250
where regno = '600' and report_num = 216;

/*Delete the accident and related information that took place in a specific year. (Hint: 
Command to extract year component from the date attribute is, extract (year from 
accd_date)
*/
delete from accident
where extract(year from accid_date) = 2019;

/* Alter table to add and delete an attribute */
alter table person add age int;
update person
set age = 45
where name = 'Steve';

/* Remove age attribute */
alter table person drop column age;

/* Alter table to add Check constraint. */
alter table car
add check(year>1999);
