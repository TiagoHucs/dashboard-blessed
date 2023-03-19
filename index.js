
var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, grid = new contrib.grid({rows: 2, cols: 2, screen: screen})

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
 y: [5, 1, 7, 5]}

 line.setData([lineData])

//cria grafico mapa
var map = grid.set(0, 1, 1, 1, contrib.map, {label: 'Servers Location', color: 'blue'})

//cria grafico barras
var bar = grid.set(1, 0, 1, 1, contrib.bar,
    { label: 'Server Utilization (%)'
    , barWidth: 4
    , barSpacing: 6
    , xOffset: 0
    , maxHeight: 9})

var barData = { 
    titles: ['bar1', 'bar2'],
    data: [5, 10]
}

bar.setData(barData);

//cria LCD
var lcd = grid.set(1, 1, 1, 1, contrib.lcd,
    { segmentWidth: 0.06 // how wide are the segments in % so 50% = 0.5
    , segmentInterval: 0.11 // spacing between the segments in % so 50% = 0.550% = 0.5
    , strokeWidth: 0.11 // spacing between the segments in % so 50% = 0.5
    , elements: 4 // how many elements in the display. or how many characters can be displayed.
    , display: 321 // what should be displayed before first call to setDisplay
    , elementSpacing: 4 // spacing between each element
    , elementPadding: 2 // how far away from the edges to put the elements
    , color: 'green' // color for the segments
    , label: 'Storage Remaining'})


//teclas de atalho
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
return process.exit(0);
});

screen.render()