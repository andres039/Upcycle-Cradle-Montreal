import { Link } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  return (
    <main className="login-page">
      <img className="bg-image__welcome" src="images/dresser-bridge.jpg" alt="background for decoration only"/>
      <div className="welcome-page__text">
        <img className="login-page__logo" src="images/logo.png" alt="Trash Panda Montreal" />
      
        <div>
          <h1>Welcome</h1>
          <p className="welcome-page__about">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis et esse distinctio facere, minima, asperiores non suscipit officiis excepturi dolorem magnam repellat, similique velit. Maiores, laudantium. Sint ad eius minus!</p>
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