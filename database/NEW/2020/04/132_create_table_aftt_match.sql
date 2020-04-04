drop table aftt_match;
CREATE  TABLE aftt_match
(
  id INT NOT NULL AUTO_INCREMENT ,
  aftt_LastSyncId int not null,
  week_name varchar(250),
  match_id varchar(250),
  match_date date,
  match_time varchar(20),
  venue_number int,
  HomeClub varchar(250),
  HomeTeam varchar(250),
  AwayClub varchar(250),
  AwayTeam varchar(250),
  Score varchar(250),
  MatchUniqueId int ,
  IsHomeForfeited int(1),
  IsAwayForfeited int(1),
  DivisionId int not null,
  DivisionCategory varchar(250),
  IsHomeWithdrawn varchar(250),
  IsAwayWithdrawn varchar(250),
  -- // VENUE
  venue_name varchar(250),
  venue_street varchar(250),
  venue_town varchar(250),
  venue_phone varchar(250),
  venue_comment varchar(250),
  is_validated int(1),
  is_locked int(1),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE aftt_match
	ADD  INDEX aftt_match_aftt_LastSyncId_ix (aftt_LastSyncId ASC);

ALTER TABLE aftt_match 
  ADD CONSTRAINT aftt_match_fk FOREIGN KEY (aftt_LastSyncId) REFERENCES aftt_all_data (id);