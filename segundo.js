var res = document.getElementById('mensaje')
var botoneditar= document.getElementById('Editar')
var botonpedido = document.getElementById('Pedido')
var tablaResultados=document.getElementById('TablaProductos')
var productos;
//funcion para recibir datos del servidor
window.comunicacion.inicioCorrecto(function(event,args){
    //Mostramos datos del usuario actual, recibido del main
    res.innerHTML=args
})
botoneditar.addEventListener('click',function(){
    window.comunicacion.edicion();
})
botonpedido.addEventListener('click',function(){
    window.comunicacion.pedido();
})
window.comunicacion.recibirDatos(function(event,args){
    console.log(args)
     productos = args;
   
    for(let i = 0; i<args.length;i++){
        let idProd = args[i]['idprod']
        let Nombre = args[i]['nombreproducto']
        let Descripcion = args[i]['descripcion']
        let codCate = args[i]['codcategoria']
        let Existencia= args[i]['existencia']
        let Precio = args[i]['precio']
        
        let boton = document.createElement('button')
        boton.setAttribute('value',idProd)
        boton.innerText = 'Editar'
        boton.addEventListener('click', editarElemento)

        let boton2 = document.createElement('button')
        boton2.setAttribute('value',idProd)
        boton2.innerText = 'Pedir'
        boton2.addEventListener('click', realizarpedido)

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
        celdaBoton2.appendChild(boton)
        let fila = document.createElement('tr')
        
        fila.appendChild(celdaNombre)
        fila.appendChild(celdaDescripcion)
        fila.appendChild(celdaCategoria)
        fila.appendChild(celdaExistencia)
        fila.appendChild(celdaPrecio)

        tablaResultados.appendChild(fila)

    }
})

 