import L from 'leaflet';

const pinSettings = () => {
  const bluePinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
  const greenPinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
  const orangePinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
  const violetPinUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';

  const customPin = (iconUrl) => new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = customPin(bluePinUrl);
  const greenIcon = customPin(greenPinUrl);
  const orangeIcon = customPin(orangePinUrl);
  const violetIcon = customPin(violetPinUrl);

  return { blueIcon, greenIcon, orangeIcon, violetIcon, bluePinUrl, greenPinUrl, orangePinUrl, violetPinUrl };
}

export default pinSettings;