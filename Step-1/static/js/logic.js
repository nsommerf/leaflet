// Creating the map object
// We set the longitude, latitude, and starting zoom level.
var myMap = L.map("map", {
  center: [37.8, -96],
  zoom: 4
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Creating a new marker:
// We pass in some initial options, and then add the marker to the map by using the addTo() method.
/*
var marker = L.marker([45.52, -122.67], {
  draggable: true,
  title: "My First Marker"
}).addTo(myMap);

// Binding a popup to our marker
marker.bindPopup("Hello There!");
*/
// Assemble the API query URL.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get the data with d3.

d3.json(url).then(function(response) {
  console.log(response.features[0]);
  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

  //Your data markers should reflect the magnitude of the earthquake by their size and and depth of the 
  //earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with 
  //greater depth should appear darker in color.
  //response.features[i].geometry.coordinates[3])
  //Include popups that provide additional information about the earthquake when a marker is clicked.

  //Create a legend that will provide context for your map data.
  // Loop through the data.
  //for (quake in response.features) {
  for (var i = 0; i < response.features.length; i++) {
  //  console.log(quake);
    // Set the data location property to a variable.
   // var location = response.features[i];
   // console.log(location);
    // Check for the location property.
    //if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]])
        .bindPopup(response.features[i].properties.place));
    //}

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});
