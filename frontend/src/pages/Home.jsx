import { Link } from "react-router-dom";
const logo = require("../logo.png");

const Home = () => {
  return (
    <main>

      <div>
        <h1>Welcome page</h1>
        <img src={logo} style={{ width: "700px" }} />
      </div>


      <Link to="/login">
        <div>Log in</div>
      </Link>

      <Link to="/register">
        <div>Register</div>
      </Link>

    </main>
  );
};

export default Home;