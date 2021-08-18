CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    message_add VARCHAR(255) NOT NULL
);

INSERT INTO contacts (full_name, email, phone_number, message_add)
VALUES  ('Oluwatimilehin Idowu', 'oluwatimilehin.id@gmail.com', '07033101663', 'Hey there');