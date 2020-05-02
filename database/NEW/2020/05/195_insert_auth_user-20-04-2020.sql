
INSERT INTO auth_fonction 
(code, designation, description, membre_comite, deletable, ordre_affichage)
VALUES 
('PRE','Président','Président du club',1,0,10),
('TRE','Trésorier','Le trésorier du club',1,0,30),
('SEC','Secrétaire','Secrétaire du club',1,0,20),
('SEC-A','Secrétaire adjoint','Un secrétaire adjoint du club',1,0,51),
('CAC','Commissaire aux comptes','Un commissaire au compte; il en faut en principe 2 !',0,0,100),
('TRE-A','Trésorier Adjoint','Un trésorier adjoint; il peut y en avoir plusieurs',1,0,52),
('CAP','Capitaine','Capitaine d\'une équipe',0,0,100);
