SELECT * 
FROM users 
WHERE id in 
(
    SELECT fk_friend_user_id as id 
    FROM friends 
    WHERE fk_user_id = $1
);