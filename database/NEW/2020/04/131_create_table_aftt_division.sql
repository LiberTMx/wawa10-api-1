CREATE  TABLE aftt_division
(
  id INT NOT NULL AUTO_INCREMENT ,
  aftt_LastSyncId int not null,
  DivisionId int not null,
  DivisionName varchar(255),
  DivisionCategory int,
  Level int,
  MatchType int,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE aftt_division
	ADD  INDEX aftt_division_aftt_LastSyncId_ix (aftt_LastSyncId ASC);

ALTER TABLE aftt_division 
  ADD CONSTRAINT aftt_division_fk FOREIGN KEY (aftt_LastSyncId) REFERENCES aftt_all_data (id);