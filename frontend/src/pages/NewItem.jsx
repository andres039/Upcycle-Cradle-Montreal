import NewItemForm from "../components/NewItemForm";
import Map from "../components/Map";
import SidebarHeader from "../components/SidebarHeader";


const NewItem = () => {
  return (
    <div className="container">


      <Map />

      <section className="sidebar">

        <SidebarHeader />
        <NewItemForm />

      </section>

    </div>
  );
};

export default NewItem;