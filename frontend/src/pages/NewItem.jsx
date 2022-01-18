import NewItemForm from "../components/SideBar/NewItemForm";
import SideBar from "../components/SideBar/Index";
import Map from "../components/Map";


const NewItem = () => {
  return (
    <div className="container">


      <Map />

      <section className="sidebar">

        <SideBar>
        </SideBar>
        <NewItemForm />

      </section>

    </div>
  );
};

export default NewItem;