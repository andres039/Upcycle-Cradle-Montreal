import { useState, useEffect } from "react";
import axios from "axios";


import Map from './components/Map';
import './App.css';
import Button from './components/Button';
import LoginForm from './components/LoginForm';
import SideBar from './components/SideBar/Index';
import NewItemForm from './components/SideBar/NewItemForm';
import RegistrationForm from './components/RegistrationForm';

// import LoginForm from './components/LoginForm';

function App() {

  const [users, setUsers] = useState()
  const [pins, setPins] = useState()

  useEffect(() => {
    //requests for data should have /api
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    axios.get("/api/pins").then((res) => setPins(res.data));
  }, []);

  return (
    <div className="App container">
      {/* <Map /> */}

      <Map />
      <SideBar username="Homer Simpson" />

    </div >
  );
}

export default App;
