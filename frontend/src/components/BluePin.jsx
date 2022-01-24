import { useEffect, useState, useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

import Button from './Button';
import pinSettings from '../helpers/pinSettings';

import './BluePin.scss';

const BluePin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);

  const { id, item, setOldPins, index } = props;
  const [claimed, setClaimed] = useState(item.claimer_id)
  const [bluePinLatitude, setBluePinLatitude] = useState(item.latitude);
  const [bluePinLongitude, setBluePinLongitude] = useState(item.longitude);
  const [currentItem, setCurrentItem] = useState(item);
  const [pickedUp, setPickedUp] = useState("");

  const context = useContext(AuthContext);
  const current_user_id = context.id;


  useEffect(() => {

    if (claimed && current_user_id === currentItem.creator_id) {
      setpinColor(violetIcon);
    }
  }, [claimed]);

  useEffect(() => {
    if (!claimed && current_user_id === currentItem.creator_id) {
      setpinColor(greenIcon);
    }
  }, [claimed]);

  useEffect(() => {
    if (claimed && current_user_id === currentItem.claimer_id) {
      setpinColor(orangeIcon);
    }
  }, [claimed]);


  useEffect(() => {

    if (claimed && current_user_id !== currentItem.creator_id && current_user_id !== claimed) {
      setBluePinLatitude(null);
      setBluePinLongitude(null);
    }


  }, [claimed]);


  const claimItem = () => {
    const pinID = id;
    const userID = current_user_id

    // add user's ID as claiamer_id in DB
    return axios.put(`/api/pins/${pinID}`, { userID, pinID })
      .then((response) => {
        setCurrentItem(response.data[0])
        setOldPins((prev) => {
          prev[index] = response.data[0];
          return prev;
        })
        console.log(response)
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
    console.log(deleteType)
    const pinID = id;
    return axios.delete(`/api/pins/${pinID}`, { pinID })
      .then(() => {
        if (deleteType === 'creator delete') {
          setBluePinLatitude(null);
          setBluePinLongitude(null);
        } else {
          alert("And here's another one saved from the landfill!");
        }
      })
      .catch((error) => {
        console.log("error message:", error);
      })
  }


  return bluePinLatitude === null ? null : (
    <Marker position={[bluePinLatitude, bluePinLongitude]} icon={pinColor}>
      <Popup className="pin-popup__new">
        <h1 className="pin-popup__new-title">{currentItem.title}</h1>
        <p>{currentItem.description}</p>
        <img className="pin-popup__new-picture" src={`${currentItem.picture}`} alt='Item' />
        <p><strong>Condition:</strong> {currentItem.condition}</p>
        {claimed && pickedUp !== 'delete countdown' && currentItem.claimer_id === current_user_id && <p className="pin-popup__new-buttons-claimed">You claimed this currentItem. Please pick up at your earliest convenience.</p>}
        {claimed && pickedUp !== 'delete countdown' && currentItem.creator_id === current_user_id && <p className="pin-popup__new-buttons-claimed">This item has been claimed!</p>}
        <div className="pin-popup__new-buttons">
          {!claimed && current_user_id !== currentItem.creator_id && <Button claimed onClick={() => claimItem()}>Claim</Button>}
          {claimed && current_user_id !== currentItem.creator_id && <Button claimed onClick={() => unclaimItem()}>Unclaim</Button>}
          {claimed && current_user_id !== currentItem.creator_id && <Button cancel onClick={() => deletePin('claimer delete')}>Picked up</Button>}
          {/* Put condition on delete button to only allow the creator to use it (user === currentItem.creator_id) once user tracking is set up */}
          {current_user_id === currentItem.creator_id && <Button cancel onClick={() => deletePin('creator delete')}>Delete</Button>}
        </div>
      </Popup>
    </Marker>
  )
}

export default BluePin;