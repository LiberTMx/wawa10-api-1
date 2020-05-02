drop table aftt_player_category;
CREATE TABLE `aftt_player_category` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `short_name` varchar(3) NOT NULL DEFAULT '???',
  `sex` enum('M','F') COLLATE utf8_unicode_ci DEFAULT NULL,
  `non_strict_sex` enum('M','F') COLLATE utf8_unicode_ci DEFAULT NULL,
  `min_age` tinyint(2) unsigned DEFAULT NULL,
  `non_strict_min_age` tinyint(2) unsigned DEFAULT NULL,
  `max_age` tinyint(2) unsigned DEFAULT NULL,
  `non_strict_max_age` tinyint(2) unsigned DEFAULT NULL,
  `classementcategory` tinyint(2) unsigned NOT NULL DEFAULT '1',
  `min_age_year_only` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  `max_age_year_only` enum('Y','N') COLLATE utf8_unicode_ci DEFAULT 'Y',
  `group` mediumtext COLLATE utf8_unicode_ci,
  `order` mediumint(3) NOT NULL DEFAULT '0',
  `show_index` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
;