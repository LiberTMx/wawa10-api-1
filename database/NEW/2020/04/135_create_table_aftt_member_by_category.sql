drop table if exists aftt_member_by_category;
CREATE  TABLE aftt_member_by_category
(
  id INT NOT NULL AUTO_INCREMENT ,
  aftt_LastSyncId int not null,
  division_category int not null,
  Position int,
    UniqueIndex int,
    RankingIndex int,
    FirstName varchar(250),
    LastName varchar(250),
    Ranking varchar(250),
    Status varchar(250),
    Gender varchar(250),
    Category varchar(250),
    MedicalAttestation int(1),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE aftt_member_by_category
	ADD  INDEX aftt_member_by_category_LastSyncId_ix (aftt_LastSyncId ASC);

ALTER TABLE aftt_member_by_category 
  ADD CONSTRAINT aftt_member_by_category_fk FOREIGN KEY (aftt_LastSyncId) REFERENCES aftt_all_data (id);