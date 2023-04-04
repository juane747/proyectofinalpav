// este nos servira para controlar la interface del proyecto
const {ipcRenderer, contextBridge}=require('electron')

contextBridge.exposeInMainWorld(//esto permite obtener estas funciones en el mainword, que es index.js
    'comunicacion',
    {
        registroValido: (datos)=> ipcRenderer.send('registroValido',datos)//aca ejecutamos el metodo y se envia el resultado
        //a main.js
        ,
        inicioCorrecto: (callback)=> ipcRenderer.on('inicioCorrecto',callback)
        ,
        edicion: (datoproducto)=> ipcRenderer.send('edicion',datoproducto)
        ,
        pedido: (datospedido)=> ipcRenderer.send('pedido',datospedido)
        ,
        nuevoregistro: (datosusuario)=> ipcRenderer.send('nuevoregistro',datosusuario)
        ,
        inicioError: (canal, callback) =>ipcRenderer.on('inicioError',callback)
        ,
        recibirDatos: (canal,callback) =>ipcRenderer.on('recibirDatos',callback)
        , 
        seleccionarElemento:(datos) =>ipcRenderer.send('seleccionarElemento',datos)
        ,
        recibirProducto: (canal, callback) =>ipcRenderer.on('recibirProducto',callback)
        ,
        actualizarRegistro: (datos)=> ipcRenderer.send('actualizarRegistro',datos)
        ,
        eliminarRegistro: (datos)=> ipcRenderer.send('eliminarRegistro',datos)
        , 
        seleccionarPedido:(datos) =>ipcRenderer.send('seleccionarPedido',datos)
        ,
        recibirPedido: (canal, callback) =>ipcRenderer.on('recibirPedido',callback)
        ,
        guardarpedido: (datos)=> ipcRenderer.send('guardarpedido',datos)
    }
)