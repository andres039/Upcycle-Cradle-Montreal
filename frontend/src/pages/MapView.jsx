import { Link } from "react-router-dom";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";
import Instructions from "../components/Instructions";

const MapView = () => {
  return (
    <div className="container">

      <Map />
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