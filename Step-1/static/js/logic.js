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

// Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
function markerSize(mag) {
  return mag * 200;
}

// Define a markerSize() function that will give each earthquake a different opacity based on its depth.
function markerColor(depth) {
  console.log(depth);
  if(depth > 90){
    return "darkred";
  }
  else if (depth > 70){
    return "red";
  }
  else if (depth > 50){
    return "orange";
  }
  else if (depth > 30){
    return "yellow";
  }
  else if (depth > 10){
    return "yellowgreen";
  }
  else{
    return "green";
  }
}

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
  //Include popups that provide additional information about the earthquake when a marker is clicked.

  //Create a legend that will provide context for your map data.
  // Loop through the data
  for (var i = 0; i < response.features.length; i++) {
    // Set the data location property to a variable.
   // console.log(location);
    // Check for the location property.
    //if (location) {
    var location = [];
    location.push(response.features[i].geometry.coordinates[1]);
    location.push(response.features[i].geometry.coordinates[0]);
    //console.log(response.features[i].geometry.coordinates[2]);
    //console.log(location);
      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(
        L.circle(location, {
        fillOpacity: 1,
        color: "black",
        fillColor: markerColor(response.features[i].geometry.coordinates[2]),
        // Setting our circle's radius to equal the output of our markerSize() function:
        radius: markerSize(response.features[i].properties.mag)
      }).bindPopup(response.features[i].properties.place + "<hr> Magnitude:  " + response.features[i].properties.mag + "<hr> Depth: " + response.features[i].geometry.coordinates[2]));

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

   // Set up the legend.
   var legend = L.control({ position: "bottomright" });
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend");
     var labels = [];
     var colorp = [];
     var colors = ["darkred", "red", "orange", "yellow", "yellowgreen", "green"];
     var limits = ["90+", "70-90", "50-70", "30-50", "10-30", "-10-10"];
 
     // Add the minimum and maximum.
     var legendInfo = "<h3>Earthquake Depth</h3>"; 
 
     div.innerHTML = legendInfo;

     for(var i = 0; i<6; i++) {
      //console.log(colors[i]);
      labels.push("<tr><td style=\"color:" + colors[i] + "; background-color:" + colors[i] + ";\">CD<td>");
      labels.push("<td>" + limits[i] + "</td></tr>");
     }

    div.innerHTML += "<table>" + labels.join("") + "</table>";

     return div;
   };
 
   // Adding the legend to the map
   legend.addTo(myMap);

});