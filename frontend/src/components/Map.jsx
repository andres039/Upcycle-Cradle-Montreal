import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const Map = () => {
  const mapPosition = [45.4, -75.7];
  const mapTilesId = 'mapbox/streets-v11';
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const NewMarker = () => {
    const [pinPosition, setPinPosition] = useState(null);
    
    useMapEvents({
      click(e) {
        setPinPosition(e.latlng);
      }
    })
  
    return pinPosition === null ? null : (
      <Marker position={pinPosition}>
        <Popup>You are here</Popup>
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
      <Marker position={mapPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.<button>Delete</button>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;