import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "./Button";
import { useNavigate } from "react-router-dom";


const SidebarHeader = (props) => {
  /* Defines if we are rendering the NewItemForm or the Instructions*/
  const [item, setItem] = useState(false);
  const [pin, setPin] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  /*Return an object containing the characteristics of a new posting */
  //When posting something pass a body as JSON 
  const validate = (itemData) => {
    console.log(itemData);
    return axios.post("/", itemData).then(() => {
      console.log(itemData);
      setPin(itemData);
    });
  };


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  // useEffect(() => {

  //   return axios.get("http://localhost:8081/api/users/123").then((res) => {
  //     console.log(res);
  //     const { username } = res.data;
  //     setUser(username);
  //   });


  // }, [])

  // useEffect(() => {

  //   return axios.get("http://localhost:8081/api/users/123").then((res) => {
  //     console.log(res);
  //     const { username } = res.data[1];
  //     setUser(username);
  //   });


  // }, [])
  /*Resets the view to Instructions*/


  return (
    <section>
      <header>
        <img className="sidebar__logo" src="images/logo.png" alt="Trash Panda Montreal" />

        <h3>Signed in as {user}</h3>

        <Button cancel onClick={() => logout()}>
          Logout
        </Button>
      </header>

    </section>
  );
};

export default SidebarHeader;
