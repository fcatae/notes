function create() {
    newTask();
}

// Inter process communication
const {ipcRenderer} = require('electron')

function newTask() {
    ipcRenderer.send('notes.newwindow');
}

function openTask(task_id) {
    ipcRenderer.send('notes.openwindow', task_id);
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
