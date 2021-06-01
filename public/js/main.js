const NessMonster = {lat: 57.316765, lng: -4.439588};

var southWest = L.latLng(90, 180)
var northEast = L.latLng(-90, -180)
var mybounds = L.latLngBounds(southWest, northEast);
var lyrDistance;
var marker;



// Initialize map
var map = L.map('mymap',{maxBounds: mybounds, maxZoom: 19, minZoom: 2}).setView([20, -4.439588],2);

// Open Street Map Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Loch Ness Monster Icon
var nessIcon = L.icon({
    iconUrl: 'img/ness_monster.svg',
    iconSize:     [40, 60], // size of the icon
    iconAnchor:   [20, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -35] // point from which the popup should open relative to the iconAnchor
});

// Loch Ness Monster Marker
L.marker([57.316765, -4.439588],{icon:nessIcon}).addTo(map).bindPopup("Loch Ness Monster's House.").openPopup();

// Display distance between Ness and Marker
function onMapClick(e) {
  if (lyrDistance) {
    map.removeLayer(lyrDistance);
  }
  
  var position = marker.getLatLng();
  const UserLocation = {lat: position.lat, lng: position.lng};
  lyrDistance = new L.Geodesic([NessMonster, UserLocation]).addTo(map);
  info.update(lyrDistance.statistics);
  marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))

      if (lyrDistance) {
        map.removeLayer(lyrDistance);
      }

    const UserLocation = {lat: position.lat, lng: position.lng};
    lyrDistance = new L.Geodesic([NessMonster, UserLocation]).addTo(map);
    info.update(lyrDistance.statistics);
  });
  map.addLayer(marker);
};

// map.on('click', onMapClick);

function markerOnClick(e){
  if (lyrDistance) {
    map.removeLayer(lyrDistance);
  }
  const UserLocation = {lat: e.latlng.lat, lng: e.latlng.lng};
  lyrDistance = new L.Geodesic([NessMonster, UserLocation]).addTo(map);
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    layer.on('click', markerOnClick)
}


function validateForm() {
  var x = document.forms["register"]["lat"].value;
  if (x == "") {
    alert("Location must be selected");
    return false;
  }
}



function openTab(tabName) {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";  
        }
        document.getElementById(tabName).style.display = "block";
        map2.invalidateSize();
      }