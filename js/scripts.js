// Get data and load to map
$.ajax({
  url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json",
  type: "GET",
  data: {
    "$where" : "created_date>'2021-08-26T00:00:00.000' AND created_date<'2021-09-4T00:00:00.000' AND agency='HPD' AND descriptor='HEAVY FLOW'",
    "$limit" : "50",
    "$$app_token": "NOveDvU9PH6eFY3kHQW7kyWtT"
  }
}).done(function(leaksData) {
  console.log(leaksData);

  mapboxgl.accessToken = "pk.eyJ1IjoiaGFubmFocm9zZXkiLCJhIjoiY2t6aG5ocmh0NDNvdzJvbmZxMG44czVyayJ9.GfvFPfGH_vdPxHOIGVGEPg"

  // Display map
  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v9', // style URL
    center: [-73.99,40.70], // starting position as [lng, lat]
    zoom: 10
  });

  leaksData.forEach(function(lD) {
    var popup = new mapboxgl.Popup({offest : 40})
    .setHTML(`
      <p>Possible flood at ${lD.incident_address} in ${lD.borough} reported at ${lD.created_date}<p>
    `);

  new mapboxgl.Marker({
    color: 'blue'
  })
    .setLngLat([lD.longitude,lD.latitude])
    .setPopup(popup)
    .addTo(map);
  })

  var wspCenter = [-73.997456, 40.730831]
  
  var map = new mapboxgl.Map({
     container: 'mapContainer', // HTML container id
     style: 'mapbox://styles/mapbox/dark-v9', // style URL
     center: wspCenter, // starting position as [lng, lat]
     zoom: 11,
   });

});
