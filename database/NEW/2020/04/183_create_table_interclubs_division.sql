CREATE  TABLE interclubs_division
(
  id INT NOT NULL AUTO_INCREMENT ,
  DivisionId int not null,
  DivisionName varchar(255),
  DivisionCategory int,
  Level int,
  MatchType int,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

