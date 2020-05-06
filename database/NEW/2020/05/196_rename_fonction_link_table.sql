ALTER TABLE auth_user_fonction
RENAME TO  auth_user_fonctions_auth_fonction ;

ALTER TABLE auth_user_fonctions_auth_fonction
DROP FOREIGN KEY auth_user_fonction_f_fk,
DROP FOREIGN KEY auth_user_fonction_u_fk;
ALTER TABLE auth_user_fonctions_auth_fonction
CHANGE COLUMN auth_user_id authUserId INT(11) NOT NULL ,
CHANGE COLUMN fonction_id authFonctionId INT(11) NOT NULL ;
ALTER TABLE auth_user_fonctions_auth_fonction 
ADD CONSTRAINT auth_user_fonction_f_fk
  FOREIGN KEY (authFonctionId)
  REFERENCES auth_fonction (id)
  ON DELETE CASCADE,
ADD CONSTRAINT auth_user_fonction_u_fk
  FOREIGN KEY (authUserId)
  REFERENCES auth_user (id)
  ON DELETE CASCADE;