var axios = require('axios');
var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen();

var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })
var issData = {}

function obterPositionISS() {
  axios.get('http://api.open-notify.org/iss-now.json')
    .then(function (response) {
      issData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
}

obterPositionISS(); 

var map = grid.set(0, 0, 12, 12, contrib.map, { label: 'Servers Location' })

//set map dummy markers
var marker = true
setInterval(function () {
  if (marker) {
    obterPositionISS();
    let lon = issData.iss_position.longitude;
    let lat = issData.iss_position.latitude;
    map.addMarker({ "lon": lon, "lat": lat, color: 'yellow', char: 'X' })
    //map.addMarker({ "lon": "-122.6819", "lat": "45.5200" })
    map.setLabel(`ISS position lat:${lat} lon:${lon}`)
  }
  else {
    map.clearMarkers()
  }
  marker = !marker
  screen.render()
}, 1000)

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

// fixes https://github.com/yaronn/blessed-contrib/issues/10
screen.on('resize', function () {
  map.emit('attach');
});

screen.render()