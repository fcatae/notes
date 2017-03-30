// DOM related

let currentId = guid();

function getTaskId() {
    return currentId;
}

function getTitle() {
    return document.getElementById('txtTitle').value;
}

function getContent() {
    return document.getElementById('txtContent').innerText;
}

function getContentHtml() {
    return document.getElementById('txtContent').innerText;
}

// InterProcess Communication

// In renderer process (web page).
const {ipcRenderer} = require('electron')

// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })

// ipcRenderer.send('asynchronous-message', 'ping')

function newOrganizerWindow() {
    ipcRenderer.send('organizer.new', 'orgNEW');
}

function ipcSaveTask(task) {
    ipcRenderer.send('task-save', JSON.stringify(task));
}


function openTask() {

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

function currentTask() {
    return {
        id: getTaskId(),
        metadata: null,
        title: getTitle(),
        content: getContent()
    };
}

function saveTask(task) {
    ipcSaveTask(task);
}