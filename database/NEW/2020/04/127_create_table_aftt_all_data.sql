CREATE  TABLE aftt_all_data
(
  id INT NOT NULL AUTO_INCREMENT ,
  created_at datetime DEFAULT NULL,
  created_by_id int default null,
  teams_data mediumtext,
  divisions_data mediumtext,
  matches_data mediumtext,
  membres_data mediumtext,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

