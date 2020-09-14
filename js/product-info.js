

var productinfo = {}; //creo conjunto productInfo para acceder a la informacion de productos...

var coments ={}; //cargar los comentarios

/**/ 

function showImGallery(array){ //funcion, para mostrar las imagenes del producto

    let contenidoHTMLParaAgregar = ""; //creo variable para mostrar el contenido

    for(let i = 0; i < array.length; i++){ //recorro el largo del arreglo
        let fuenteImagen = array[i]; 

        contenidoHTMLParaAgregar += `
        <div class="col-lg-3 col-md-4 col-6"> 
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + fuenteImagen + `" alt="">
            </div>
        </div> `
        document.getElementById("productImages").innerHTML = contenidoHTMLParaAgregar;
        //document.getElementById("relatedProducts").innerHTML = contenidoHTMLParaAgregar; 
    }
}//cierro funcion showImagenGallery


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") //caso de obtener el json
        {
            productinfo = resultObj.data;

           let productNameHTML  = document.getElementById("prodName");

          let productPriceHTML = document.getElementById("productPrice");
          let productMonedaHTML = document.getElementById("productMoneda");
        ``
            let proDescripHTML = document.getElementById("proDescription");

            let soldCountHTML = document.getElementById("soldCount");
          
            let prodCategHTML = document.getElementById("category");
        
            productNameHTML.innerHTML = productinfo.name;       //nombre
            productPriceHTML.innerHTML = productinfo.cost;      //precio de costo
            productMonedaHTML.innerHTML = productinfo.currency;
            proDescripHTML.innerHTML = productinfo.description; //descripcion/comentario
            soldCountHTML.innerHTML = productinfo.soldCount;    //cantidad
            prodCategHTML.innerHTML = productinfo.category;     //categoria

            //Muestro las imagenes en forma de galería
            showImGallery(productinfo.images);
            //showImGallery(productinfo.relatedProducts);

          }// if (resultObj.status === "ok")
        });//getJSONData(PRODUCT_INFO_URL).then(function(resultObj)


        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){ 
             if (resultObj.status === "ok")
            {
                coments = resultObj.data;

                var comentarioS ='';

                for (a = 0; a < coments.length; a++){

                    var estrellaPuntos = '';
                    for (valor = 1; valor <= 5; valor++)
                    {
                         if (valor <= coments[a].score){
                             estrellaPuntos += `<span class="fa fa-star checked"></span>`; /*puntaje seleccionado en ESTRELLAS*/
                        }
                        else{
                            estrellaPuntos += `<span class="fa fa-star"></span>`; /*resto de estrellas*/
                        }

                    }
                    comentarioS += `

                    <div class=" text-center text-lg-left pt-2">
                        <p><b>Puntaje otorgado:</b>` + estrellaPuntos + `</p>
                    </div>

                    <div class="text-center text-lg-left pt-2">
                        <p><b>Usuario: </b> ` + coments[a].user + `</b></p>
                    </div>

                    <div class="text-center text-lg-left pt-2">
                        <b>Comentario Sobre Producto:</b> 
                        <small><p>` + coments[a].description + ` </p></small>     
                    
                    </div>
                    <div class=" text-center text-lg-left pt-2">
                        <pre>
+----------------------------------------------------------------------------------------------------------------------------------------+
                    </pre></div>
                        `
                }
            document.getElementById("comm").innerHTML =comentarioS;
            }//si pudo cargar json
            else{
                    document.getElementById("comm").innerHTML ="Error";
            }
        }); //cierro getJSONData(PRODUCT_INFO_COMMENTS_URL).



}); //cierro DOMContentLoaded   

  /******************************************************************************************** */
/******************************************************************************************** */
function puntajeTotal (pts){ //dependiendo de los puntos seleccionados
    var estrellitas = '';
    for (let a = 1; a <= 5; a++)
    {
        if (a <= pts)
        {     estrellitas += '<i class="fas fa-star checked"></i>';  } //icono de estrerllas pintado
        else{ estrellitas += '<i class="far fa-star nothing"></i>';  } //icono de estrellitas solo contorno
    }//cierro for
  
    document.getElementById('calif').innerHTML=estrellitas; 
  };//cierro funcion
  
  document.getElementById('puntaje').addEventListener('change',function(){
    puntajeTotal(document.getElementById('puntaje').value);
  });//espero que cambie el valor del select
  /******************************************************************************************** */

  //funcion para agregar comentario
  ///
  //usuario:    usuaregistrado
  //
  //textarea-id: coment
  //
  //puntuacion: calif
  //
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++* */
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*var today = newDate;
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours()+":"+today.getMinutes()+":"+today.getSecond();*/
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  //const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
/**
 * products_url[1]= * {
        "name": "Fiat Way",
        "description": "La versión de Fiat que brinda confort y a un precio accesible.",
        "cost": 14500,
        "currency": "USD",
        "imgSrc": "img/prod2.jpg",
        "soldCount": 52
    },
 * products_url[3]= * {
        "name": "Peugeot 208",
        "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
        "cost": 15200,
        "currency": "USD",
        "imgSrc": "img/prod4.jpg",
        "soldCount": 17
    } 
 *//*
  getJSONData(PRODUCTS_URL).then(function(resultObj) {
      if (resultObj.status === "ok"){
          prodRelacionado = resultObj.data;

          showImGallery(prodRelacionado.imgSrc);

          let prorelNameHTML  = document.getElementById("prodNameRel");
          let proRelmonedaHTML  = document.getElementById("prodRMoneda");
          let proRelprecioHTML  = document.getElementById("prodRPrecio");
          
          prorelNameHTML.innerHTML=prodRelacionado.name;
          proRelmonedaHTML.innerHTML=prodRelacionado.currency;
          proRelprecioHTML.innerHTML=prodRelacionado.cost; 
      }
  });          */

  