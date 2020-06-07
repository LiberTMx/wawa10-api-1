ALTER TABLE auth_group_role
ADD CONSTRAINT auth_group_role_group_fk
  FOREIGN KEY (group_id)
  REFERENCES auth_group (id)
  ON DELETE CASCADE;

ALTER TABLE auth_group_role
ADD CONSTRAINT auth_group_role_role_fk
  FOREIGN KEY (role_id)
  REFERENCES auth_role (id)
  ON DELETE CASCADE;