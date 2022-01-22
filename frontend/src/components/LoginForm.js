import React, { useState, useContext, useEffect } from "react";
import axios from "axios"
import { AuthContext } from "../providers/AuthProvider";

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

  return (

    <div>
      <section className="login">
        {loginError && (
          <h1>🔥 Please fill the email and password fields, or register to start using 🦝Trash Panda🐼 🔥</h1>
        )}
        {showEmailError && (
          <h1>🔥 Incorrect Email. Please verify your email or register at 🦝Trash Panda🐼 🔥</h1>
        )}

        {showConfirmationPassError && (
          <h1>🔥 Incorrect Password. Please verify your password or register at 🦝Trash Panda🐼 🔥</h1>
        )}  
        <form>
          <label>Email: </label>
          <input
            className="email"
            name="email"
            type="email"
            // placeholder="email"


            value={email}
            onChange={handleEmail}

          />

          <label>Password: </label>
          <input
            className="password"
            name="password"
            type="password"
            // placeholder="password"


            value={password}
            onChange={handlePassword}
          />
          <button onClick={handleLoginSubmit} className="btn" type="submit">Login</button>
        </form>

      </section>

    </div>
  );
};

export default LoginForm;