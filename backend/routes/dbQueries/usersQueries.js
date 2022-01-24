const getAllUsers = (db) => {
  return db
    .query("SELECT * FROM users;")
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.getAllUsers = getAllUsers;

const getUsersById = (db, id) => {
  return db
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.getUsersById = getUsersById;

const getUsersByEmail = (db, email) => {
  return db
    .query("SELECT * FROM users WHERE email=$1;", [email])
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.getUsersByEmail = getUsersByEmail;

const insertNewUser = (db, username, email, hashedPassword) => {
  return db
    .query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return null;
    });
};

exports.insertNewUser = insertNewUser;
