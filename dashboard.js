const {ipcRenderer} = require('electron')

function newOrganizerWindow() {
    ipcRenderer.send('notes.new', 'orgNEW');
}

function openTask() {
    ipcRenderer.send('organizer.new', 'orgNEW');
}