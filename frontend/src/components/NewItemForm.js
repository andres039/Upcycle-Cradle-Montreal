import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from "./Button";
import { Link } from "react-router-dom";

const NewItemForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [picture, setPicture] = useState("");

  const validate = (itemData) => {
    const tokenKey = localStorage.getItem("token")
    //localStorage.removeItem("token") -- for logout
    return axios.post("/api/pins", itemData, { headers: { token: tokenKey } }).then(() => {
      window.location.reload();
    });
  };

  const deletePin = () => {
    props.setLatitude(null);
    props.setLongitude(null);
  }

  const currentDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString();
  }

  return (

    <section className="new-item">
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off" className="form">
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
        <select className="new-item-Condition"
          name="condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}>
            <option value="New" selected>New</option>
            <option value="Like new">Like new</option>
            <option value="Fair">Fair</option>
            <option value="Old">Old</option>
            <option value="Small imperfections">Small imperfections</option>
            <option value="Damaged">Damaged</option>
        </select>

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
        onClick={() => validate({
          title,
          description,
          condition,
          picture,
          longitude: props.longitude.toFixed(4),
          latitude: props.latitude.toFixed(4),
          creator_id: 1,
          date: currentDate()
        })}
      >
        Save
      </Button>
      <Link to="/mapview">
        <Button onClick={() => deletePin()}>Cancel</Button>

      </Link>
    </section>

  );
};
export default NewItemForm;
