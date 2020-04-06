CREATE  TABLE aftt_match_type
(
  id INT NOT NULL AUTO_INCREMENT ,
  match_type int not null,
  comment varchar(255),
  PRIMARY KEY  (id) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

insert into aftt_match_type(match_type, comment)
values(1, 'Interclubs Provincial (avant 2001)');

insert into aftt_match_type(match_type, comment)
values(2, 'Interclubs Provincial');

insert into aftt_match_type(match_type, comment)
values(3, 'Interclubs Provincal Dames (avant 2001)');

insert into aftt_match_type(match_type, comment)
values(4, 'Interclubs Provincal Dames/Vétérans');

insert into aftt_match_type(match_type, comment)
values(5, 'SuperDivisie (met dubbelspel)');

insert into aftt_match_type(match_type, comment)
values(6, 'Jeugd Antwerpen (2x2)');

insert into aftt_match_type(match_type, comment)
values(7, 'Vrijetijdscompetitie Limburg');

insert into aftt_match_type(match_type, comment)
values(8, 'SuperDivisie (met invaller, zonder dubbel)');

insert into aftt_match_type(match_type, comment)
values(9, '3 tegen 3 (zonder dubbelspel)');
