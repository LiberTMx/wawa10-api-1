CREATE  TABLE news_image
(
  id INT NOT NULL AUTO_INCREMENT,
  news_id int not null,
  image_filename varchar(255) NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE news_image 
	ADD UNIQUE INDEX news_news_id_uix (news_id);

ALTER TABLE news_image 
  ADD CONSTRAINT news_image_fk FOREIGN KEY (news_id) REFERENCES news (id);

ALTER TABLE news_image 
	ADD UNIQUE INDEX news_image_filename_uix (image_filename asc); 