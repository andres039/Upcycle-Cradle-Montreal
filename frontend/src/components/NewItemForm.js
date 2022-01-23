import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import "./NewItemForm.scss";

const NewItemForm = (props) => {
  const context = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("New");
  const [picture, setPicture] = useState("");
  const setErrorMessage = context.setErrorMessage;
  const errorMessage = context.errorMessage;
  //const handleNewItemSubmit = context.handleNewItemSubmit;
  const handleErrorMessageReset = context.handleErrorMessageReset;

  const handleNewItem = context.handleNewItem;

  const handleNewItemSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      condition === "" ||
      picture === ""
    ) {
      setErrorMessage("Please enter all the fields");
      return
    }
    if (!props.longitude || !props.latitude) {
      setErrorMessage("Please select a location on the map");
      return
    }
    handleNewItem({
      title,
      description,
      condition,
      picture,
      longitude: props.longitude.toFixed(4),
      latitude: props.latitude.toFixed(4),
      creator_id: 1,
      date: currentDate(),
    });
  };
  useEffect(() => {
    handleErrorMessageReset();
  }, []);
  // (itemData) => {
  //   const tokenKey = localStorage.getItem("token")
  //   //localStorage.removeItem("token") -- for logout
  //   if (!props.longitude || !props.latitude) {
  //   errorMessage
  //   console.log("fill in the fields")
  //   return
  //   }
  //   return axios.post("/api/pins", itemData, { headers: { token: tokenKey } }).then(() => {
  //     window.location.reload();
  //   });
  // };

  const deletePin = () => {
    props.setLatitude(null);
    props.setLongitude(null);
  };

  const currentDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString();
  };

  return (
    <section className="new-item">
      <h1>{errorMessage}</h1>
      <h1 className="new-item-form__title">New Item</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
        className="form"
      >
        <label className="new-item-form__label">Title</label>
        <input
          className="new-item__input"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className="new-item-form__label">Description</label>
        <textarea
          className="new-item__text-area"
          name="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label className="new-item-form__label">Condition</label>
        <select
          className="new-item__select"
          name="condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        >
          <option value="New">New</option>
          <option value="Like new">Like new</option>
          <option value="Fair">Fair</option>
          <option value="Old">Old</option>
          <option value="Small imperfections">Small imperfections</option>
          <option value="Damaged">Damaged</option>
        </select>

        <label className="new-item-form__label">Picture</label>
        <input
          className="new-item__input"
          name="picture"
          type="text"
          placeholder="https://www.picture-url.com"
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />
      </form>

      <Button onClick={handleNewItemSubmit}>Save</Button>
      <Link to="/mapview">
        <Button onClick={() => deletePin()}>Cancel</Button>
      </Link>
    </section>
  );
};
export default NewItemForm;
