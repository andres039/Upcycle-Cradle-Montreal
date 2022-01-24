import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
const logo = require("../logo.png");

const Register = () => {
  return (
    <main className="login-page">
      <img className="bg-image__welcome" src="images/dresser-bridge.jpg" alt="background for decoration only"/>
      <div className="login-page__text">
        <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />
        <div>
          <RegistrationForm />

          <Link to="/login">
            <span className="login-page__register-link">Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;