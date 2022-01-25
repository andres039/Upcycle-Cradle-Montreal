import { useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import Button from "./Button";

const RegistrationForm = () => {
  // Handling the name change

  const context = useContext(AuthContext);

  const email = context.email;
  const username = context.username;
  const password = context.password;
  const confirmationPassword = context.confirmationPassword;

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

  return (
    <section className="login">
      {errorMessage && <p className="login-error">🔥 {errorMessage} 🔥</p>}

      <form className="login-form">
        {/* Labels and inputs for form data */}
        <label className="login-form__label">Username: </label>
        <input
          className="login-form__input"
          name="username"
          type="text"
          onChange={handleUsername}
          value={username}
        />

        <label className="login-form__label">Email: </label>
        <input
          className="login-form__input"
          onChange={handleEmail}
          value={email}
          type="email"
        />

        <label className="login-form__label">Password: </label>
        <input
          className="login-form__input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label className="login-form__label">Confirm Password: </label>
        <input
          className="login-form__input"
          type="password"
          name="confirmation_password"
          value={confirmationPassword}
          onChange={handleConfirmationPassword}
        />

        <Button
          confirm
          onClick={handleRegistrationSubmit}
          className="btn"
          type="submit"
        >
          Register
        </Button>
      </form>
    </section>
  );
};

export default RegistrationForm;
