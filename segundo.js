var res = document.getElementById('respuesta')
var botoneditar= document.getElementById('Editar')
var botonpedido = document.getElementById('Pedido')


//funcion para recibir datos del servidor
window.comunicacion.inicioCorrecto(function(event,args){
    //alert(args)
    res.innerHTML=args
})

botoneditar.addEventListener('click',function(){
    window.comunicacion.registroValido([nombre.value,pass.value]);
})