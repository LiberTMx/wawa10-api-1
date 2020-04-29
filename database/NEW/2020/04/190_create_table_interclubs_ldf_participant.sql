CREATE  TABLE interclubs_ldf_participant
(
  id INT NOT NULL AUTO_INCREMENT ,
  nom varchar(255) DEFAULT NULL,
  prenom varchar(255) DEFAULT NULL,
  sexe varchar(1) DEFAULT NULL,
  licence varchar(25) not null,
  auth_user_id int,
  statut varchar(10),
  player_category varchar(3) not null,
  medical_attestation TINYINT(1),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE interclubs_ldf_participant 
ADD CONSTRAINT interclubs_ldf_p_user_fk
  FOREIGN KEY (auth_user_id)
  REFERENCES auth_user(id)
  ON DELETE CASCADE;   

/* Fonctionne pas, short_name n'est PAS unique dans la table aftt_player_category !!!!
ALTER TABLE interclubs_ldf_participant 
ADD CONSTRAINT interclubs_ldf_p_cat_fk
  FOREIGN KEY (player_category)
  REFERENCES aftt_player_category(short_name)
  ON DELETE CASCADE;   
*/