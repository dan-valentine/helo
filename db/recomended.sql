SELECT * from user 
where user_id != $1
AND user_id NOT IN (
    SELECT fk_friend_user_id as id 
    FROM friends 
    where fk_user_id = $1
);