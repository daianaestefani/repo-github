/*//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
});*/
/*ejemplo de valores dentro de JSON
//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
{   "name": "Chevrolet Onix Joy",
    "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
    "cost": 13500,
    "currency": "USD",
    "imgSrc": "img/prod1.jpg",
    "soldCount": 14
},    */
var prodsArray = [];

function showProdsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + ' _ ' + product.currency + ' ' + product.cost+ `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos </small>
                    </div>
                    <small class="text-muted">` + product.description + `</small>
                </div>
            </div>
        </div>
        `;

    }//busca el elemento en la lista con innertext
    document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;    
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProdsList(prodsArray);
            hideSpinner();
        }
    });
});
