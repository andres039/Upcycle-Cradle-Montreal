import { useState } from 'react';
import { Link } from "react-router-dom";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";
import Instructions from "../components/Instructions";

const MapView = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  return (
    <div className="container">

      <Map
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <section className="sidebar">

        <SidebarHeader />
        <Link to="/newitem">
          <button type="button">
            + new Item
          </button>
        </Link>

        <Instructions />

      </section>


    </div>

  )
}

export default MapView;