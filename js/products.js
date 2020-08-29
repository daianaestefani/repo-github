/*//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
});
*/ /*ejemplo de valores dentro de JSON
//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
{   "name": "Chevrolet Onix Joy",
    "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
    "cost": 13500,
    "currency": "USD",
    "imgSrc": "img/prod1.jpg",
    "soldCount": 14
},    */

const ORDER_ASC_BY_NAME = "AZ";         //constante para ordenar por nombre ASCENDENTE
const ORDER_DESC_BY_NAME = "ZA";        //constante para ordenar por nombre DESCENDENTE
const ORD_ASC_BY_COST = "PrecioAsc";    //constante para ordenar por Precio ASCENDENTE
const ORD_DESC_BY_COST = "PrecioDesc";  //constante para ordenar por Precio DESCENDENTE
const ORDER_BY_SOLDCOUNT = "Rel";      //constante para ordenar por RELEVANCIA vendidos
var prodsArray = [];                    //array inicialmente vacío
var minCount = undefined;               //copie de categories.js
var maxCount = undefined;               //copie de categories.js
var actualSORTCrit = undefined;         //variable actual,ordende criterio

//////////////////////////////funcion ordenar lista (dependiendo de lo que selecciones)

function sortProductos (opc, array){             //funcion ordenar productos
    let resultado = [];

    if (opc === ORDER_ASC_BY_NAME){
        resultado = array.sort(function(a,b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0; 
        } );
    }//orden por nombre A->Z

    else if (opc === ORD_ASC_BY_COST ){               //cuando elijo la opcion orden$ascendente
        resultado = array.sort(function(a,b) {
            return a.cost-b.cost; 
        } );

    }//orden por costo menor a mayor

    else if (opc === ORD_DESC_BY_COST){          //cuando elijo opcion ordenar$descendente
         resultado = array.sort(function(a,b) {
            return b.cost-a.cost; 
        } );
    }//orden por costo mayor a menor

    else if (opc === ORDER_BY_SOLDCOUNT){       //usando orden de relevancia
        resultado = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }//orden por cantidad_de_vendidos de mayor a menor

    return resultado;
} //function sortProductos (opc, array){


function showProdsList(){       //function showProdsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < prodsArray.length; i++){
        let product = prodsArray[i];

        if ( ( (minCount==undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount) ) &&
             ( (maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount) ) 
           )
        {

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3"> <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail"> </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + ' _ ' + product.currency + ' ' + product.cost+ `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos </small>
                    </div>
                    <small class="text-muted">` + product.description + `</small>
                </div>
            </div>
        </div>        `

    }//busca el elemento en la lista con innertext

    document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}

//funcion ordenar y mostrar productos
function sortShowProductos (sortCriterio, arrayProductos)
 {
    actualSORTCrit = sortCriterio;

    if (arrayProductos != undefined) {
        prodsArray = arrayProductos;
    }
    prodsArray = sortProductos(actualSORTCrit, prodsArray);
    showProdsList();    //Muestro las categorías ordenadas
} //function sortShowProductos (sortCriterio, arrayProductos)


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    /*getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            prodsArray = resultObj.data;
            showProdsList(prodsArray);            //Muestro las categorías ordenadas
            hideSpinner();                      //oculto el spinner    }    });*/
    getJSONData(PRODUCTS_URL).then(function(resultObj){                         //ordenar alfabeticamente
        if (resultObj.status === "ok"){
            sortShowProductos(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){   //ordenar por $ venta ASCENDENTE
        //usando el id del label (sortAsc) que contiene el radiobutton...
        sortShowProductos(ORD_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){ //ordenar por $ venta DESCENDENTE
        //usando el id del label (sortDesc) que contiene el radiobutton...
        sortShowProductos(ORD_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){ //ordenar por $ venta DESCENDENTE
        //usando el id del label (sortDesc) que contiene el radiobutton...
        sortShowProductos(ORDER_BY_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProdsList();
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProdsList();
    });
});