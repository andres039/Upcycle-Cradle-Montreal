import { Link } from "react-router-dom";
import Map from "../components/Map";
import Index from "../components/SideBar/Index";
import Instructions from "../components/SideBar/Instructions";

const MapView = () => {
  return (
    <div className="container">

      <Map />
      <section className="sidebar">

        <Index />
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