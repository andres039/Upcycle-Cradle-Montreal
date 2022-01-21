import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// import Button from 'components/Button'

const RegistrationForm = (props) => {
  // States for registration
  const context = useContext(AuthContext);


  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // // States for checking the errors
  const [error, setError] = useState(false);

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmationPassword = (e) => {
    setConfirmationPassword(e.target.value);
  };

  const validate = (itemData) => {
    if (password !== confirmationPassword) {
      console.log("🔥 passwords must match 🔥");
      setConfirmationPassword("error");
      return;
    } else {

      return axios
        .post("http://localhost:8081/register", itemData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);

          // setPin(itemData);
        })
        .then(() => navigate("/mapview"));
    }
  };

  // Handling the form submission
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmationPassword === ""
    ) {
      setError(true);
    } else {

      setError(false);
      //registrationHandle
      validate({ email, password, username });
    }
  };


  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  //

  return (
    <div className="form">
      <div>
        <h1>Register</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {/* {successMessage()} */}
      </div>

      {confirmationPassword === "error" && (
        <h1>🔥 Password and password confirmation must match 🔥</h1>
      )}

      <form>
        {/* Labels and inputs for form data */}
        <label className="username">Username: </label>
        <input
          name="username"
          type="text"
          className="username"
          onChange={handleUsername}
          value={username}
        />

        <label className="email">Email: </label>
        <input
          onChange={handleEmail}
          className="email"
          value={email}
          type="email"
        />

        <label className="password">Password: </label>
        <input
          type="password"
          name="password"
          className="password"
          value={password}
          onChange={handlePassword}
        />

        <label className="password">Confirm Password: </label>
        <input
          type="password"
          name="confirmation_password"
          className="confirmation_password"
          value={confirmationPassword}
          onChange={handleConfirmationPassword}
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
