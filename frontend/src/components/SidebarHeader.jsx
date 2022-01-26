import React from "react";

const SidebarHeader = () => {

  return (
    <section>
      <header>
        <img
          className="sidebar__logo"
          src="images/logo.png"
          alt="Trash Panda Montreal"
        />

        <h3 className="sidebar__user">
          Signed in as {localStorage.getItem("username")}
        </h3>

      </header>
    </section>
  );
};

export default SidebarHeader;
