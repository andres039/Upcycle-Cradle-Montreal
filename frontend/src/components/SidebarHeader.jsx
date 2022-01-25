import React, {useContext} from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const SidebarHeader = () => {
const context = useContext(AuthContext);
const username = context.username
console.log("username test:", username);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/");
  };


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
