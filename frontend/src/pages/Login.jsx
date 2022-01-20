import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
const logo = require("../logo.png");

const Login = () => {
  return (
    <div>
      <img src={logo} style={{ width: "700px" }} />
      <LoginForm />
      <logo />
      <Link to="/register">
        <div>Register</div>
      </Link>

    </div>
  );
};

export default Login;