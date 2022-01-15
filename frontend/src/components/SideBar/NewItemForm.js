import React, { useState } from "react";
import Button from "../Button";


 const NewItemForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [picture, setPicture] = useState("");

  const validate = function() {
    alert('validates!')
  }
  const cancel = () => {
    alert('validates!')
  };
  
  return (
    <main>
      <section className="new-item">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <label>Title</label>
          <input
            className="new-item-title"
            name="name"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label>Description</label>
          <input
            className="new-item-description"
            name="name"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label>Condition</label>
          <input
            className="new-item-Condition"
            name="name"
            type="text"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          
          />

          <label>Picture</label>
          <input
            className="new-item-picture"
            name="name"
            type="text"
            placeholder="URL address for now"
            value={picture}
            onChange={(event) => setPicture(event.target.value)}
          />
        </form>
        
     
          <Button onClick={() => validate()}>
            Save
          </Button>
          <Button  onClick={() => cancel()}>
            Cancel
          </Button>

        </section>
    </main>
  );
}
export default NewItemForm