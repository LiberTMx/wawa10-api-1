CREATE DEFINER=`root`@`localhost` PROCEDURE `set_user_default_group`()
BEGIN
	declare bDone int;
	declare v_user_id int;
    declare v_group_id int;
    DECLARE exit_loop BOOLEAN;
    
    declare user_cursor cursor for select id from auth_user; -- where username!='guy' and username!='kaisinf' and username!='liberm' and username!='dumortf';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    
    set bDone=0;
    select id into v_group_id from auth_group where name='club_membre';
    open user_cursor;
    user_loop: LOOP
		fetch user_cursor into v_user_id;
        -- select * from auth_user where id = user_id;
        if exit_loop then
			leave user_loop;
		end if;
        insert ignore into auth_user_group( user_id, group_id)
			values( v_user_id, v_group_id);
	END LOOP user_loop;
    close user_cursor;
END