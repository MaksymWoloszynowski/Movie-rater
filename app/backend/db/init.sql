CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

-- MOVIES
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_language CHAR(2) NOT NULL,
    overview TEXT,
    poster_path VARCHAR(255),
    release_date DATE,
    slug VARCHAR(255) NOT NULL
);

-- REVIEWS
CREATE TABLE reviews (
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    movie_id SERIAL REFERENCES movies(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, movie_id)
);