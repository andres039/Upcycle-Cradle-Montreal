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
  const handleRegistrationSubmit = context.handleRegistrationSubmit;
  const errorMessage = context.errorMessage;
  const handleErrorMessageReset = context.handleErrorMessageReset;
  useEffect(() => {
    handleErrorMessageReset();
  }, []);



  //

  return (
    <div className="form">
      <div>
        <h1>Register</h1>
      </div>

      { /*Calling to the methods
      <div className="messages">
        {errorMessage2()}
        {/* {successMessage()} </div>*/}

      {/*password doesnt match */}
      {errorMessage && <h1>🔥 {errorMessage} 🔥</h1>}

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

        <button onClick={handleRegistrationSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

//REACT, FORMS(registration): Display error message coming from the backend during user registration.
