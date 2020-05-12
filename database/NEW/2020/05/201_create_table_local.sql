create table local
(
  id INT NOT NULL AUTO_INCREMENT,
  nom varchar(200) not null,
  localisation varchar(200),
  rue varchar(120),
  numero varchar(10),
  boite varchar(10),
  code_postal varchar(8),
  localite varchar(70),
  nbr_tables int,
  nbr_max_tables int,
  local_par_defaut tinyint(1),
  num_tel varchar(120),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

insert into local(
    nom, localisation, rue , numero , boite, code_postal, localite, nbr_tables, nbr_max_tables, local_par_defaut, num_tel )
values(
'CTT Limal-Wavre',
'Complexe Sportif de Limal','rue Charles Jaulotte', '156', null, '1300', 'Limal', 10, 12, 1, '010.22.60.89 (Centre Sportif)'
);