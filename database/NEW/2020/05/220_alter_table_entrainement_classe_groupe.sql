ALTER TABLE entrainement_classe_groupe
ADD CONSTRAINT entrainement_classe_groupe_fk
  FOREIGN KEY (classe_id)
  REFERENCES entrainement_classe (id)
  ON DELETE CASCADE;
