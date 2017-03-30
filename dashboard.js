function create() {
    openTask();
}

const {ipcRenderer} = require('electron')


function newOrganizerWindow() {
    ipcRenderer.send('notes.new', 'orgNEW');
}

function openTask() {
    ipcRenderer.send('organizer.new', 'orgNEW');
}


var fs = require('fs');
var app = require('electron').remote.app;
var p = app.getPath('userData') + '/dash.json'

var settings = {};
try {
  fs.openSync(p, 'r+'); 
  var d = fs.readFileSync(p);
  settings = JSON.parse(d);
}
catch(err) {
  console.log('file does not exist ... creating a new file')
}

console.log(JSON.stringify(settings))

setting = {dash:1, dashb:2, dashc:"a"};

saved = JSON.stringify(setting);

fs.writeFileSync(p, saved, 'utf-8');

console.log(p);