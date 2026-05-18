const PRODUCT_INFO_URL          = "https://japdevdep.github.io/ecommerce-api/product/5678.json"; /*"http://localhost:4000/product/5678.json"; */
const PUBLISH_PRODUCT_URL       = "https://japdevdep.github.io/ecommerce-api/product/publish.json"; /*"http://localhost:4000/product/publish.json";          */
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json"; /*"http://localhost:4000/products/comments";     */
const PRODUCTS_URL              = "https://japdevdep.github.io/ecommerce-api/product/all.json"; /*"http://localhost:4000/products";              */

const CART_BUY_URL          = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";       /*"http://localhost:4000/cart/buy.json";*/                /**/ //cartel, has comprado con exito
const CART_INFO_URL         = "https://japdevdep.github.io/ecommerce-api/cart/987.json";      /*"http://localhost:4000/cart/pino";       //          */ //solo carga elemento pino, no lo uso...

const CATEGORIES_URL        = "https://japdevdep.github.io/ecommerce-api/category/all.json";  /* "http://localhost:4000/categories";*/
const CATEGORY_INFO_URL     = "https://japdevdep.github.io/ecommerce-api/category/1234.json";/*"http://localhost:4000/categories/info";           */

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
