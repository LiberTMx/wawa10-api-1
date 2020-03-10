update auth_user
set deleted_at=null
where deleted_at = '1900-01-01 00:00:00';
