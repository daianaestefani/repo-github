//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.

//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";   //{"msg":"¡Has comprado con éxito!"}
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";   //un elemento en el carrito
const CART_BUY_TOTAL =  "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //muestra dos items en la lista >> DESAFIATE


var objCarrito = []; //cargo los valores del carrito

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_TOTAL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            objCarrito = resultObj.data.articles;
            mostrarCarrito(); //actualizo la tabla de la factura
        }
    }); //cierro JSON
});

function mostrarCarrito() {
    let adjuntaR = ``;

    let total = 0; //el total a pagar

    if (objCarrito != undefined) {
        for (let e = 0; e < objCarrito.length; e++) {

            let subTotal = parseInt(objCarrito[e].unitCost) * parseInt(objCarrito[e].count);

            total += subTotal;

            adjuntaR += `
                <tr>
                    <th>` + objCarrito[e].src + `</th>
                    <th>` + objCarrito[e].name + `</th>
                    <th>$` + objCarrito[e].unitCost + `</th>
                    <th><input id="idProSelec_` + i + `" class="form-control" type="number" value="` + objCarrito[e].count + `" onChange="modificarProducto(` + e + `, idProdSelec_` + e + `.value)"</></th>
                    <th>` + subTotal + ` ` + objCarrito[e].currency + `</th>
                </tr>
                `;
        }
        document.getElementById('cantProducts').innerHTML = "Contiene " + objCarrito.length + " productos";
        document.getElementById('cantTotal').innerHTML = objCarrito.length;

    }
    else {
        adjuntaR = `
                <tr>
                    <th>El carrito esta vacio.</th>
                </tr>
                `;
        document.getElementById('cantProducts').innerHTML = "Contiene 0 productos";
    }

    document.getElementById('tablaCarrito').innerHTML = adjuntaR;

    document.getElementById("total").innerText = "Total: " + total;
    document.getElementById("subtotal").innerText = "SUBTotal: " + subTotal;
}

function modificarProducto(indice, valorNuevo) {
    if (valorNuevo >= 1) {
        // Cambia a un nuevo valor de producto
        objCarrito[parseInt(indice)].count = valorNuevo;
        // Guarda los elementos seleccionados en la sesion
        sessionStorage.setItem("objCarrito", JSON.stringify(objCarrito));
        // Update Table
        mostrarCarrito();
    }
    else {
        document.getElementById("idProSelec_" + indice).value = 1;
    }
}

function vaciarCarrito() {
    sessionStorage.removeItem("listProducts");
    mostrarCarrito();
}