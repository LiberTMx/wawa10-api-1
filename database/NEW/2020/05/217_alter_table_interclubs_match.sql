
ALTER TABLE interclubs_division 
	ADD UNIQUE INDEX interclubs_division_DivisionId_uix (DivisionId asc);

ALTER TABLE interclubs_match 
ADD CONSTRAINT interclubs_match_division_fk
  FOREIGN KEY (DivisionId)
  REFERENCES interclubs_division(DivisionId)
  ON DELETE CASCADE; 