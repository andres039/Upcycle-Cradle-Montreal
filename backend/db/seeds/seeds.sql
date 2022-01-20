INSERT INTO users (username, email, password) VALUES (
  'Homer Simpson', 'homer@nuclearplant.com', 'password'
), (
  'Bart Simpson', 'bart@nuclearplant.com', 'password'
);

INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id)
VALUES ('Chair', 'Nice bizantine chair', 'https://i.pinimg.com/originals/d9/8c/98/d98c9835981b8eb41968f62185559f8b.jpg', 'Like new', 45.5017, -73.5673, '2022-01-05', 1, 2 ),
('Pool table', 'Luxurious pool table', 'backend/public/images/chair1.jpg', 'Like old', 45.4323, -73.6237, '2022-01-10', 2, 1),
('Sofa', 'Nice bizantine sofa', 'backend/public/images/chair1.jpg', 'Like new', 45.5079, -73.6934, '2022-01-13', 1, null),
('Book shelf', 'Nice bizantine book shelf', 'backend/public/images/chair1.jpg', 'Like old', 45.5271, -73.5832, '2022-01-15', 1, null);