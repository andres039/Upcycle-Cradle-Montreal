INSERT INTO users (username, email, password) VALUES (
  -- password: aaa
  'Homer Simpson', 'homer@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Bart Simpson', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'aaa', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'bbb', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'ccc', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'ddd', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
);

INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id)
-- blue
VALUES ('Blue', 'Nice bizantine chair', 'https://i.pinimg.com/originals/d9/8c/98/d98c9835981b8eb41968f62185559f8b.jpg', 'Like new', 45.5017, -73.5673, '2022-01-05', 1, null ),
-- green
('Green', 'Luxurious pool table', 'backend/public/images/chair1.jpg', 'Like old', 45.4323, -73.6237, '2022-01-10', 2, null),
-- violet
('Violet', 'Nice bizantine sofa', 'backend/public/images/chair1.jpg', 'Like new', 45.5079, -73.6934, '2022-01-13', 2, 4),
-- orange
('Orange', 'shelf', 'booboo', 'Like old', 45.7571, -73.5832, '2022-01-15', 1, 2),
-- invisible
('Invisible', 'TV', 'blan', 'Like old', 45.8071, -73.5832, '2022-01-15', 1, 3);
-- ('Red wire', 'wireeee', 'backend/public/images/chair1.jpg', 'Like old', 45.6171, -73.5832, '2022-01-15', 1, null),
-- ('Painting', 'cool stuff', 'stuff', 'New', 45.6371, -73.5832, '2022-01-15', 1, null);



-- green pin -> pin being created atm

-- 1) UNCLAIMED && Created by someone else (all     blue)   !claimed && current_user !== item.creator_id
-- 2) UNCLAIMED && You created it                 (green)   !claimed && current_user === item.creator_id
-- 3) CLAIMED by someone else, but you CREATED it (violet)  claimed && current_user === item.creator_id
-- 4) CLAIMED by you, someone else created it     (orange)  claimed && current_user === item.claimer_id

-- blue pin -> any available pin
-- orange -> one you claimed
-- violet -> you are the creator and someone claimed it
-- $2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa