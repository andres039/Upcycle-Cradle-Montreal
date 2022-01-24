import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from "./Button";
import { useNavigate } from "react-router-dom";


const SidebarHeader = (props) => {
  /* Defines if we are rendering the NewItemForm or the Instructions*/
  const [item, setItem] = useState(false);
  const [pin, setPin] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const username = context.username
  // const email = context.email;

  /*Return an object containing the characteristics of a new posting */
  //When posting something pass a body as JSON 
  const validate = (itemData) => {
    console.log(itemData);
    return axios.post("/", itemData).then(() => {
      console.log(itemData);
      setPin(itemData);
    });
  };

  // useEffect(() => {
  //   console.log(context)
  //   setUsername(context.username);
  // }, [context])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

        <h3 className="sidebar__user">Signed in as {username}</h3>

        <Button cancel onClick={() => logout()}>
          Logout
        </Button>
      </header>

    </section>
  );
};

export default SidebarHeader;
