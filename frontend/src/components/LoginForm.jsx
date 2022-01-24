import React, { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

import Button from "./Button"

const LoginForm = () => {
  const context = useContext(AuthContext);

  const email = context.email;
  const password = context.password;
  const handlePassword = context.handlePassword;
  const handleEmail = context.handleEmail;
  const handleLoginSubmit = context.handleLoginSubmit;
  const errorMessage = context.errorMessage;
  const handleErrorMessageReset = context.handleErrorMessageReset;

  console.log(context)

  useEffect(() => {
    handleErrorMessageReset();
  }, []);
  
  return (
    <section className="login">
      {errorMessage && <p className="login-error">🔥 {errorMessage} 🔥</p>}
      <form className="login-form">
        <label className="login-form__label">Email </label>

        <input
          className="login-form__input"
          name="email"
          type="email"

          value={email}
          onChange={handleEmail}
        />
        <label className="login-form__label">Password </label>

        <input
          className="login-form__input"
          name="password"
          type="password"

          value={password}
          onChange={handlePassword}
        />

        <Button confirm onClick={handleLoginSubmit} className="btn" type="submit">
          Login
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
