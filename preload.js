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
        recibirDatos: (callback) =>ipcRenderer.on('recibirDatos',callback)
    }
)