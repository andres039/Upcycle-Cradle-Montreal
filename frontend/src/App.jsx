import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Map from './components/Map';
import './App.css';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import SideBar from './components/SideBar/Index';
import NewItemForm from './components/SideBar/NewItemForm';
import RegistrationForm from './components/RegistrationForm';

//////////////////
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./pages/MapView";
import NewItem from "./pages/NewItem";
import Home from "./pages/Home";
// import LoginForm from './components/LoginForm';

function App() {

  // const [users, setUsers] = useState()
  // const [pins, setPins] = useState()

  // useEffect(() => {
  //   //requests for data should have /api
  //   axios.get("/api/users").then((res) => setUsers(res.data));
  // }, []);

  // useEffect(() => {
  //   axios.get("/api/pins").then((res) => setPins(res.data));
  // }, []);

  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mapview" element={<MapView />} />
        <Route path="/newitem" element={<NewItem />} />


      </Routes>


    </div >
  );
}

export default App;
