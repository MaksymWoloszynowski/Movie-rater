CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    keycloak_id TEXT NOT NULL UNIQUE,
    username TEXT,
    email TEXT,
    is_banned BOOLEAN NOT NULL DEFAULT FALSE
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