drop table if exists aftt_week_by_category;
CREATE  TABLE aftt_week_by_category
(
  id INT NOT NULL AUTO_INCREMENT ,
  aftt_LastSyncId int not null, -- FK
  division_category_id tinyint(2) unsigned NOT NULL,  -- FK
  week_name varchar(5),
  week_number int,
  year int,
  start_of_week date,
  end_of_week date,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

-- indexes
ALTER TABLE aftt_week_by_category
	ADD  INDEX aftt_week_by_category_aftt_LastSyncId_ix (aftt_LastSyncId ASC);
ALTER TABLE aftt_week_by_category
	ADD  INDEX aftt_week_by_category_division_category_id_ix (division_category_id ASC);

-- foreign keys
ALTER TABLE aftt_week_by_category 
  ADD CONSTRAINT aftt_weekByCategory_LastSyncId_fk FOREIGN KEY (aftt_LastSyncId) REFERENCES aftt_all_data (id);

ALTER TABLE aftt_week_by_category 
  ADD CONSTRAINT aftt_weekByCategory_divisionCategory_fk FOREIGN KEY (division_category_id) REFERENCES aftt_division_category (id);