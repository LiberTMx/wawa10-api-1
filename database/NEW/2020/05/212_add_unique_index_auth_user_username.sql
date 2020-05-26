ALTER TABLE interclubs_selection 
	ADD UNIQUE INDEX interclubs_selection_uix (interclubs_match_id asc, interclubs_semaine_version_id asc, position asc);
    