import { useEffect, useState, useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const BluePin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);

  const { id, item } = props;
  const [claimed, setClaimed] = useState(item.claimer_id)
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);

  const context = useContext(AuthContext);
  const current_user_id = context.id;


  //check if the current user is the pin claimer ---> set it to violet

  useEffect(() => {
    if (claimed && current_user_id !== item.creator_id) {
      setpinColor(orangeIcon);
    }
  }, []);


  useEffect(() => {

    if (claimed && current_user_id === item.creator_id) {

      setpinColor(violetIcon);
    }
  }, [claimed]);


  const claimItem = () => {
    const pinID = id;

    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { current_user_id, pinID })
      .then(() => {
        setClaimed(true);
      });
  }



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