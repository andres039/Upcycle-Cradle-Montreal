import { useEffect, useState, useContext } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from './Button';
import pinSettings from '../helpers/pinSettings';

import './BluePin.scss';

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
  //item is CLAIMED, current user didn't create and didn't claim


  useEffect(() => {

    if (claimed && current_user_id === item.creator_id) {
      setpinColor(violetIcon);
    }
  }, [claimed]);

  useEffect(() => {
    if (!claimed && current_user_id === item.creator_id) {
      setpinColor(greenIcon);
    }
  }, [claimed]);

  useEffect(() => {
    if (claimed && current_user_id === item.claimer_id) {
      setpinColor(orangeIcon);
    }
  }, [claimed]);


  useEffect(() => {

    if (claimed && current_user_id !== item.creator_id && current_user_id !== claimed) {
      setBluePinLatitude(null);
      setBluePinLongitude(null);
    }


  }, [claimed]);


  const claimItem = () => {
    const pinID = id;
    const userID = current_user_id

    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then(() => {
        setClaimed(current_user_id);
        setpinColor(orangeIcon);
      });
  }

  const unclaimItem = () => {
    const pinID = id;
    const userID = null;

    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then(() => {
        setClaimed(null);
        setpinColor(blueIcon);
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
      <Popup className="pin-popup__new">
        <h1 className="pin-popup__new-title">{item.title}</h1>
        <p>{item.description}</p>
        <img className="pin-popup__new-picture" src={`${item.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {item.condition}</p>
        {claimed && claimed !== 'delete countdown' && <p className="pin-popup__new-buttons-claimed">You claimed this item. Please pick up at your earliest convenience.</p>}
        {claimed === 'delete countdown' && <p className="pin-popup__new-buttons-picked-up">You have closed the deal! The pin will be deleted shortly.</p>}
        <div className="pin-popup__new-buttons">
          {!claimed && current_user_id !== item.creator_id && <Button claimed onClick={() => claimItem()}>Claim</Button>}
          {claimed && current_user_id !== item.creator_id && <Button claimed onClick={() => unclaimItem()}>Unclaim</Button>}
          {claimed && current_user_id !== item.creator_id && <Button confirm onClick={() => deletePin('claimer delete')}>Picked up</Button>}
          {/* Put condition on delete button to only allow the creator to use it (user === item.creator_id) once user tracking is set up */}
          {current_user_id === item.creator_id && <Button cancel onClick={() => deletePin('creator delete')}>Delete</Button>}
        </div>
      </Popup>
    </Marker>
  )
}

export default BluePin;