import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
// import axios from "axios";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const Pin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);
  const [claimed, setClaimed] = useState(false);
  
  const { latitude, longitude, setLatitude, setLongitude, newItemMode } = props;

  useEffect(() =>{
    if (!latitude) {
      setpinColor(greenIcon);
    }
  }, []);

  useMapEvents({
    click(e) {
      if (!latitude && newItemMode) {
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

  // Not finished and likely needs to be edited
  // const claimItem = (id, pin) => {
  //   // add user's ID as claiamer_id in DB
  //   return axios.put(`/api/pins/${id}`, {data: {pin}})
  //     .then(() => {
  //       setClaimed(true);
  //     });
  // }

  const deletePin = () => {
    // Not finished and likely needs to be edited
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
        <p>{props.item.picture}</p>
        <p>{props.item.condition}</p>
        <p><strong>Condition:</strong> Like new</p>
        <Button onClick={'runs claimItem function'}>Claimed</Button>
        <Button onClick={'mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;