ALTER TABLE
    interclubs_category ADD
        (
            synonyme varchar(30)
         );

update interclubs_category
set synonyme='Seniors' where playercategory=1;
update interclubs_category
set synonyme='Dames' where playercategory=2;
update interclubs_category
set synonyme='Vétérans' where playercategory=3;
update interclubs_category
set synonyme='Aînées' where playercategory=4;
update interclubs_category
set synonyme='Jeunes' where playercategory=13;
