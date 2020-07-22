/* @name getAll */
select * from todo;

/* @name get */
select * from todo where id = :id;

/* @name update */
update todo
set done=:done, description=:description, date=:date
where id=:id;

/* @name insert */
insert into todo(description, done, date)
values (:description, :done, :date) returning id;
