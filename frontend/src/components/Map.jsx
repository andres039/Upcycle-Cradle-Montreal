import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import Pin from './Pin';

const Map = () => {
  const mapPosition = [45.4, -75.7];
  const mapTilesId = 'mapbox/streets-v11';
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Set map to geolocation but not currently working
  // const mapRef = useRef();

  // useEffect(() => {
  //   const { current = {} } = mapRef;
  //   const { leafletElement: map } = current;
    
  //   map.locate({
  //     setView: true
  //   });
  // }, []);
  
  // array of saved items for testing
  const savedItems = [
    {
      id: 1,
      title: "Item 1",
      description: "Description of Item 1.",
      coordinates: [45.4310, -75.7372]
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description of Item 2.",
      coordinates: [45.4411, -75.7592]
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description of Item 3.",
      coordinates: [45.4121, -75.7612]
    }
  ];

  // object of new item for testing
  const newItem = {
    id: 4,
    title: "Item 4",
    description: "Description of Item 4."
  };

  return(
    <MapContainer center={mapPosition} zoom={13} style={{ width: '75vw', height: '100vh'}}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${mapTilesId}/tiles/{z}/{x}/{y}?access_token=${mapAccessToken}`}
      />
      <Pin item = {newItem} allItems={savedItems}/>
      { savedItems.map(savedItem => (
        <Pin item = {savedItem}/>
      ))}
    </MapContainer>
  );
}

export default Map;