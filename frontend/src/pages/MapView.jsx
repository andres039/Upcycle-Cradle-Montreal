import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";
import Instructions from "../components/Instructions";

import './MapView.scss';

const MapView = (props) => {
  const { latitude, longitude, setLatitude, setLongitude, newItemMode, oldPins, setOldPins } = props;
  const context = useContext(AuthContext);
  const setUsername = context.setUsername;


  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);


  return (
    <div className="container">
      <Map
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
        savedItems={oldPins}
        setOldPins={setOldPins}
      />
      <section className="sidebar">
        <img className="bg-image" src="images/trunk.jpg" alt="background for decoration only" />

        <div className="sidebar__text">
          <SidebarHeader />
          <Link to="/newitem" className="new-item__button">
            <div id="wrapper">
              <div className="my-super-cool-btn">
                <div className="dots-container">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <span>+ item</span>
              </div>
            </div>
          </Link>

          <Instructions />
        </div>
      </section>
    </div>
  );
};

export default MapView;
