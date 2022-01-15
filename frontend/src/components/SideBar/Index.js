import React, { useState } from "react";
import Button from "../Button";
import Instructions from "./Instructions";
import NewItemForm from "./NewItemForm";

const SideBar = (props) => {
  {/* Defines if we are rendeing the NewItemForm or the Instructions*/}
  const [item, setItem] = useState(false);

  {/*Return an object containing the characteristics of a new posting */}
  const validate = (itemData) => {
    console.log(itemData)
  }
  {/*Resets the view to Instructions*/}
  const cancel = () => {
    setItem(false)
  };

  return (
    
    <section>
    <header>
    <h1>TRASH PANDA MTL</h1>
    <h3>Signed in as {props.username}</h3>
    <Button onClick={()=>setItem(true)}>+ new Item</Button>
    <Button onClick={()=>alert('You are successfully logged out')}>Logout</Button>
    </header>
    {item ? < NewItemForm onCancel={cancel} onSave={validate}/> : <Instructions/>}
    </section>
    
  )
}

export default SideBar;