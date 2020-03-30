ALTER TABLE news_image
DROP FOREIGN KEY news_image_fk;

ALTER TABLE news_image 
ADD CONSTRAINT news_image_fk
  FOREIGN KEY (news_id)
  REFERENCES news(id)
  ON DELETE CASCADE;
  