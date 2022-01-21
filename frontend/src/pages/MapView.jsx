import { Link } from "react-router-dom";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";
import Instructions from "../components/Instructions";
import { useEffect, useState } from "react";
import axios from "axios";

const MapView = (props) => {
  const { latitude, longitude, setLatitude, setLongitude, newItemMode, oldPins } = props;
  //   const [oldPins, setOldPins] = useState([]);

  //   useEffect(() => {
  //   axios.get("http://localhost:8081/api/pins").then((result) => {
  //     console.log(result.data);
  //     return setOldPins(result.data);
  //   }).then(result => console.log('oldpins', oldPins));
  // }, [])

  // useEffect(() => {
  //   axios.get("localhost:8081/api/pins", { mode: "cors", method: "get" }).then((res) => {
  //     console.log( "pullingdb:", res);
  //   });
  // }, []);

  return (
    <div className="container">
      <Map
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
        savedItems={oldPins}
      />
      <section className="sidebar">
        <SidebarHeader />
        <Link to="/newitem">
          <button type="button">+ New item</button>
        </Link>

        <Instructions />
      </section>
    </div>
  );
};

export default MapView;
