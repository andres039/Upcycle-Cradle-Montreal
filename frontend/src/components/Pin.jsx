import { useEffect, useState } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
// import axios from "axios";

import Button from './Button';

const Pin = (props) => {
  const [latitude, setLatitude] = useState(props.item.latitude || null);
  const [longitude, setLongitude] = useState(props.item.longitude || null);
  const [claimed, setClaimed] = useState(false);

  const bluePinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
  const greenPinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
  const orangePinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
  const violetPinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';

  const customPin = (iconUrl) => new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = customPin(bluePinUrl);
  const greenIcon = customPin(greenPinUrl);
  const orangeIcon = customPin(orangePinUrl);
  const violetIcon = customPin(violetPinUrl);

  const [pinColor, setpinColor] = useState(blueIcon);

  useEffect(() =>{
    if (!latitude) {
    setpinColor(greenIcon);
    }
  }, []);

  useMapEvents({
    click(e) {
      if (!latitude) {
        const len = Object.keys(props.allItems).length;

        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        
        // Placeholder for saving to database
        props.allItems.push({
          id: len + 1,
          title: `Location ${len + 1}`,
          description: `Description of location ${len + 1}.`,
          coordinates: [e.latlng.lat, e.latlng.lng]
        });
        
        // setPinPosition(null);
      }
    }
  });

  // const claimItem = (id, pin) => {
  //   // add user's ID as claiamer_id in DB
  //   return axios.put(`/api/pins/${id}`, {data: {pin}})
  //     .then(() => {
  //       setClaimed(true);
  //     });
  // }

  const deletePin = () => {
    // return axios.delete(`/api/pins/${id}`, {data: {pin}})
    //   .then(() => {
      setLatitude(null);
      setLongitude(null);
      // });
  }
  
  return latitude === null ? null : (
    <Marker position={[latitude, longitude]} icon={pinColor}>
      <Popup>
        <h1>{props.item.title}</h1>
        <p>{props.item.description}</p>
        <p>Picture here...</p>
        <p><strong>Condition:</strong> Like new</p>
        <Button onClick={'runs claimItem function'}>Claimed</Button>
        <Button onClick={'delete item from DB or mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;