// Initialize and add the map

//locations are fetched from my own api, start node app.js to fetch it server will run on port 3000

let map;
const positions = [
  { lat: 10.99, lng: 77.1 },
  { lat: -23.533773, lng: -46.62529 },
  { lat: 51.509865, lng: -0.118092 },
  { lat: 40.7167, lng: -73.9682 },
  { lat: -26.195246, lng: 28.03408 },
  { lat: 28.613, lng: 77.209 },
];
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 20.613, lng: 40.209 },
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: positions[5],
    title: "Soul Stone",
  });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: positions[0],
    title: "Time Stone",
  });
  const marker3 = new AdvancedMarkerElement({
    map: map,
    position: positions[2],
    title: "Power Stone",
  });
  const marker4 = new AdvancedMarkerElement({
    map: map,
    position: positions[3],
    title: "Reality Stone",
  });
  const marker5 = new AdvancedMarkerElement({
    map: map,
    position: positions[4],
    title: "Mind Stone",
  });
  const marker6 = new AdvancedMarkerElement({
    map: map,
    position: positions[1],
    title: "Space Stone",
  });

  const thanosMarker = new google.maps.Marker({
    map: map,
    position: { lat: 20.613, lng: 40.209 },
    title: "Thanos",
    icon: "./assets/images/thanos.ico",
  });

  function moveThanosMarkerRandomly(marker, range) {
    const targetPoints = positions;

    const intervalId = setInterval(() => {
      const currentPosition = marker.getPosition();
      const latOffset = getRandomOffset(range);
      const lngOffset = getRandomOffset(range);
      const newLat = currentPosition.lat() + latOffset;
      const newLng = currentPosition.lng() + lngOffset;
      const newPosition = new google.maps.LatLng(newLat, newLng);
      marker.setPosition(newPosition);

      for (const point of targetPoints) {
        const distance = calculateDistance(
          newPosition.lat(),
          newPosition.lng(),
          point.lat,
          point.lng
        );
        if (distance <= 2000) {
          clearInterval(intervalId);
          window.alert("Avengers assemble");
          console.log("Avengers assemble");
          const avengerMarker = new new google.maps.Marker({
            map: map,
            position: { lat: point.lat, lng: point.lng },
            title: "Avengers",
            icon: "./assets/images/avenger.png",
          })();
          break;
        }
      }
    }, 1000);
  }

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const radius = 6371; // Radius of the Earth in kilometers
    const degToRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * degToRad;
    const dLng = (lng2 - lng1) * degToRad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * degToRad) *
        Math.cos(lat2 * degToRad) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance; // Distance in kilometers
  }

  function getRandomOffset(range) {
    return (Math.random() - 0.6) * range;
  }

  moveThanosMarkerRandomly(thanosMarker, 50);
}

initMap();

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function checkCenter() {
//   var heart = document.getElementById('heart');
//   var rect = heart.getBoundingClientRect();
//   var centerX = window.innerWidth / 2;
//   var centerY = window.innerHeight / 2;

//   if (rect.left <= centerX && rect.right >= centerX && rect.top <= centerY && rect.bottom >= centerY) {
//     console.log("Reached center");
//   }
// }

// setInterval(checkCenter, 100);
