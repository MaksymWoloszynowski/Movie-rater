-- USERS
INSERT INTO users (id, username, email, password_hash) VALUES
('11111111-1111-1111-1111-111111111111', 'alice', 'alice@mail.com', 'hash1'),
('22222222-2222-2222-2222-222222222222', 'bob', 'bob@mail.com', 'hash2'),
('33333333-3333-3333-3333-333333333333', 'carol', 'carol@mail.com', 'hash3'),
('44444444-4444-4444-4444-444444444444', 'dave', 'dave@mail.com', 'hash4');

-- MOVIES
INSERT INTO movies (id, title, year, genre) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Inception', 2010, 'Sci-Fi'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Interstellar', 2014, 'Sci-Fi'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'The Matrix', 1999, 'Action'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'The Godfather', 1972, 'Crime'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Pulp Fiction', 1994, 'Crime');

-- REVIEWS
INSERT INTO reviews (id, user_id, movie_id, rating, comment) VALUES
('10000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 9, 'Very mind bending'),
('10000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 8, 'Good but complex'),
('10000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 10, 'Masterpiece'),
('10000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 10, 'Classic'),
('10000000-0000-0000-0000-000000000005', '44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 9, 'Still holds up'),
('10000000-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 10, 'One of the best ever'),
('10000000-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 8, 'Stylish and fun'),
('10000000-0000-0000-0000-000000000008', '44444444-4444-4444-4444-444444444444', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 9, 'Great dialogues');