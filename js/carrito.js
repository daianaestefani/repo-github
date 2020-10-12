//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.

//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";   //{"msg":"¡Has comprado con éxito!"}
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";   //un elemento en el carrito
const CART_BUY_TOTAL =  "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //muestra dos items en la lista >> DESAFIATE


var lista=[];
function mostrar(lista){
    var tabla = "<table border =1> <th> Imagen </th><th> Producto </th><th> Cantidad </th><th> Precio por Unidad </th>"; //escribe el encabezado
    for (i=0; i<lista.length; i++){
        tabla+="<tr align='center'><td>" + lista[i].src + lista[i].name + "</td><td>" + lista[i].count + "</td><td>" + lista[i].currency + lista[i].unitCost +"</td></tr>";
    }
    tabla+="</table>";
    document.getElementById('lista').innerHTML=tabla;
}


var contenidoCarrito=[];
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_BUY_TOTAL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        contenidoCarrito = resultObj.data.articles;        //caso de obtener el json
        let contenidoHTML = ``;
        for (let x = 0; x < contenidoCarrito.length; x++) {
            contenidoHTML +=`
                    <div class="row">
                        <div class="col">
                            <img src="` + contenidoCarrito[x].src +`" alt="` + contenidoCarrito[x].name + `" class="img-thumbnail" width="100">
                        </div>
                        <div class="col d-flex text-center justify-content-between">
                            <h5 class="text-muted ">` + contenidoCarrito[x].name + ' ' ` </h5>
                        </div>
                        <div class="col d-flex text-center justify-content-between">
                            <h5 class="text-muted ">` + contenidoCarrito[x].currency + ' ' + contenidoCarrito[x].unitCost + ` </h5>
                        </div>
                        <div class="col d-flex text-center justify-content-between">
                            <h5 class="text-muted ">` + contenidoCarrito[x].count + ` </h5>
                        </div>
                    </div> `;                   
         } //CIERRO  for     
     } //CIERRO  if (resultObj.status === "ok")            
        document.getElementById("contenidoArticulos").innerHTML = contenidoHTML;
  }) //getJSONData(CART_BUY_TOTAL).then(function(resultObj)

});

//borrar todos los productos de la tabla
/*function eliminarProductos() {
    sessionStorage.removeItem("contenidoArticulos");
    showProducts();
}

//borra el producto de esa linea
function quitarProducto(index) {
    contenidoArticulos.splice(index, 1);
    sessionStorage.setItem("listProducts", JSON.stringify(contenidoArticulos));
    showProducts();
}*/
