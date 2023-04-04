const{app, BrowserWindow,ipcMain}=require('electron');
const path= require('path')
const mysql = require('mysql2')
const bcrypt=require('bcrypt');
const saltRounds=10;
const { Op } = require("sequelize");
//Conectar squelize para la base de datos
const {Sequelize, DataTypes}=require('sequelize');

//conexion a base de datos
const sequelize=new Sequelize('proyectofinal','root','THE PERFECT',{
    host:'localhost',
    dialect:'mysql'
});

//evaluacion de la conexion correcta
sequelize.authenticate()
.then(()=>{
    console.log('coneccion correcta');
})
.catch((error)=>{
    console.error('Error de conexion',error);
})

//creacion de usuario
const User=sequelize.define('Usuario',{
    //Definicion de atributos del modelo tabla usuario
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
       // allowNull:false si no se coloca
       
    },
    dpi:{
        type: DataTypes.STRING,
    },
    pass:{
        type: DataTypes.STRING
    },
    

},{
    //otras opciones del modelo aqui  timestamps, la ultima vez que modifico si la tabla no lo lleva hay que deshabilitar
    timestamps: false  
});

//creacion de proveedor
const Proveedor=sequelize.define('Proveedor',{
    //Definicion de atributos del modelo tabla usuario
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
       // allowNull:false si no se coloca
       
    },
    idcategoria:{
        type: DataTypes.INTEGER,
    },
},{
    //otras opciones del modelo aqui  timestamps, la ultima vez que modifico si la tabla no lo lleva hay que deshabilitar
    timestamps: false  
});

//creacion de modelo productos
const Producto=sequelize.define('Producto',{
    //Definicion de atributos del modelo tabla producto
    idprod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreproducto:{
        type:DataTypes.STRING

    },
    descripcion:{
        type:DataTypes.STRING
    },
    codcategoria:{
        type:DataTypes.INTEGER
    },
    existencia:{
        type:DataTypes.INTEGER
    },
    precio:{
        type:DataTypes.INTEGER
    }
    

},{
    //otras opciones del modelo aqui  timestamps, la ultima vez que modifico si la tabla no lo lleva hay que deshabilitar
    timestamps: false  
});

//creacion de modelo del pedido
const Pedido=sequelize.define('Pedido',{
    //Definicion de atributos del modelo tabla pedido
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },

    idprod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    codproveedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    cantidad:{
        type: DataTypes.INTEGER
    },
},{
    //otras opciones del modelo aqui  timestamps, la ultima vez que modifico si la tabla no lo lleva hay que deshabilitar
    timestamps: false  
});

//primera ventana de inicio esion
let ventana;

function createWindow(){
    ventana = new BrowserWindow({
        width: 450,
        height: 300,
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
        width: 800,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
    })
    ventana2.loadFile('segundo.html')
    Producto.findAll({
       where:{
        idprod:{
            [Op.gt]: 0,
        }
       }
    })
    
    .then((results)=>{
       console.log(results)
       //console.log(fields)
        ventana2.webContents.on('did-finish-load',()=>{
            ventana2.webContents.send('recibirDatos',results)
        })    
    })
    .catch((err)=>{
        console.log(err)
    })
}

//Creando tercera ventana para comunicacion entre ventanas
let ventana3;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow3(datos){
    ventana3 = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
        parent: ventana2
    })
    ventana3.loadFile('tercero.html')
    ventana3.webContents.on('did-finish-load',()=>{
        ventana3.webContents.send('recibirProducto',
        datos)
    })
}

//Creando tercera ventana para comunicacion entre ventanas
let ventana4;//se deja aca para usarlo despues, antes estaba como const en la funcion de abajo

function createWindow4(datos){
    ventana4 = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences:{//nos permite accede a funciones nod, en este caso para interface de comunicacion
            preload: path.join(app.getAppPath(),'preload.js')
        },
        parent:ventana2
    })
    ventana4.loadFile('cuarto.html')
    ventana4.webContents.on('did-finish-load',()=>{
        ventana4.webContents.send('recibirPedido',datos)
    })
}


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

//definiendo funcion para crear un nuevo usuario y mandarlo a bd recibieno registro desde preload
ipcMain.on('nuevoregistro',function(event, args){
    bcrypt.hash(args[1],saltRounds)
        .then(function(hash){//esta es la forma de trabajar con promesas el bcrypto
           return User.create({
            nombre: args[0],
            pass: hash
           })
        })
        .then((results, fields)=>{
            console.log(results)
            //SI EL RESULTADO EXISTE PEDIREMOS ABRIR VENTANA
                if(results.dataValues.id>0){
                    console.log('Bienvenido')
                }
        })
        .catch((err)=>{
                console.log(err)
                if(err.code=='ER_DUP_ENTRY'){//este es un error de entrada duplicada
                //Enviaremos un error del preload a pantalla 1 antes de abrir la otra
              
                ventana.webContents.send('inicioError','Error autenticando')
        }
    })
});
//Si se valida que usuario y contraseña cumple, se valida su existencia para inicio sesion.
ipcMain.on('registroValido',function(event,args){
    console.log(args)
   // verificacion del registro, usuario y contraseña
    User.findAll({
        where:{
            nombre:args[0]
        }
    })
    .then((results, fields)=>{//con esto indicamos que si existe un registro valido
        console.log(results)
        if(results[0].dataValues.id >0){
            return bcrypt.compare(args[1],results[0]['dataValues']['pass'])
        }
        })
        .then((result)=>{
            if(result){
                    createWindow2()//aca mandamos llamar la segunda ventana, pero despues de estar cargado
                   
                    ventana2.webContents.on('did-finish-load',function(){
                    ventana2.webContents.send('inicioCorrecto','Usuario Actual: '+args[0])
                    ventana.close()
                })//cuando la ventana termine de cargar
            }else{
                console.log('No existe un usuario')//indica que contraseña y usuario no existen y no deja abrir otra ventana
            }
                
    })
        
})


// Actualizacion de registro
ipcMain.on('actualizarRegistro',function(event,args){
    console.log(args)
            Producto.update({
                idprod:args[0],
                nombreproducto: args[1],
                descripcion: args[2],
                codcategoria: args[3],
                existencia: args[4],
                precio:args[5]
            },
            {
                where:{
                    idprod: args[0]
                }
            })
})
//definicion de eliminacion de registro
ipcMain.on('eliminarRegistro',function(event,args){
    console.log(args)
        Producto.destroy({
            where:{
                idprod:args[0]
            }
        })
})

//recibimos datos de lista producto para abrir ventana pedido
ipcMain.on('seleccionarPedido',function(event,args){
    console.log(args)
    Producto.findAll({
        where:{
            codcategoria:args
        }
    })
    .then((results)=>{
        console.log(results)
        createWindow4([args,results])
    })
})


//Recibimos datos de edicion Producto
ipcMain.on('seleccionarElemento',function(event,args){
    console.log(args)
    Producto.findAll({
        where:{
         idprod:args
        }
     })
    .then((results)=>{
        createWindow3([args,results])
    })
})

// Actualizacion de registro
ipcMain.on('guardarpedido',function(event,args){
    console.log(args)
    Pedido.create({
        fecha: Date.now,
        idprod: args[0],
        codproveedor: args[1],
        cantidad:args[2]
       })
})
app.whenReady().then(createWindow)