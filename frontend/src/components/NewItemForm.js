import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { Link } from "react-router-dom";

const NewItemForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [picture, setPicture] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  {
    /*The useEffect that follows might be how we could potentially integrate the pin selected on the map with the rest of the fields in the form. */
  }

  let pinSelected = "";
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.post(
    `https://loobv.com/api/traveller/add/favorite/car`,
    { car_id: carId },
    config
  );

  const validate = (itemData) => {
    console.log(itemData);
    return axios.post("http://localhost:8081/api/pins", itemData).then(() => {
      console.log(itemData);
      // setPin(itemData);
    });
  };

  useEffect(() => {
    setCoordinates(pinSelected);
  }, [pinSelected]);

  return (
    <section className="new-item">
      <form
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
        className="form"
      >
        <label>Title</label>
        <input
          className="new-item-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Description</label>
        <input
          className="new-item-description"
          name="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label>Condition</label>
        <input
          className="new-item-Condition"
          name="condition"
          type="text"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        />

        <label>Picture</label>
        <input
          className="new-item-picture"
          name="picture"
          type="text"
          placeholder="URL address for now"
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />
      </form>

      <Button
        onClick={() =>
          validate({
            title,
            description,
            condition,
            picture,
            longitude: props.longitude,
            latitude: props.latitude,
            creator_id: 1,
            date: null,
          })
        }
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
