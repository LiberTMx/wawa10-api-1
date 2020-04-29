CREATE  TABLE interclubs_match
(
  id INT NOT NULL AUTO_INCREMENT ,
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
  homeTeamId varchar(20),
  awayTeamId varchar(20),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

