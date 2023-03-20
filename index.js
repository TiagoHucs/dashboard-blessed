var axios = require('axios');
var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()
  , grid = new contrib.grid({ rows: 4, cols: 2, screen: screen })

var issData = {}

//cria grafico mapa
var map = grid.set(0, 1, 2, 1, contrib.map, { label: 'Location of ' });

function obterPositionISS() {
  axios.get('https://api.wheretheiss.at/v1/satellites/25544')
    .then(function (response) {
      issData = response.data;
      map.setLabel(issData.name + ' ' + issData.longitude + ' ' + issData.latitude);
      map.addMarker({ "lon": issData.longitude, "lat": issData.latitude, color: "red", char: "X" });
      screen.render(map)
      //screen.render();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
}


var line = grid.set(0, 0, 2, 1, contrib.line,
  {
    style:
    {
      line: "yellow"
      , text: "green"
      , baseline: "black"
    }
    , xLabelPadding: 3
    , xPadding: 5
    , label: 'Stocks'
  })


var lineData = {
  x: ['t1', 't2', 't3', 't4'],
  y: [5, 1, 7, 5],
  style: {
    line: 'red'
  }
}

var lineData2 = {
  x: ['t1', 't2', 't3', 't4'],
  y: [8, 3, 9, 4]
}

line.setData([lineData, lineData2])

//cria grafico barras
var bar = grid.set(2, 0, 2, 1, contrib.bar,
  {
    label: 'Server Utilization (%)'
    , barWidth: 4
    , barSpacing: 6
    , xOffset: 0
    , maxHeight: 9
  })

var barData = {
  titles: ['alpha', 'bravo', 'chalie', 'delta'],
  data: [5, 10, 15, 8]
}

bar.setData(barData);

//cria LCD
var lcd = grid.set(2, 1, 1, 1, contrib.lcd,
  {
    segmentWidth: 0.1 // how wide are the segments in % so 50% = 0.5
    , segmentInterval: 0.1 // spacing between the segments in % so 50% = 0.550% = 0.5
    , strokeWidth: 0.11 // spacing between the segments in % so 50% = 0.5
    , elements: 7 // how many elements in the display. or how many characters can be displayed.
    , display: 'WARNING' // what should be displayed before first call to setDisplay
    , elementSpacing: 1 // spacing between each element
    , elementPadding: 1 // how far away from the edges to put the elements
    , color: 'red' // color for the segments
    , label: 'Status'
  })

//cria donut
var donut = grid.set(3, 1, 1, 1, contrib.donut, {
  label: 'Test',
  radius: 8,
  arcWidth: 3,
  remainColor: 'black',
  yPadding: 2,
  data: [
    { percent: 20, label: 'web1', color: 'red' },
    { percent: 40, label: 'web2', color: 'green' },
    { percent: 83, label: 'web3', color: 'blue' },
    { percent: 72, label: 'web4', color: 'white' }
  ]
});

//var random = Math.round(Math.random() * 10);

//teclas de atalho
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

//obterPositionISS();
setInterval(obterPositionISS,5000);