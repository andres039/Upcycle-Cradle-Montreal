import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import chair from '../chair1.jpg';
import axios from "axios";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const BluePin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);
  const [claimed, setClaimed] = useState(false);

  const { id, item } = props;
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);

  // useEffect(() =>{
  //   if (condition) {
  //    setpinColor(orangeIcon);
  //   }
  // }, []);


  const claimItem = (id, pin) => {

    const pinID = id;
    //track user id
    const userID = 2;

    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then(() => {
        setClaimed(true);
      });
  }

  //userID => get request to db, then set the state for delete button(show
  // if exists, then when delete is pressed, delete request to db)

  const deletePin = () => {
    const pinID = id;
    return axios.delete(`/api/pins/${pinID}`, { pinID })
      .then(() => {
        //console.log('from pins component', setLatitude, setLongitude);
        setBluePinLatitude(null);
        setBluePinLongitude(null);
        console.log("Deleted successfully")
      });
  }

  return bluePinLatitude === null ? null : (
    <Marker position={[bluePinLatitude, bluePinLongitude]} icon={pinColor}>
      <Popup>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <img src={`${item.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {item.condition}</p>
        <Button onClick={() => claimItem()}>Claimed</Button>
        <Button onClick={'mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default BluePin;