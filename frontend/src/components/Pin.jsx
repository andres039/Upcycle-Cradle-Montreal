import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
// import axios from "axios";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const Pin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);
  const [latitude, setLatitude] = useState(props.item.latitude || null);
  const [longitude, setLongitude] = useState(props.item.longitude || null);
  const [claimed, setClaimed] = useState(false);

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
        <Button onClick={'mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;