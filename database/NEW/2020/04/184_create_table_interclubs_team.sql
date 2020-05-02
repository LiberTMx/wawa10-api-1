CREATE  TABLE interclubs_team
(
  id INT NOT NULL AUTO_INCREMENT ,
  TeamId varchar(255),
  Team varchar(255),
  DivisionId int not null,
  DivisionName varchar(255),
  DivisionCategory int,
  MatchType int,
  statut varchar(20) default 'OK',
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;


