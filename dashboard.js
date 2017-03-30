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

ipcRenderer.on('dashboard.add', (event, task) => {
   openTasks_add(task);
});

ipcRenderer.on('dashboard.remove', (event, task) => {
   openTasks_remove(task);
});

ipcRenderer.on('dashboard.update', (event, task) => {
   openTasks_update(task);
});

var openTasks = dashOpen() || {};

function openTasks_add(task) {
    openTasks[task.id] = { id: task.id, title: task.title };
    alert(JSON.stringify(openTasks))
}

function openTasks_remove(task) {
    delete openTasks[task.id];
    alert(JSON.stringify(openTasks))
}

function openTasks_update(task) {
    openTasks[task.id] = { id: task.id, title: task.title };
    alert(JSON.stringify(openTasks))
}

function dashOpen() {
    var fs = require('fs');
    var app = require('electron').remote.app;
    var p = app.getPath('userData') + '/dash.json'

    var settings = {};
    try {
        fs.openSync(p, 'r+'); 
        var d = fs.readFileSync(p);
        return JSON.parse(d);
    }
    catch(err) {
    console.log('file does not exist... ')
    }
}

function dashSave(data) {
    var fs = require('fs');
    var app = require('electron').remote.app;
    var p = app.getPath('userData') + '/dash.json'

    fs.writeFileSync(p, JSON.stringify(data), 'utf-8');
}


