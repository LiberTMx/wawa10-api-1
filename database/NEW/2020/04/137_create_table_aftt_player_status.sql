CREATE TABLE `aftt_player_status` (
  `status` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order` tinyint(2) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_playerlist` tinyint(1) DEFAULT '1',
  `is_matchsheet` tinyint(1) DEFAULT '1',
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`status`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
;

ALTER TABLE aftt_player_status
	ADD UNIQUE INDEX aftt_player_status_status_uix (status ASC);

INSERT INTO `aftt_player_status` 
VALUES ('A','Active',1,1,1,1,1),('L','NonPlayingMembers',3,0,0,0,1),('I','NonActive',4,0,0,0,1),
    ('R','Recreant',5,1,1,0,0),('V','RecreantReserve',6,1,1,1,0),('S','SuperDivision',8,1,1,1,1),
    ('E','External',9,1,0,0,1),('M','AdministrativeMembers',2,1,0,0,1),('D','DoubleAffiliation',7,1,1,1,1),
    ('T','DoubleAffiliationSuper',8,0,1,1,0);
