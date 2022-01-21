import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
// import axios from "axios";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const Pin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);
  const [claimed, setClaimed] = useState(false);
  
  const { latitude, longitude, setLatitude, setLongitude, newItemMode, item } = props;

  useEffect(() =>{
    if (!latitude) {
      setpinColor(greenIcon);
    }
  }, []);

  useMapEvents({
    click(e) {
      if (!latitude && newItemMode) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
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
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.picture}</p>
        {item.condition && <p><strong>Condition:</strong> {props.item.condition}</p>}
        <Button onClick={'runs claimItem function'}>Claimed</Button>
        <Button onClick={'mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;