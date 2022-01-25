INSERT INTO users (username, email, password) VALUES (
  -- password: aaa
  'Homer Simpson', 'homer@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Bart Simpson', 'bart@nuclearplant.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Jean-Luc Picard', 'picard@starfleet.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Kathryn Janeway', 'janeway@starfleet.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Tony Stark', 'tony@stark-industries.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
), (
  'Steve Rogers', 'steve@avengers.com', '$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa'
);

INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id)
-- blue
VALUES ('Bizantine chair', 'This nice chair made from silk has only been used for a few month. It has soft cushions for maximum comfort.', 'https://i.pinimg.com/originals/d9/8c/98/d98c9835981b8eb41968f62185559f8b.jpg', 'Like new', 45.5017, -73.5673, '2022-01-25', 1, null ),
-- green
('Luxurious pool table', 'Folding Green Felt Billiard Table with Accessories is perfect for anyone to learn fun new games. The folding pool table comes with everything you need to play a wide variety of pool games including two cues, two chalks, a racking triangle, grooming brush, and a complete set of 16 billiard balls.', 'https://i.ebayimg.com/images/g/mAcAAOSwtLtedl5Y/s-l300.jpg', 'Fair', 45.4323, -73.6237, '2022-01-25', 2, null),
-- violet
('Round table', 'Used by King Arthur when meeting with his knights. It will add a very classic look to your home.', 'https://homein1.co.za/wp-content/uploads/2017/03/k08-300x275.jpg', 'Small imperfections', 45.5079, -73.6934, '2022-01-26', 2, null),
-- orange
('Wooden bookcase', 'Barrister bookcase consists of several separate shelf units that may be stacked together to form a cabinet. An additional plinth and hood complete the piece.', 'http://1.bp.blogspot.com/_tfGC7tOlrdk/Sd-jZiwV4hI/AAAAAAAAHmk/-xSM1l8SHEU/s400/Hale-barrister-bookcase-300.png', 'Old', 45.7571, -73.5832, '2022-01-26', 1, null),
-- invisible
('Flat screen TV', 'A 42 inch LCD screen with a seamless, edge-to-edge panel and an ultra-slim cabinet depth for a look that is sure to turn heads.', 'http://2.bp.blogspot.com/_AJrDp61Dcto/SwFmX0br1fI/AAAAAAAAHVo/78bQGGgZQkg/s400/lg-tv-LF10-LF11-Medium.jpg', 'New', 45.8071, -73.5832, '2022-01-26', 1, null),
('Printer', 'Color printer with a capacity of 250 sheets of paper. Minor scratches on the top of the printer.', 'http://www.247inktoner.com/Content/ProductImages/Images/CategoryImages/HP/HP-Deskjet-300.jpg', 'Like New', 45.4571, -73.5532, '2022-01-27', 1, null),
('Mega Sofa', 'Seats 12. Great for family movie nights or hanging out with your friends.', 'http://ecx.images-amazon.com/images/I/51wmv6cwzZL._SL500_AA300_.jpg', 'New', 45.4771, -73.6032, '2022-01-27', 1, null);



-- green pin -> pin being created atm

-- 1) UNCLAIMED && Created by someone else (all     blue)   !claimed && current_user !== item.creator_id
-- 2) UNCLAIMED && You created it                 (green)   !claimed && current_user === item.creator_id
-- 3) CLAIMED by someone else, but you CREATED it (violet)  claimed && current_user === item.creator_id
-- 4) CLAIMED by you, someone else created it     (orange)  claimed && current_user === item.claimer_id

-- blue pin -> any available pin
-- orange -> one you claimed
-- violet -> you are the creator and someone claimed it
-- $2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa