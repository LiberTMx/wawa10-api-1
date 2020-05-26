-- interclubs_match_id varchar(250) not null,
-- auth_user_id int not null,
-- interclubs_semaine_version_id int not null,

-- foreign keys
-- ALTER TABLE interclubs_selection 
-- ADD CONSTRAINT interclubs_selection_interclubs_match_id_fk FOREIGN KEY (interclubs_match_id) REFERENCES interclubs_match (match_id); 

ALTER TABLE interclubs_selection 
  ADD CONSTRAINT interclubs_selection_auth_user_id_fk FOREIGN KEY (auth_user_id) REFERENCES auth_user (id);

ALTER TABLE interclubs_selection 
  ADD CONSTRAINT interclubs_selection_interclubs_semaine_version_id_fk FOREIGN KEY (interclubs_semaine_version_id) REFERENCES interclubs_semaine_version (id);