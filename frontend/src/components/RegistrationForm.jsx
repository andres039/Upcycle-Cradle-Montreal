import axios from "axios";
import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// import Button from 'components/Button'

const RegistrationForm = (props) => {
  // States for registration

  const [error, setError] = useState(false);


  // Handling the name change

  const context = useContext(AuthContext);

  const showConfirmationPassError = context.showConfirmationPassError;
  const showEmailError = context.showEmailError;
  const email = context.email;
  const username = context.username;
  const password = context.password;
  const confirmationPassword = context.confirmationPassword;

  const handleRegistration = context.handleRegistration;
  const handleEmail = context.handleEmail;
  const handleUsername = context.handleUsername;
  const handlePassword = context.handlePassword;
  const handleConfirmationPassword = context.handleConfirmationPassword;



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
      handleRegistration({ email, password, username });
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

      {showConfirmationPassError && (
        <h1>🔥 Password and password confirmation must match 🔥</h1>
      )}
      {showEmailError && <h1>🔥 Email in use 🔥</h1>}

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

//REACT, FORMS(registration): Display error message coming from the backend during user registration.
