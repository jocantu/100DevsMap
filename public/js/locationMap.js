// Initialize map
var map2 = L.map('locationMap').setView([57.316765, -4.439588],2);

// Open Street Map Tile Layer
let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

tileLayer.addTo(map2);


// Add a marker when the user clicks the map
function onMapClickLocation(e) {
  if (marker) {
    map2.removeLayer(marker);
  }

  marker = new L.marker(e.latlng, {draggable:'true'});

  marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    map2.panTo(new L.LatLng(position.lat, position.lng))
    
  });
  
  const nessMonster = {lat: 57.316765, lng: -4.439588};
  const userLocation = {lat: marker.getLatLng().lat, lng: marker.getLatLng().lng};
  lyrDistance = new L.Geodesic([nessMonster, userLocation]);
  console.log(lyrDistance);
  const totalDistance = (lyrDistance.statistics.totalDistance/1000).toFixed(0);
  console.log(totalDistance);
  map2.addLayer(marker);
  document.getElementById("lat").value = marker.getLatLng().lat;
  document.getElementById("lng").value = marker.getLatLng().lng;
  document.getElementById("nessDistance").value = totalDistance;
};

map2.on('click', onMapClickLocation);




