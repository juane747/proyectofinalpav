var botonguardar = document.getElementById('Guardar')
var idProd = document.getElementById('codprod')
var nombreProd = document.getElementById('nombreprod')
var cantidadProd = document.getElementById('cantidadprod')
var listproveedores = document.getElementById('selectproveedor')
var producto

botonguardar.addEventListener('click', function(){
    window.comunicacion.guardarpedido([idProd.value,listproveedores.value,cantidadProd.value])
})


window.comunicacion.recibirDatos('recibirPedido', function(event,args){
    console.log(args)
    producto = args[0]
    let proveedor = args[3]
    proveedor.forEach(element => {
        console.log(element)
        let opcion = document.createElement('option')
        opcion.setAttribute('value',element['idproveedor'])
        opcion.text = element['nombre']
        listproveedores.add(opcion)
        if(producto['codcategoria'] == element['idproveedor']){
            listproveedores.value = element['idproveedor']
        }
    });
    nombreProd.value = producto['nombre']

})