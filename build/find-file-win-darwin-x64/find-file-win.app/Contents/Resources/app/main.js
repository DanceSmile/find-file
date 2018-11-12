// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const ipcMain = require('electron').ipcMain;
const fs = require('fs');
const path = require('path');
var exec = require('child_process').exec; 

function fmtDate(obj){
  var date =  new Date(obj);
  var y = 1900+date.getYear();
  var m = "0"+(date.getMonth()+1);
  var d = "0"+date.getDate();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

var config  = fs.readFileSync( path.join(path.resolve('.'), 'config.js')  )

config = JSON.parse(config.toString())



/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
const extension = ['.doc', '.pptx', '.docx']
var filelist = []
 function  fileDisplay (filePath){
  //根据文件路径读取文件，返回文件列表
   let files = fs.readdirSync(filePath);

  //遍历读取到的文件列表
  files.forEach(  function(filename){
    //获取当前文件的绝对路径
    let filedir = path.join(filePath,filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    let stats = fs.statSync(filedir)
    var isFile = stats.isFile();//是文件
    var isDir = stats.isDirectory();//是文件夹
    if(isFile  && extension.indexOf( path.extname(filedir).toLowerCase()) !== -1 ){
        filelist.push({
          name: path.basename(filedir),
          fullname: filedir ,
          create: fmtDate(stats.birthtimeMs),
          type: path.extname(filedir).toUpperCase().substr(1),
          stats: stats
        })
    }
    if(isDir){
       fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }

});

}



ipcMain.on('synchronous-message', async function(event, arg) {
  await fileDisplay(config.rootpath)
  event.returnValue = filelist;
});


ipcMain.on('openfile', function(event, arg) {
  console.log(event);  // prints "ping"

  exec('start ' + arg , function(err,stdout,stderr){
      if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        console.log(stdout);
    }
  })

  // event.sender.send('asynchronous-reply', 'pong');
})






// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
