var res = document.getElementById('mensaje')
var tablaResultados=document.getElementById('TablaProductos')
let Productos;
//funcion para recibir datos del servidor
window.comunicacion.inicioCorrecto(function(event,args){
    //Mostramos datos del usuario actual, recibido del main
    res.innerHTML=args
    
})


window.comunicacion.recibirDatos('recibirDatos',function(event,args){
    Productos=args;
    console.log(args)
 
     for(let i =0; i<args.length;i++){
         
     var objeto=args[i].dataValues
    let idProd = objeto['idprod']
    let Nombre = objeto['nombreproducto']
    let Descripcion = objeto['descripcion']
    let codCate = objeto['codcategoria']
    let Existencia= objeto['existencia']
    let Precio = objeto['precio']
    
    let boton = document.createElement('button')
    boton.setAttribute('value',idProd)
    boton.innerText = 'Editar'
    boton.addEventListener('click', editarElemento)

    let boton2 = document.createElement('button')
    boton2.setAttribute('value',idProd)
    boton2.innerText = 'Pedir'
    boton2.addEventListener('click', realizarpedido)
    
    let celdaId=document.createElement('td')
    celdaId.innerHTML=idProd

    let celdaNombre = document.createElement('td')
    celdaNombre.innerText = Nombre

    let celdaDescripcion = document.createElement('td')
    celdaDescripcion.innerText = Descripcion
    
    let celdaCategoria = document.createElement('td')
    celdaCategoria.innerText = codCate

    let celdaExistencia = document.createElement('td')
    celdaExistencia.innerText = Existencia

    let celdaPrecio = document.createElement('td')
    celdaPrecio.innerText = Precio

    let celdaBoton = document.createElement('td')
    celdaBoton.appendChild(boton)

    let celdaBoton2 = document.createElement('td')
    celdaBoton2.appendChild(boton2)
    let fila = document.createElement('tr')
    
    fila.appendChild(celdaId)
    fila.appendChild(celdaNombre)
    fila.appendChild(celdaDescripcion)
    fila.appendChild(celdaCategoria)
    fila.appendChild(celdaExistencia)
    fila.appendChild(celdaPrecio)
    fila.appendChild(celdaBoton)
    fila.appendChild(celdaBoton2)

    tablaResultados.appendChild(fila)

     }
})
 

function realizarpedido(){

}

function editarElemento(event){
    console.log(event.target.value)
    window.comunicacion.seleccionarElemento(Productos[event.target.value - 1])
}