ALTER TABLE aftt_division
	ADD  INDEX aftt_division_DivisionCategory_ix (DivisionCategory ASC);

ALTER TABLE aftt_division 
  ADD CONSTRAINT aftt_division_DivisionCategory_fk FOREIGN KEY (DivisionCategory) REFERENCES aftt_division_category (playercategory);