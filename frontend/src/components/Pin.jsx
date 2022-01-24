import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

import './Pin.scss';

const Pin = (props) => {
  const { blueIcon, greenIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);

  const { latitude, longitude, setLatitude, setLongitude, newItemMode, item } = props;

  useEffect(() => {
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

  const deletePin = () => {
    setLatitude(null);
    setLongitude(null);
  }

  return latitude === null ? null : (
    <Marker position={[latitude, longitude]} icon={pinColor}>
      <Popup className="pin-popup__new">
        <h1 className="pin-popup__new-title">{item.title}</h1>
        <p>{item.description}</p>
        <Button cancel onClick={() => deletePin()}>Delete</Button>
      </Popup>
    </Marker>
  )
}

export default Pin;