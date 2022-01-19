import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import UserLocation from './UserLocation';
import Pin from './Pin';
import BluePin from './BluePin';

import './Map.css';

const Map = (props) => {
  const mapPosition = [45.4, -73.6];
  const mapTilesId = 'mapbox/streets-v11';
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const { latitude, longitude, setLatitude, setLongitude, newItemMode } = props;


  // array of saved items for testing
  const savedItems = [
    {
      id: 1,
      title: "Item 1",
      description: "Description of Item 1.",
      latitude: 45.432,
      longitude: -73.623
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description of Item 2.",
      latitude: 45.507,
      longitude: -73.690
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description of Item 3.",
      latitude: 45.527,
      longitude: -73.583
    }
  ];

  // object of new item for testing
  const newItem = {
    id: 4,
    title: "Item 4",
    description: "Description of Item 4."
  };

  const parsedPins = savedItems.map(savedItem => {

    return (
      <BluePin
        key={savedItem.id}
        id={savedItem.id}
        item={savedItem}
        
        
      />
    );
  });

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
      />
      {parsedPins}
    </MapContainer>
  );
}

export default Map;