CREATE  TABLE news_doc
(
  id INT NOT NULL AUTO_INCREMENT,
  news_id int not null,
  doc_filename varchar(255) NOT NULL,
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE news_doc 
	ADD UNIQUE INDEX news_news_id_uix (news_id);

ALTER TABLE news_doc 
  ADD CONSTRAINT news_doc_fk FOREIGN KEY (news_id) REFERENCES news (id);

ALTER TABLE news_doc 
	ADD UNIQUE INDEX news_doc_filename_uix (doc_filename asc);    
