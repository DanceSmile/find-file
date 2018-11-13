// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.ipcRenderer = require('electron').ipcRenderer;
window.data = ipcRenderer.send('select', 'init');

class Notify {
    emit(event){
        this.on(event)
    }
    on(event){
        ipcRenderer.send('openfile',event)

    }

}

window.N = new Notify()


