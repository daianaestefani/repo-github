const PRODUCT_INFO_URL          = "http://localhost:4000/product/5678.json"; /*"https://japdevdep.github.io/ecommerce-api/product/5678.json";*/
const PUBLISH_PRODUCT_URL       = "http://localhost:4000/product/publish.json";          /*"https://japdevdep.github.io/ecommerce-api/product/publish.json";*/
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:4000/products/comments";     /*"https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";*/
const PRODUCTS_URL              = "http://localhost:4000/products";              /*"https://japdevdep.github.io/ecommerce-api/product/all.json";*/

const CART_BUY_URL          = "http://localhost:4000/cart/buy.json";                /*"https://japdevdep.github.io/ecommerce-api/cart/buy.json";*/ //cartel, has comprado con exito
const CART_INFO_URL         = "http://localhost:4000/cart/pino";                 /*"https://japdevdep.github.io/ecommerce-api/cart/987.json";*/ //solo carga elemento pino, no lo uso...

const CATEGORIES_URL        = "http://localhost:4000/categories";                /*"https://japdevdep.github.io/ecommerce-api/category/all.json";*/
const CATEGORY_INFO_URL     = "http://localhost:4000/categories/info";           /*"https://japdevdep.github.io/ecommerce-api/category/1234.json";*/

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});