import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const mapPosition = [45.4, -75.7];
  const mapTilesId = 'mapbox/streets-v11';
  const mapAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  return (
    <MapContainer center={mapPosition} zoom={13} style={{ width: '75vw', height: '100vh' }}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${mapTilesId}/tiles/{z}/{x}/{y}?access_token=${mapAccessToken}`}
      />
      <Marker position={mapPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[45.4, -75.1]}>
        <Popup>
          Another popup!
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;