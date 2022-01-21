import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from "axios";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const BluePin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);

  const { id, item } = props;
  const [claimed, setClaimed] = useState(item.claimer_id)
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);

  useEffect(() =>{
    if (claimed) {
     setpinColor(orangeIcon);
    }
  }, [claimed]);

  const claimItem = () => {

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

  const deletePin = (deleteType) => {
    const pinID = id;
    return axios.delete(`/api/pins/${pinID}`, { pinID })
      .then(() => {
        if (deleteType === 'creator delete') {
          setBluePinLatitude(null);
          setBluePinLongitude(null);
        } else {
          setClaimed('delete countdown');
          setTimeout(() => {
            setBluePinLatitude(null);
            setBluePinLongitude(null);
          }, 10000);
        }
      });
  }

  return bluePinLatitude === null ? null : (
    <Marker position={[bluePinLatitude, bluePinLongitude]} icon={pinColor}>
      <Popup>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <img src={`${item.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {item.condition}</p>
        {claimed && claimed !== 'delete countdown' && <p>You claimed this item. Please pick up at your earliest convinience.</p>}
        {claimed === 'delete countdown' && <p>You have closed the deal! The pin will be deleted shortly.</p>}
        {!claimed && <Button onClick={() => claimItem()}>Claimed</Button>}
        {claimed && <Button onClick={() => deletePin('claimer delete')}>Picked up</Button>}
        {/* Put condition on delete button to only allow the creator to use it (user === item.creator_id) once user tracking is set up */}
        <Button onClick={() => deletePin('creator delete')}>Delete</Button>
      </Popup>
    </Marker>
  )
}

export default BluePin;