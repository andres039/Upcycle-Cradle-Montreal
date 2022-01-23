import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import "./Login.scss";

const Login = () => {
  return (
    <main className="login-page">
      <img className="bg-image__login" src="images/montreal-map.png" alt="background for decoration only"/>
      <div className="login-page__text">
        <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />
        <div>
          <LoginForm />
          <Link to="/register">
            <span className="login-page__register-link">Register</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;