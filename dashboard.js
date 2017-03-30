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

function removeTask(task_id) {

    // ask user first
    if( confirm('Are you sure you want to delete the task?') ) {
        ipcRenderer.send('notes.remove', task_id);
    }

}

ipcRenderer.on('dashboard.add', (event, arg) => {
   openTasks_add(JSON.parse(arg));
   // dashSave(openTasks);
   render();
});

ipcRenderer.on('dashboard.delete', (event, task_id) => {
   openTasks_delete(task_id);
   dashSave(openTasks);
   render();
});

ipcRenderer.on('dashboard.update', (event, arg) => {
   openTasks_update(JSON.parse(arg));
   dashSave(openTasks);
   render();
});

var openTasks = dashOpen();

function openTasks_add(task) {
    openTasks[task.id] = { id: task.id, title: task.title };
}

function openTasks_delete(task_id) {
    delete openTasks[task_id];
}

function openTasks_update(task) {
    openTasks[task.id] = { id: task.id, title: task.title };
}

function dashOpen() {
    var fs = require('fs');
    var app = require('electron').remote.app;
    var p = app.getPath('userData') + '/dashboard.json'

    var settings = {};
    try {
        fs.openSync(p, 'r+'); 
        var d = fs.readFileSync(p);
        return JSON.parse(d);
    }
    catch(err) {
    console.log('file does not exist... ')
    }

return {};
}

function dashSave(data) {
    var fs = require('fs');
    var app = require('electron').remote.app;
    var p = app.getPath('userData') + '/dashboard.json'

    fs.writeFileSync(p, JSON.stringify(data), 'utf-8');
}

render();