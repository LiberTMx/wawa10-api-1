CREATE TABLE
    credentials
    (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(100) NOT NULL,
        credential VARCHAR(100) not null,
        PRIMARY KEY (id)
    )
   ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE credentials 
	ADD UNIQUE INDEX credentials_username_uix (username ASC);
