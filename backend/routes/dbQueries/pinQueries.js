const getAllPins = (db) => {
  return db
    .query("SELECT * FROM pins;")
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.getAllPins = getAllPins;

const getPinsById = (db, id) => {
  return db
    .query("SELECT * FROM pins WHERE id=$1;", [id])
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.getPinsById = getPinsById;

const deletePins = (db, id) => {
  return db
    .query("DELETE FROM pins WHERE id = $1 RETURNING *;", [id])
    .then(response => response)
    .catch((err) => {
      console.log(err);
      return null;
    });
};
exports.deletePins = deletePins;

const updateIndividualPins = (db, current_user_id, pinID) => {
  return db
    .query("UPDATE pins SET claimer_id = $1 WHERE id = $2 RETURNING *;", [
      current_user_id,
      pinID,
    ])
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.updateIndividualPins = updateIndividualPins;

const insertNewPin = (
  db,
  title,
  description,
  picture,
  condition,
  latitude,
  longitude,
  date,
  creator_id,
  claimer_id
) => {
  return db
    .query(
      "INSERT INTO pins (title, description, picture, condition, latitude, longitude, date, creator_id, claimer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        title,
        description,
        picture,
        condition,
        latitude,
        longitude,
        date,
        creator_id,
        claimer_id,
      ]
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.insertNewPin = insertNewPin;
