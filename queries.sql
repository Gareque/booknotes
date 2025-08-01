-- Create the table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    comments TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL
);

-- Inserting values into the table
INSERT INTO books(title, author, rating, comments, isbn)
VALUES 
('Magician', 'Raymond E Feist', 8.5, 'A fantastic, lengthy read which you can really sink your teeth into!', '0586213430'),
('Shadow of a Dark Queen', 'Raymond E Feist', 9.0, 'An intriguing tale with a very dark tone.', '0688124089'),
('Assassins Apprentice', 'Robin Hobb', 9.1, 'One of the greatest novels about assassins ever written...', '0006480098'),
('Shadow', 'K J Parker', 8.0, 'Dark, twisted, horrigying...  Yet somehow relatable and gut wrenching.', '1841490199');