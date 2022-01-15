import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const Map = () => {
  const mapPosition = [45.4, -75.7];
  const mapTilesId = 'mapbox/streets-v11';
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // array of locations for testing
  const locations = [
    {
      title: "Location 1",
      description: "Description of location 1.",
      coordinates: [45.4310, -75.7372]
    },
    {
      title: "Location 2",
      description: "Description of location 2.",
      coordinates: [45.4411, -75.7592]
    },
    {
      title: "Location 3",
      description: "Description of location 3.",
      coordinates: [45.4121, -75.7612]
    }
  ];

  const NewMarker = () => {
    const [pinPosition, setPinPosition] = useState(null);
    
    useMapEvents({
      click(e) {
        setPinPosition(e.latlng);
      }
    });
  
    return pinPosition === null ? null : (
      <Marker position={pinPosition}>
        <Popup>
          You are here
          <button onClick={() => setPinPosition(null)}>Delete</button>
        </Popup>
      </Marker>
    )
  }

  return(
    <MapContainer center={mapPosition} zoom={13} style={{ width: '75vw', height: '100vh'}}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${mapTilesId}/tiles/{z}/{x}/{y}?access_token=${mapAccessToken}`}
      />
      <NewMarker />
      { locations.map(item => (
        <Marker position={item.coordinates}>
          <Popup>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;