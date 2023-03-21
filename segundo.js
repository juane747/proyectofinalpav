var res = document.getElementById('mensaje')
var botoneditar= document.getElementById('Editar')
var botonpedido = document.getElementById('Pedido')
var tablaResultados=document.getElementById('TablaProductos')

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

