// DOM related

let currentId;

function getTaskIdFromQueryString() {
    let queryString = window.location.search;

    return ( queryString.length > 1 ) ? queryString.substr(1) : null;
}

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
    return document.getElementById('txtContent').innerHtml;
}

function setTaskId(value) {
    currentId = value;
    document.getElementById('txtTaskId').value = value;    
}

function setTitle(value) {
    document.getElementById('txtTitle').value = value;
}

function setContent(value) {
    document.getElementById('txtContent').innerText = value;
}

function setContentHtml(value) {
    document.getElementById('txtContent').innerHtml = value;
}

window.addEventListener('focus', function() {
    var txtTitle = document.getElementById('txtTitle');

    if(txtTitle) {
        window.document.title = txtTitle.value;
    }
});
window.addEventListener('blur', function() {
    window.document.title = txtTitle.value;

    scheduleSaveTask();
    console.log('task saved');
});

// InterProcess Communication
const {ipcRenderer} = require('electron')

let ipcOpenTaskCallback

function ipcOpenTask(task_id) {
    ipcRenderer.send('notes.open', task_id);
}

function ipcNewTask() {
    ipcRenderer.send('notes.newwindow', null);
}

ipcRenderer.on('notes.open:reply', (event, task) => {
   ipcOpenTaskCallback(task);
})

function ipcSaveTask(task) {
    ipcRenderer.send('notes.save', JSON.stringify(task));
}

// Controller

function scheduleSaveTask() {
    saveTask(currentTask());
}

function currentTask() {
    return {
        id: getTaskId(),
        metadata: null,
        title: getTitle(),
        content: getContent()
    };
}

function setCurrentTask(task) {    
    setContent(task.content);
    setTitle(task.title);
    setTaskId(task.id);
}

function newTask(task) {
    ipcNewTask(task);
}

function saveTask(task) {
    ipcSaveTask(task);
}

function openTaskContinue(task_id, callback) {    
    ipcOpenTaskCallback = callback;
    ipcOpenTask(task_id);
}

function init() {
    let task_id = getTaskIdFromQueryString();

    if( task_id != null ) {
        // open task
        openTaskContinue(task_id, (task)=>{
            setCurrentTask(task);
        });        
    } else { 
        // create a new task
        setCurrentTask({
            id: guid(),
            title: '',
            content: ''
        });
    }
}

init();




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