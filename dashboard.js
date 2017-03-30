function create() {
    openTask();
}

const {ipcRenderer} = require('electron')


function newOrganizerWindow() {
    let task_id = guid();
    ipcRenderer.send('notes.newwindow', task_id);
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



// from: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
