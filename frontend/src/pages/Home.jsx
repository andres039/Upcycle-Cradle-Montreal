import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  return (
    <main className="login-page">
      <img className="bg-image__welcome" src="images/dresser-bridge.jpg" alt="background for decoration only"/>
      <div className="welcome-page__text">
        <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />
      
        <Link to="/login">
          <span className="welcome-page__login-link">Log in</span>
        </Link>
        <Link to="/register">
          <span className="welcome-page__register-link">Register</span>
        </Link>
      </div>
    </main>
  );
};

export default Home;