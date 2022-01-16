import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const Pin = (props) => {
  const [pinPosition, setPinPosition] = useState(props.item.coordinates || null);

  useMapEvents({
    click(e) {
      if (!pinPosition) {
        const len = Object.keys(props.allItems).length;

        setPinPosition(e.latlng);
        props.allItems.push({
          id: len + 1,
          title: `Location ${len + 1}`,
          description: `Description of location ${len + 1}.`,
          coordinates: [e.latlng.lat, e.latlng.lng]
        });
      }
    }
  });
  
  return pinPosition === null ? null : (
    <Marker position={pinPosition}>
      <Popup>
        <h1>{props.item.title}</h1>
        <p>{props.item.description}</p>
        <button onClick={() => setPinPosition(null)}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;