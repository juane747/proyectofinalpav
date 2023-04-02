var formulario=document.getElementById('form-login')
var pass = document.getElementById('password')
var nombre = document.getElementById('nombre-usuario')
var botonnuevo= document.getElementById('nuevo')
var erro=document.getElementById('error')

var expMay = RegExp("[A-Z]")

formulario.addEventListener('submit',function(evento){
    evento.preventDefault()
   
   var error= ""
    if(!pass.value.match(expMay)){
        error+= "Contraseña debe contener letra mayuscula y minuscula "
    } 
    if(error==""){
       // alert(error)
        //aca cuando se produce sin error, se envian nombre y contraseña
        window.comunicacion.registroValido([nombre.value,pass.value]);
        
    }else{
        alert(error)
       
    }

})

//aca definimos las funciones del boton nuevo para eniar datos a main
botonnuevo.addEventListener('click',function(){

    window.comunicacion.nuevoregistro([nombre.value,pass.value])
})

window.comunicacion.inicioError('inicioError',function(event,args){
    error_div.innerText = args
})

window.comunicacion.inicioCorrecto(function(event,args){
    alert(args)
})
