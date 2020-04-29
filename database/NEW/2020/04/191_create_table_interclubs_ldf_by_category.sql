CREATE  TABLE interclubs_ldf_by_category
(
  id INT NOT NULL AUTO_INCREMENT ,
  participant_id int not null,
  player_category int(11) not null,
  position int not null,
  classement varchar(20) not null,
  ranking_index int not null,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE interclubs_ldf_by_category 
ADD CONSTRAINT interclubs_ldf_by_category_p_fk
  FOREIGN KEY (participant_id)
  REFERENCES interclubs_ldf_participant(id)
  ON DELETE CASCADE; 

ALTER TABLE interclubs_ldf_by_category 
ADD CONSTRAINT interclubs_ldf_by_category_div_cat_fk
  FOREIGN KEY (player_category)
  REFERENCES aftt_division_category(playercategory)
  ON DELETE CASCADE;   