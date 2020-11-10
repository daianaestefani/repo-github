//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.

//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";   //{"msg":"¡Has comprado con éxito!"}
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";   //un elemento en el carrito
const CART_BUY_TOTAL =  "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //muestra dos items en la lista >> DESAFIATE

let UY_SYMBOL = "$";
let porcentage = 0.05;

var miCarrito = []; //array que uso para cargar los valores del carrito

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_TOTAL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            miCarrito = resultObj.data.articles;
            mostrarCarrito(); //actualizo la tabla de la factura
            document.getElementById("cantSeleccionados").innerHTML=miCarrito.length;
        }

    }); //cierro JSON
    document.getElementById("idpremium").addEventListener("change", function(){
        porcentage = 0.15;
        actualizarCostsTotal();
    });
    document.getElementById("idexpress").addEventListener("change", function(){
        porcentage = 0.07;
        actualizarCostsTotal();
    });
    document.getElementById("idstandard").addEventListener("change", function(){
        porcentage = 0.05;
        actualizarCostsTotal();
    });
});

function mostrarCarrito() {
    let cargarmostrar = ``;

    let total = 0;
    var monedaDolar=0;
    var monedaUY = 0;
    let subTotal = 0;
    let subT = 0;


    if (miCarrito != undefined) {
        for (let i = 0; i < miCarrito.length; i++) {

            if (miCarrito[i].currency === "UYU"){ 
                monedaDolar = miCarrito[i].unitCost / 40;//convierto el valor de los productos a dolares
                monedaUY = miCarrito[i].unitCost;       //convierto el valor de los productos a pesos uruguayos
            }
            else{
                monedaDolar = miCarrito[i].unitCost;
                monedaUY = miCarrito[i].unitCost * 40;
            }

            subTotal = monedaUY * parseInt(miCarrito[i].count);
            subT += subTotal;
            total += subTotal;

            cargarmostrar += `
                <tr>
                    <th> <img src="` + miCarrito[i].src + `" alt="` + miCarrito[i].name + `" class="img-thumbnail" width="100"> </th>                   
                    <th>` + miCarrito[i].name + `</th>
                    <th>`+ 'USD' + " " + monedaDolar + ' ~ ' + 'UYU' + " " + monedaUY + `</th>
                    <th><input id="idinput_` + i + `" class="form-control" type="number" min="0" value="`+ miCarrito[i].count +`" onChange="modificarProducto(` + i + `, idinput_` + i + `.value)"</></th>
                    <th>` + subTotal + ` ` + " - UYU " + `</th>
                    <td class="text-right"><button id="btnsupr" class="btn btn-sm btn-danger" onclick="quitarProducto(`+i+`);"><i class="fa fa-trash"></i> </button> </td>
                </tr>
                `;
        }
        document.getElementById('cantSeleccionados').innerHTML = miCarrito.length;
        document.getElementById('cantSelec').innerHTML = miCarrito.length; //en la pagina de carrito, muestro la cantidad de productos seleccionados
    }
    else {
        cargarmostrar = `
                <tr>
                    <th>El carrito esta vacio.</th>
                </tr>
                `;
        document.getElementById('cantSeleccionados').innerHTML = miCarrito.length;
        document.getElementById('cantSelec').innerHTML = miCarrito.length; //en la pagina de carrito, muestro la cantidad de productos seleccionados
    }
    document.getElementById('tableList').innerHTML = cargarmostrar;

    document.getElementById("stotal").innerText = "Total: UYU $ " +  subT;  //final de la tabla mmuestra un subtotal, faltando ecalcular el costo de envio
    document.getElementById("costototal").innerText = " " + total;
    document.getElementById("subTotalsinEnvio").innerText = " " + subT;

    productCost = subT;
    actualizarCostsTotal();
}//funcion mostrarcarrito()

let productCost = 0;

function actualizarCostsTotal(){
    let subProductCostHTML = document.getElementById("subTotalsinEnvio");//Subtotal
    let porcentajeEnvioHTML = document.getElementById("costoEnvio");//Costo de envío
    let totalCostHTML = document.getElementById("costototal"); //Costo Total  (subTotal+ costoEnvio)

    let showCostSB = UY_SYMBOL + productCost; //muestro costo subtotal
    let showPorcentaje = Math.round((porcentage * productCost));
    let showTotalapagar = UY_SYMBOL + (showPorcentaje + productCost);

    subProductCostHTML.innerHTML = showCostSB;
    porcentajeEnvioHTML.innerHTML = showPorcentaje;
    totalCostHTML.innerHTML = showTotalapagar;
}

function modificarProducto(indice, nuevoValor) {
    if (nuevoValor >= 1) {

        miCarrito[parseInt(indice)].count = nuevoValor; //agrega nuevo valor

        sessionStorage.setItem("miCarrito", JSON.stringify(miCarrito));

        mostrarCarrito(); //actualizalatabla
    }
    else {
        document.getElementById("idinput_" + indice).value = 1;
    }
}

function quitarProducto(lugar) {
    miCarrito.splice(lugar,1);
    mostrarCarrito(miCarrito);
}
function vaciarCarrito() {
    //miCarrito.removeItem("tableList")
    sessionStorage.removeItem("tableList");
    mostrarCarrito();
}

//verificar que se escriba en todos los campos
/*  //Se obtiene el formulario de publicación de producto
    var cartForm = document.getElementById("cart-info");*/

//lanzado por el formulario cuando se seleccione 'PAGAR'.
    document.getElementById('validar').addEventListener("click",function(){

        var calleInput = document.getElementById("calle");

        var esquinaInput = document.getElementById("esquina");

        var dnumero = document.getElementById("dnumero");

        //Quito las clases que marcan como inválidos
        calleInput.classList.remove('is-invalid');
        esquinaInput.classList.remove('is-invalid');
        dnumero.classList.remove('is-invalid');

        //Quito las clases que marcan como válidos
        calleInput.classList.remove('is-valid');
        esquinaInput.classList.remove('is-valid');
        dnumero.classList.remove('is-valid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado la calle, numero de puerta y esquina.

        //Consulto por la calle en la direcion
        if (calleInput.value === ""){
            calleInput.classList.add('is-invalid');
        }else{
            calleInput.classList.add('is-valid');
        }
        //Consulto por la esquina en la direccion
        if (esquinaInput.value === ""){
            esquinaInput.classList.add('is-invalid');
        }else{
            esquinaInput.classList.add('is-valid');
        }
        //Consulto por el número de puerta en la direccion
        if (dnumero.value <=0){
            dnumero.classList.add('is-invalid');
        }else{
            dnumero.classList.add('is-valid');
        }

    });

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    //   funcion para habilitar/deshabilitar segun la forma de pago seleccionada   //
    var nrot = document.getElementById('nroTarjeta');
    var cseg = document.getElementById('codSeguridad'); 
    var vtot = document.getElementById('vto'); 
    var ncuenta = document.getElementById('nroCuenta');

    function deshabilitar(){
        if (!document.getElementById('radiotarjeta').disable)
        {
            document.getElementById('radiotarjeta').disable=true;
            nrot.readOnly =false;
            cseg.readOnly =false;
            vtot.readOnly=false;

            document.getElementById('radiotransferencia').disable=false;
            ncuenta.readOnly=true;
        }
        else{
            document.getElementById('radiotarjeta').disable=false;
            nrot.readOnly =true;
            cseg.readOnly =true;
            vtot.readOnly=true;
            
            document.getElementById('radiotransferencia').disable=true;
            ncuenta.readOnly=false;
        }
    }