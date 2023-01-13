create table contacts (
  id int not null auto_increment,
  username varchar(255) not null,
  email varchar(255) not null,
  title varchar(255) not null,
  category varchar(255) not null,
  message text not null,
  link text default null, 
  primary key(id)
);

-- Getting all commands
-- select * from contacts;

-- Adding a Contact.
-- insert into contacts (username, email, title, category, message, link) values ('kimx5154', 'kimx5154@umn.edu', 'TEST', 'comment', 'HOPE THIS SHOW UP', 'http://localhost:3306');

-- Deleting a row
-- delete from contacts where id=2;