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

  const { item } = props;
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);

  // useEffect(() =>{
  //   if (condition) {
  //    setpinColor(orangeIcon);
  //   }
  // }, []);


  const claimItem = (id, pin) => {

    const pinID = props.id;
    const userID = 7;
    console.log(pinID)
    const data = { userID, pinID }
    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { data })
      .then(() => {
        setClaimed(true);
      });
  }

  const deletePin = () => {
    // Not finished and likely needs to be edited
    // return axios.delete(`/api/pins/${id}`, {data: {pin}})
    //   .then(() => {
    //console.log('from pins component', setLatitude, setLongitude);
    setBluePinLatitude(null);
    setBluePinLongitude(null);
    // });
  }

  return bluePinLatitude === null ? null : (
    <Marker position={[bluePinLatitude, bluePinLongitude]} icon={pinColor}>
      <Popup>
        <h1>{props.item.title}</h1>
        <p>{props.item.description}</p>
        <img src={`${props.item.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {props.item.condition}</p>
        <Button onClick={() => claimItem()}>Claimed</Button>
        <Button onClick={'mark column picked up as true'}>Picked up</Button>
        <button onClick={() => deletePin()}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default BluePin;