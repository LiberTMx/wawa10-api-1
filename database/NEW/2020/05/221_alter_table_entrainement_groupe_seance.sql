ALTER TABLE entrainement_groupe_seance
ADD CONSTRAINT entrainement_groupe_seance_fk
  FOREIGN KEY (groupe_id)
  REFERENCES entrainement_classe_groupe (id)
  ON DELETE CASCADE;
