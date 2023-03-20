var formulario=document.getElementById('form-login')
var pass = document.getElementById('password')
var nombre = document.getElementById('nombre-usuario')


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

