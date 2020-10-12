//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.

//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";   //{"msg":"¡Has comprado con éxito!"}
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";   //un elemento en el carrito
const CART_BUY_TOTAL =  "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //muestra dos items en la lista >> DESAFIATE

let MONEY_SYMBOL = "$";
let porcentage = 0.05;

var miCarrito = []; //array que uso para cargar los valores del carrito

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_TOTAL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            miCarrito = resultObj.data.articles;
            mostrarCarrito(); //actualizo la tabla de la factura
        }
    }); //cierro JSON

    document.getElementById("idpremium").addEventListener("change", function(){
        porcentage = 0.15;
        updateTotalCosts();
    });
    document.getElementById("idexpress").addEventListener("change", function(){
        porcentage = 0.07;
        updateTotalCosts();
    });
    document.getElementById("idstandard").addEventListener("change", function(){
        porcentage = 0.05;
        updateTotalCosts();
    });
});
function mostrarCarrito() {
    let cargarmostrar = ``;

    let total = 0;
    let subtotalcarro = 0;

    if (miCarrito != undefined) {
        for (let i = 0; i < miCarrito.length; i++) {

            let subTotal = parseInt(miCarrito[i].unitCost) * parseInt(miCarrito[i].count);
            total += subTotal;
            subtotalcarro += subTotal;

           // let costoEnvio = subtotalcarro * tipoenvio.checked

            cargarmostrar += `
                <tr>
                    <th> <img src="` + miCarrito[i].src + `" alt="` + miCarrito[i].name + `" class="img-thumbnail" width="100"> </th>                   
                    <th>` + miCarrito[i].name + `</th>
                    <th>$` + miCarrito[i].unitCost + `</th>
                    <th><input id="prod_` + i + `" class="form-control" type="number" min="0" value="` + miCarrito[i].count + `" onChange="modificarProducto(` + i + `, prod_` + i + `.value)"</></th>
                    <th>` + subTotal + ` ` + miCarrito[i].currency + `</th>
                </tr>
                `;
        }
        document.getElementById('cantSeleccionados').innerHTML = miCarrito.length ;
        document.getElementById('cantSelec').innerHTML = miCarrito.length ;
    }
    else {
        cargarmostrar = `
                <tr>
                    <th>El carrito esta vacio.</th>
                </tr>
                `;
        document.getElementById('cantSeleccionados').innerHTML = "Contiene 0 productos";
        document.getElementById('cantSelec').innerHTML = "Contiene 0 productos";
    }

    document.getElementById('tableList').innerHTML = cargarmostrar;

    document.getElementById("total").innerText = "Total: " + total;
    document.getElementById("costototal").innerText = " " + total;
    document.getElementById("subTotal").innerText = " " + subtotalcarro;
}

function updateTotalCosts(){    //Función que se utiliza para actualizar los costos de publicación
    document.getElementById("subTotal").innerHTML = MONEY_SYMBOL + subtotalcarro;
    document.getElementById("costoEnvio").innerHTML = Math.round((porcentage * 100)) + PERCENTAGE_SYMBOL;
    document.getElementById("costototal").innerHTML = MONEY_SYMBOL + (Math.round(subtotalcarro + (porcentage * 100)) / 100);
}

function modificarProducto(indice, nuevoValor) {
    if (nuevoValor >= 1) {

        miCarrito[parseInt(indice)].count = nuevoValor; //agrega nuevo valor

        sessionStorage.setItem("miCarrito", JSON.stringify(miCarrito));

        mostrarCarrito(); //actualizalatabla
    }
    else {
        document.getElementById("prod_" + indice).value = 1;
    }
}

function vaciarCarrito() {
    sessionStorage.removeItem("listProducts");
    mostrarCarrito();
}

