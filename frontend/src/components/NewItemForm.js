import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "./Button";
import { Link } from "react-router-dom";

const NewItemForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [picture, setPicture] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  {/*The useEffect that follows might be how we could potentially integrate the pin selected on the map with the rest of the fields in the form. */ }

  let pinSelected = ''

  const validate = (itemData) => {
    console.log(itemData);
    return axios.post("http://localhost:8081/api/pins", itemData).then(() => {
      console.log(itemData);
      // setPin(itemData);
    });
  };

  useEffect(() => {
    setCoordinates(pinSelected)
  }, [pinSelected])

  // value={title}
  // value={description}
  // value={condition}
  //  value={picture
  // coordinates

  return (

    <section className="new-item">
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off" className="form">
        <label>Title</label>
        <input
          className="new-item-title"
          name="title"
          type="text"
          value='the hardcoded title'
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Description</label>
        <input
          className="new-item-description"
          name="description"
          type="text"
          value='the hardcoded description'
          onChange={(event) => setDescription(event.target.value)}
        />

        <label>Condition</label>
        <input
          className="new-item-Condition"
          name="condition"
          type="text"
          value='Like old'
          onChange={(event) => setCondition(event.target.value)}
        />

        <label>Picture</label>
        <input
          className="new-item-picture"
          name="picture"
          type="text"
          placeholder="URL address for now"
          value='the cool picture'
          onChange={(event) => setPicture(event.target.value)}
        />
      </form>

      <Button
        onClick={() => validate({ title, description, condition, picture, longitude: 33.4, latitude: 66.6, creator_id: 1, claimer_id: null })}
      >
        Save
      </Button>
      <Link to="/mapview">
        <Button>Cancel</Button>

      </Link>
    </section>

  );
};
export default NewItemForm;
