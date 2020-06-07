ALTER TABLE auth_user_group
ADD CONSTRAINT auth_user_group_group_fk
  FOREIGN KEY (group_id)
  REFERENCES auth_group (id)
  ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE auth_user_group
ADD CONSTRAINT auth_user_group_user_fk
  FOREIGN KEY (user_id)
  REFERENCES auth_user (id)
  ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=1;