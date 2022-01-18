import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Set map to center at user location
const UserLocation = () => {
  const map = useMap();

  const onLocationError = () => {
    // Coordinates for Montreal
    map.setView([45.497, -73.609], 13);
  }

  useEffect(() => {
    map.locate({setView: true});
    map.on('locationerror', onLocationError);
  }, []);
  return null;
}

export default UserLocation;