import { MapContainer, TileLayer } from "react-leaflet";

import UserLocation from "./UserLocation";
import Pin from "./Pin";
import BluePin from "./BluePin";

import "./Map.scss";

const Map = (props) => {
  const mapPosition = [45.4, -73.6];
  const mapTilesId = "mapbox/streets-v11";
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


  const {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    newItemMode,
    savedItems,
    setOldPins
  } = props;

  const newItem = {
    title: "New Item Form Data",
    description: "Your new item data will show here after you press the save button."
  };


  //any blue pin: 
  const parsedPins = savedItems

    ? savedItems.map((savedItem, index) => {

      return (
        <BluePin key={savedItem.id} id={savedItem.id} item={savedItem} setOldPins={setOldPins} index={index} />
      );

    })
    : [];

  return (
    <MapContainer center={mapPosition}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${mapTilesId}/tiles/{z}/{x}/{y}?access_token=${mapAccessToken}`}
      />
      <UserLocation />
      <Pin
        item={newItem}
        allItems={savedItems}
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        newItemMode={newItemMode}
        setOldPins={setOldPins}
      />
      {parsedPins}
    </MapContainer>
  );
};

export default Map;
