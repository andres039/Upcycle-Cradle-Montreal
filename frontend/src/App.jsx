import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";


import './App.css';


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

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token") //This state has been converted to a boolean. For example: Boolean(localStorage.getItem("token")) => equivalent of line 33, !!. 
  const [oldPins, setOldPins] = useState([]);
  console.log("is logged in", isLoggedIn);
  useEffect(() => {
    axios.get("http://localhost:3002/api/pins").then((result) => {
      setOldPins(result.data);
    });
  }, [])
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* {isLoggedIn && <Route
          path="/mapview"
          element={
            <MapView
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              newItemMode={false}
              oldPins={oldPins}
            />
          }
        />} */}

        <Route 
          path="/mapview"
          element={isLoggedIn ?
            <MapView
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              newItemMode={false}
              oldPins={oldPins}
            />
            : <Navigate to="/login"/>
          }
        />
        <Route
          path="/newitem"
          element={isLoggedIn ?
            <NewItem
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              newItemMode={true}
              oldPins={oldPins}
            />
            : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />


      </Routes>


    </div >
  );
}

export default App;
