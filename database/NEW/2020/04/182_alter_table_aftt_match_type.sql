
ALTER TABLE
    aftt_match_type ADD
        (
            supported_by_club tinyint(1) not null default 0
         );

update aftt_match_type
set supported_by_club = 1
where match_type=2 or match_type=4;