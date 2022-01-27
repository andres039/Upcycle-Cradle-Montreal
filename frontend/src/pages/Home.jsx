import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  return (
    <main className="login-page">
      <img className="bg-image__welcome" src="images/dresser-bridge.jpg" alt="background for decoration only" />
      <div className="welcome-page__text">
        <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />

        <div>
          <h1>Welcome to Trash Panda MTL!</h1>
          <p className="welcome-page__about">This environmentally forward thinking app allows Montrealers to extend the life of discarded furniture. It addresses the issue of mass piles of perfectly usable items contributing to pollution. Let's make our community sustainable together!</p>
        </div>
      </div>
      <div className="welcome-page__links">
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