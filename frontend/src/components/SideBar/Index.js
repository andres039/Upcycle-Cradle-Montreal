import React, { useState } from "react";
import Button from "../Button";
import Instructions from "./Instructions";
import NewItemForm from "./NewItemForm";

const SideBar = (props) => {

  const [item, setItem] = useState(false);

  return (
    <section>
    <header>
    <h1>TRASH PANDA MTL</h1>
    <h3>Signed in as {props.username}</h3>
    <Button onClick={()=>setItem(true)}>+ new Item</Button>
    <Button onClick={()=>alert('You are successfully logged out')}>Logout</Button>
    </header>
    {item ? < NewItemForm /> : <Instructions/>}
    </section>
  )
}

export default SideBar;