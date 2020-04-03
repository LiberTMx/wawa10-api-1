CREATE  TABLE aftt_team
(
  id INT NOT NULL AUTO_INCREMENT ,
  aftt_LastSyncId int not null,
  TeamId varchar(255),
  Team varchar(255),
  DivisionId int not null,
  DivisionName varchar(255),
  DivisionCategory int,
  MatchType int,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE aftt_team
	ADD  INDEX aftt_team_aftt_LastSyncId_ix (aftt_LastSyncId ASC);

ALTER TABLE aftt_team 
  ADD CONSTRAINT aftt_team_fk FOREIGN KEY (aftt_LastSyncId) REFERENCES aftt_all_data (id);
