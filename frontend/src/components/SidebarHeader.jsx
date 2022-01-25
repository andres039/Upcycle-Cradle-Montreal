import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SidebarHeader = () => {
  const context = useContext(AuthContext);
  const username = context.username;
  const setUsername = context.setUsername;
  console.log("username test:", username);



  return (
    <section>
      <header>
        <img
          className="sidebar__logo"
          src="images/logo.png"
          alt="Trash Panda Montreal"
        />

        <h3 className="sidebar__user">
          Signed in as {username}
        </h3>


      </header>
    </section>
  );
};

export default SidebarHeader;
