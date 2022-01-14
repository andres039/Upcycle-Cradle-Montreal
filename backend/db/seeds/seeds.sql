INSERT INTO users (username, email, password) VALUES (
  'Homer Simpson', 'homer@nuclearplant.com', 'password'
), (
  'Bart Simpson', 'bart@nuclearplant.com', 'password'
);

INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id) VALUES (
   'Chair', 'Nice bizantine chair', 'backend/public/images/chair1.jpg', 'Like new',45.5017, 73.5673, '2022-01-05', 1, 2 
);

-- INSERT INTO polls (email, title, description, administrative_link, submission_link, name_required)
-- VALUES ('alice@gmmail.com', 'Weekend activity', 'Hey folks please vote for what we should do for the weekend.', 'aaa', 'bbb', 't');
