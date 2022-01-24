import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import "./NewItemForm.scss";

const NewItemForm = (props) => {
  const context = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("New");
  const [picture, setPicture] = useState("");
  const [savePinError, setSavePinError] = useState(false);

  const id = context.id;
  const handleErrorMessageReset = context.handleErrorMessageReset;
  const errorMessage = context.errorMessage;
  const setErrorMessage = context.setErrorMessage;
  const navigate = useNavigate();
  const setUsername = context.setUsername;
  const [savedMessage, setSavedMessage] = ("message")
  const handleSavePin = () => {
    if (!props.longitude ||
      !props.latitude) {
      setErrorMessage("Please select a location on the map")
    }
    if (
      title === "" ||
      description === "" ||
      condition === "" ||
      picture === ""
    ) {
      console.log("ERROR");
      setErrorMessage("Please fill all the fields");
      return;
    }
    validateSavePin({
      title,
      description,
      condition,
      picture,
      longitude: props.longitude.toFixed(4),
      latitude: props.latitude.toFixed(4),
      creator_id: id,
      date: currentDate(),
    });
    
  };

  const validateSavePin = (itemData) => {
    const tokenKey = localStorage.getItem("token");
    return axios
      .post("/api/pins", itemData, { headers: { token: tokenKey } })
      .then(() => {
        setUsername()

      })
      .then(() => {
        window.location.reload();
      }).then(() => setSavedMessage("test"));
  };
  useEffect(() => {
    handleErrorMessageReset();
  }, []);

  const deletePin = () => {
    props.setLatitude(null);
    props.setLongitude(null);
    console.log("delete pin");
    setSavedMessage(null);
  };

  const currentDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString();
  };

  return (
    <section className="new-item">
      <h1>{errorMessage}</h1>
      {savedMessage && <h1>Your post has been saved</h1>}
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
        <div className="new-item-form__buttons">
          <Button confirm onClick={() => handleSavePin()} type="Submit">
            Save
          </Button>
          <Link to="/mapview">
            <Button cancel onClick={() => deletePin()}>Cancel</Button>

          </Link>
        </div>
      </form>

    </section>
  );
};
export default NewItemForm;
