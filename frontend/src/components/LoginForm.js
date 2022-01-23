import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from "./Button"

const LoginForm = (props) => {
  const context = useContext(AuthContext);

  const email = context.email;
  const setEmail = context.setEmail;
  const password = context.password;
  const setPassword = context.setPassword;
  const handleLogin = context.handleLogin;
  const handlePassword = context.handlePassword;
  const handleEmail = context.handleEmail;
  const handleLoginSubmit = context.handleLoginSubmit;
  const loginError = context.loginError;
  const showEmailError = context.showEmailError;
  const showConfirmationPassError = context.showConfirmationPassError;
  const errorMessage = context.errorMessage;
  const handleErrorMessageReset = context.handleErrorMessageReset;

  useEffect(() => {
    handleErrorMessageReset();
  }, []);
  return (
    <section className="login">
      {errorMessage && <h1>🔥 {errorMessage} 🔥</h1>}
      <form className="login-form">
        <label className="login-form__label">Email </label>
        <input
          className="login-form__input"
          name="email"
          type="email"
          // placeholder="email"

          value={email}
          onChange={handleEmail}
        />
        <label className="login-form__label">Password </label>
        <input
          className="login-form__input"
          name="password"
          type="password"
          // placeholder="password"

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
