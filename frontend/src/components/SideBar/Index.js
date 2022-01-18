import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../Button";
import Instructions from "./Instructions";
import NewItemForm from "./NewItemForm";

const SideBar = (props) => {
  /* Defines if we are rendering the NewItemForm or the Instructions*/
  const [item, setItem] = useState(false);
  const [pin, setPin] = useState("");
  const [user, setUser] = useState("");

  /*Return an object containing the characteristics of a new posting */
  //When posting something pass a body as JSON 
  const validate = (itemData) => {
    console.log(itemData);
    return axios.post("http://localhost:8081/", itemData).then(() => {
      console.log(itemData);
      setPin(itemData);
    });
  };

  //  useEffect(() => {

  //    return axios.get("http://localhost:8081/api/users/123").then((res) => {
  //       console.log(res);
  //       const {username} = res.data;
  //       setUser(username);
  //     });


  //   }, [])

  useEffect(() => {

    return axios.get("http://localhost:8081/api/users/123").then((res) => {
      console.log(res);
      const { username } = res.data[1];
      setUser(username);
    });


  }, [])
  /*Resets the view to Instructions*/

  // const cancel = () => {
  //   setItem(false);
  // };

  return (
    <section>
      <header>
        <h1>TRASH PANDA MTL</h1>

        <h3>Signed in as {user}</h3>
        {/* <Button onClick={() => setItem(true)}>+ new Item</Button> */}
        <Button onClick={() => alert("You are successfully logged out")}>
          Logout
        </Button>
      </header>
      {/* {item ? (
        <NewItemForm onCancel={cancel} onSave={validate} />
      ) : (
        <Instructions />
      )} */}
    </section>
  );
};

export default SideBar;
