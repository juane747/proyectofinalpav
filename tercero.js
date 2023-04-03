var botonguardar= document.getElementById('Guardar')
var botoneliminar = document.getElementById('Eliminar')
var codProd = document.getElementById('codprod')
var nombreProd = document.getElementById('nombreprod')
var detalleProd = document.getElementById('detalleprod')
var categoriaProd = document.getElementById('categoriaprod')
var existenciaProd = document.getElementById('existenciaprod')
var precioProd = document.getElementById('precioprod')
var Producto

botonguardar.addEventListener('click',function(){
   
    window.comunicacion.actualizarRegistro([codProd.value,nombreProd.value,detalleProd.value,categoriaProd.value,existenciaProd.value,precioProd.value])
})

botoneliminar.addEventListener('click',function(){
    alert('registro eliminado')
})

window.comunicacion.recibirProducto('recibirProducto',function(event,args){
    console.log(args[0])
   Producto=args[0].dataValues
   
   codProd.value = Producto['idprod']
   nombreProd.value = Producto['nombreproducto']
   detalleProd.value = Producto['descripcion']
   categoriaProd.value = Producto['codcategoria']
   existenciaProd.value= Producto['existencia']
   precioProd.value= Producto['precio']
   codProd = document.getElementById('codprod').disabled=true
})