import React from "react";
import { useNavigate } from "react-router-dom";

import pinSettings from '../helpers/pinSettings';
import Button from "./Button";

import './Instructions.scss';

const Instructions = () => {
  const { bluePinUrl, greenPinUrl, orangePinUrl, violetPinUrl } = pinSettings();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <section>
      <section>
        <div className="sidebar__map-legend">
          <h4 className="sidebar__map-legend--title">Legend</h4>
          <div className="sidebar__map-legend--row">
            <img className="sidebar__map-legend--pin-icon" src={bluePinUrl} alt="Blue map pin" />
            <span>Available item</span>
          </div>
          <div className="sidebar__map-legend--row">
            <img className="sidebar__map-legend--pin-icon" src={orangePinUrl} alt="Orange map pin" />
            <span>Claimed item</span>
          </div>
          <div className="sidebar__map-legend--row">
            <img className="sidebar__map-legend--pin-icon" src={greenPinUrl} alt="Green map pin" />
            <span>Your created item (unclaimed)</span>
          </div>
          <div className="sidebar__map-legend--row">
            <img className="sidebar__map-legend--pin-icon" src={violetPinUrl} alt="Violet map pin" />
            <span>Your created item (claimed)</span>
          </div>
        </div>
      </section>
      <ul>
        <li key="1">To center the map at your location, please allow the browser to track your location.</li>
        <li key="2">To add an item to the map, click on the <strong>+ New item</strong> button above.</li>
        <li key="3">Click on a pin to see the item details.</li>
      </ul>
      <Button cancel onClick={() => logout()}>
        Logout
      </Button>
    </section>
  )
}
export default Instructions;