import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import Button from './Button';
import pinSettings from '../helpers/pinSettings'

const Pin = (props) => {
  const { blueIcon, greenIcon, orangeIcon, violetIcon } = pinSettings();
  const [pinColor, setpinColor] = useState(blueIcon);
  
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

  const deletePin = () => {
    setLatitude(null);
    setLongitude(null);
  }
  
  return latitude === null ? null : (
    <Marker position={[latitude, longitude]} icon={pinColor}>
      <Popup>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <Button onClick={() => deletePin()}>Delete</Button>
      </Popup>
    </Marker>
  )
}

export default Pin;