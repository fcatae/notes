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


// ipcRenderer.send('asynchronous-message', 'ping')

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })

function openTask() {

}

function getTitle() {
    return document.getElementById('txtTitle').value;
}

function getContent() {
    return document.getElementById('txtContent').innerText;
}

function saveTask() {
    alert(getTitle())
    alert(getContent())   

}