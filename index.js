
var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, grid = new contrib.grid({rows: 2, cols: 2, screen: screen})

grid2 = new contrib.grid({rows: 2, cols: 1, screen: screen})

// cria grafico linha
var line = grid.set(0, 0, 1, 1, contrib.line,
{ style:
  { line: "yellow"
  , text: "green"
  , baseline: "black"}
, xLabelPadding: 3
, xPadding: 5
, label: 'Stocks'})

var lineData = {
 x: ['t1', 't2', 't3', 't4'],
 y: [5, 1, 7, 5],
 style: {
    line: 'red'
   }}

 var lineData2 = {
    x: ['t1', 't2', 't3', 't4'],
    y: [8, 3, 9, 4]}

 line.setData([lineData, lineData2])

//cria grafico mapa
var map = grid.set(0, 1, 1, 1, contrib.map, {label: 'Servers Location'})
map.addMarker({"lon" : "-79.0000", "lat" : "37.5000", color: "red", char: "X" })

//cria grafico barras
var bar = grid.set(1, 0, 1, 1, contrib.bar,
    { label: 'Server Utilization (%)'
    , barWidth: 4
    , barSpacing: 6
    , xOffset: 0
    , maxHeight: 9})

var barData = { 
    titles: ['alpha', 'bravo','chalie','delta'],
    data: [5, 10, 15, 8]
}

bar.setData(barData);

//cria LCD
var lcd = grid.set(1, 1, 1, 1, contrib.lcd,
    { segmentWidth: 0.1 // how wide are the segments in % so 50% = 0.5
    , segmentInterval: 0.1 // spacing between the segments in % so 50% = 0.550% = 0.5
    , strokeWidth: 0.11 // spacing between the segments in % so 50% = 0.5
    , elements: 7 // how many elements in the display. or how many characters can be displayed.
    , display: 'WARNING' // what should be displayed before first call to setDisplay
    , elementSpacing: 1 // spacing between each element
    , elementPadding: 1 // how far away from the edges to put the elements
    , color: 'red' // color for the segments
    , label: 'Status'})


//teclas de atalho
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
return process.exit(0);
});

screen.render()