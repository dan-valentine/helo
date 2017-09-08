UPDATE users SET
    birthday = $2, 
    hair_color = $3, 
    eye_color = $4, 
    gender = $5, 
    first_name = $6, 
    last_name = $7
WHERE 
id = $1
RETURNING *;
