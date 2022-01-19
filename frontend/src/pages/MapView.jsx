import { Link } from "react-router-dom";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";
import Instructions from "../components/Instructions";

const MapView = (props) => {
  const { latitude, longitude, setLatitude, setLongitude, newItemMode } = props;

  return (
    <div className="container">

      <Map
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
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