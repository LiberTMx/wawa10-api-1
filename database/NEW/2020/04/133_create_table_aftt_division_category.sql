drop table aftt_division_category;
CREATE TABLE `aftt_division_category` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `classementcategory` tinyint(3) DEFAULT NULL,
  `playercategory` int NOT NULL,
  `division_name_prefix` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_season` tinyint(2) DEFAULT NULL,
  `last_season` tinyint(2) DEFAULT NULL,
  `order` int(2) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

  ALTER TABLE aftt_division_category
	ADD  UNIQUE INDEX aftt_division_category_playercategory_uix (playercategory ASC);
    
INSERT INTO `aftt_division_category` VALUES 
(1,'Hommes',1,1,'H',NULL,NULL,1),
(2,'Dames',2,2,'D',NULL,NULL,2),
(3,'Veterans',1,3,'V',NULL,NULL,3),
(4,'Ainees',2,4,'A',NULL,NULL,4),
(13,'Jeunes',1,13,'J',NULL,NULL,5);