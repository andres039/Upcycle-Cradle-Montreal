import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
const logo = require("../logo.png");

const Register = () => {
  return (
    <main>
      <img src={logo} style={{ width: "700px" }} />
      <RegistrationForm />

      <Link to="/login">
        <div>Login</div>
      </Link>

    </main>
  );
};

export default Register;