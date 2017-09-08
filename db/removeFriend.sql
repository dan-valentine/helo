DELETE FROM friends
WHERE
fk_user_id = $1 AND fk_friend_user_id = $2;

SELECT *
FROM friends
WHERE fk_user_id = $1