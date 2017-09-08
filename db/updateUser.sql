UPDATE users set
( 
    birthday, 
    hair_color, 
    eye_color, 
    gender, 
    first_name, 
    last_name
) 
VALUES
(
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
)
WHERE 
id = $1
LIMIT 1;
