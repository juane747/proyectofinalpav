const {app, BrowserWindow, ipcMain}=require('electron');

const path= require('path')

let ventana;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow(){
    ventana = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
    })
    ventana.loadFile('index.html')
}

//Creando segunda ventana para comunicacion entre ventanas
let ventana2;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow2(){
    ventana2 = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
    })
    ventana2.loadFile('segundo.html')
}

//Creando tercera ventana para comunicacion entre ventanas
let ventana3;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow3(){
    ventana3 = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
    })
    ventana3.loadFile('tercero.html')
}

//Creando tercera ventana para comunicacion entre ventanas
let ventana4;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow4(){
    ventana4 = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
    })
    ventana4.loadFile('cuarto.html')
}

ipcMain.on('registroValido',function(event,args){//aca se reciben los datos de preload y se ejecuta metodo seleccionado
    console.log(args)
    createWindow2()//aca mandamos llamar la segunda ventana, pero despues de estar cargado
    ventana2.webContents.on('did-finish-load',function(){
        ventana2.webContents.send('inicioCorrecto','Usuario Actual: '+args[0])//recibir datos
    })//cuando la ventana termine de cargar
        
})

ipcMain.on('edicion',function(event,args){//aca se reciben los datos de preload y se ejecuta metodo seleccionado
    console.log(args)
    createWindow3()//aca mandamos llamar la segunda ventana, pero despues de estar cargado
    ventana3.webContents.on('did-finish-load',function(){
        ventana3.webContents.send('inicioCorrecto','')
    })//cuando la ventana termine de cargar
        
})

ipcMain.on('pedido',function(event,args){//aca se reciben los datos de preload y se ejecuta metodo seleccionado
    console.log(args)
    createWindow4()//aca mandamos llamar la segunda ventana, pero despues de estar cargado
    ventana4.webContents.on('did-finish-load',function(){
        ventana4.webContents.send('inicioCorrecto','hola')
    })//cuando la ventana termine de cargar
        
})
app.whenReady().then(createWindow)