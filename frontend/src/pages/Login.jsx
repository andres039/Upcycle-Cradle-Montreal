import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="login-page">
      <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />
      <div>
        <LoginForm />
        <Link to="/register">
          <span className="login-page__register-link">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;