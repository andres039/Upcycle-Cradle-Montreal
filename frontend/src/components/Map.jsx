import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  return(
    <MapContainer center={[45.4, -75.7]} zoom={13} style={{ width: '75vw', height: '100vh'}}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={process.env.LEAFLET_ACCESS_TOKEN}'
      />
      <Marker position={[45.4, -75.7]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;