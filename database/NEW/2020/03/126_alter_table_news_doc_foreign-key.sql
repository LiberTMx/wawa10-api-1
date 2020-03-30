ALTER TABLE news_doc
DROP FOREIGN KEY news_doc_fk;

ALTER TABLE news_doc 
ADD CONSTRAINT news_doc_fk
  FOREIGN KEY (news_id)
  REFERENCES news(id)
  ON DELETE CASCADE;
  