CREATE TABLE `interclubs_category` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `classementcategory` tinyint(3) DEFAULT NULL,
  `playercategory` int NOT NULL,
  `division_name_prefix` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_season` tinyint(2) DEFAULT NULL,
  `last_season` tinyint(2) DEFAULT NULL,
  `order` int(2) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
);
