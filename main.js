const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let windowCollection = []
let mainWin

function startWindow () {
  
  mainWin = createDashboard();
  windowCollection.push( mainWin );

    mainWin.on('closed', function () {
      app.quit();
    });

}

app.on('ready', startWindow)

//
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
//
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
//

app.on('activate', function () {
  if (windowCollection === null) {
    createDashboard()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// const {Menu, Tray} = require('electron')

// let tray = null
// app.on('ready', () => {
//   tray = new Tray('icon.png')
//   const contextMenu = Menu.buildFromTemplate([
//     {label: 'Item1', type: 'radio'},
//     {label: 'Item2', type: 'radio'},
//     {label: 'Item3', type: 'radio', checked: true},
//     {label: 'Item4', type: 'radio'}
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
// })


// In main process.
const {ipcMain} = require('electron')

ipcMain.on('organizer.new', (event, arg) => {

  windowCollection.push( createWindow() );

});

ipcMain.on('task-save', (event, task_data) => {

  var task = JSON.parse(task_data);
  var filename = app.getPath('userData') + '/' + task.id;

  saveFileSync(filename, task.id, task_data);

  event.sender.send('task-save:reply');

  console.log(`task saved: ${task.title} (id: ${task.id}) in ${filename}`);

  function saveFileSync(filename, task_id, task_data) {
      var fs = require('fs');
      fs.writeFileSync(filename, task_data, 'utf-8');
  }

});



function createWindow() {

    console.log('Creating new window')  // prints "ping"

    let win = new BrowserWindow({width: 240, height: 180, frame: false, show: false,
    skipTaskbar: true})

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'notes.html'),
      protocol: 'file:',
      slashes: true
    }));

    win.once('ready-to-show', () => {
      win.show()
    })

    win.on('closed', function () {
      win = null
    });

    return win;
}


function createDashboard() {

    let win = new BrowserWindow({show: false});

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dashboard.html'),
      protocol: 'file:',
      slashes: true
    }));

    win.once('ready-to-show', () => {
      win.show()
    })

    win.on('minimize', function() {
        console.log('minimize')

        var allwin = BrowserWindow.getAllWindows();
        allwin.forEach(b => b.minimize());
    });

    win.on('restore', function() {
        console.log('restore')

        var allwin = BrowserWindow.getAllWindows();
        allwin.forEach(b => b.restore());

    });

    win.toggleDevTools();

    win.on('closed', function () {
      win = null
    });

    return win;
}


function createHidden() {

    let win = new BrowserWindow({transparent: true, frame: false})
    win.setIgnoreMouseEvents(true)

    win.on('minimize', function() {
        console.log('minimize')

        var allwin = BrowserWindow.getAllWindows();
        allwin.forEach(b => b.minimize());
    });

    win.on('restore', function() {
        console.log('restore')

        var allwin = BrowserWindow.getAllWindows();
        allwin.forEach(b => b.restore());

    });

    win.on('closed', function () {
      win = null
    });

    var win2 = createWindow();
    
    return win;
}
var fs = require('fs');
var p = app.getPath('userData') + '/tasks.json'

//fs.writeFileSync(p, saved, 'utf-8');

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

setting = {a:1, b:2, c:"a"};

saved = JSON.stringify(setting);

fs.writeFileSync(p, saved, 'utf-8');

console.log(p);
