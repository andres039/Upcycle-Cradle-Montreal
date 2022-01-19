import NewItemForm from "../components/NewItemForm";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";


const NewItem = (props) => {
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
        <NewItemForm latitude={latitude} longitude={longitude} />

      </section>

    </div>
  );
};

export default NewItem;