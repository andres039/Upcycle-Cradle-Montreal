import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import withAuthProvider from "./providers/AuthProvider";

import "./App.scss";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./pages/MapView";
import NewItem from "./pages/NewItem";
import Home from "./pages/Home";

function App() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const isLoggedIn = localStorage.getItem("token");
  const [oldPins, setOldPins] = useState([]);


  useEffect(() => {
    axios.get("api/pins").then((result) => {
      setOldPins(result.data);
    });
  }, []);
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn && (
          <Route
            path="/mapview"
            element={
              <MapView
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                newItemMode={false}
                oldPins={oldPins}
                setOldPins={setOldPins}
              />
            }
          />
        )}


        <Route
          path="/newitem"
          element={
            isLoggedIn ? (
              <NewItem
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                newItemMode={true}
                oldPins={oldPins}
                setOldPins={setOldPins}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default withAuthProvider(App);
