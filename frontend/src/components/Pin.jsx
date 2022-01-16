import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import Button from './Button';

const Pin = (props) => {
  const [pinPosition, setPinPosition] = useState(props.item.coordinates || null);

  useMapEvents({
    click(e) {
      if (!pinPosition) {
        const len = Object.keys(props.allItems).length;

        setPinPosition(e.latlng);
        
        // Placeholder for saving to database
        props.allItems.push({
          id: len + 1,
          title: `Location ${len + 1}`,
          description: `Description of location ${len + 1}.`,
          coordinates: [e.latlng.lat, e.latlng.lng]
        });
        
        // setPinPosition(null);
      }
    }
  });
  
  return pinPosition === null ? null : (
    <Marker position={pinPosition}>
      <Popup>
        <h1>{props.item.title}</h1>
        <p>{props.item.description}</p>
        <p>Picture here...</p>
        <p><strong>Condition:</strong> Like new</p>
        <Button onClick={'add user\'s ID as claiamer_id in DB'}>Claimed</Button>
        <Button onClick={'delete item from DB or mark column picked up as true'}>Picked up</Button>
        <button onClick={() => setPinPosition(null)}>Delete</button>
      </Popup>
    </Marker>
  )
}

export default Pin;