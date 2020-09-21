

var productinfo = {}; //creo conjunto productInfo para acceder a la informacion de productos...

var coments ={}; //cargar los comentarios

/**/ 

function showImGallery(array){ //funcion, para mostrar las imagenes del producto

    let contenidoHTMLParaAgregar = ""; //creo variable para mostrar el contenido

    let carouselHTML = "";

    for(let i = 0; i < array.length; i++){ //recorro el largo del arreglo
        let fuenteImagen = array[i]; 

        contenidoHTMLParaAgregar += `
        <div class="col-lg-3 col-md-4 col-6"> 
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + fuenteImagen + `" alt="">
            </div>
        </div> `;

        carouselHTML +=`
                <div class="carousel-item` + (i == 0 ?  ` active` : ``) + `">
                <img class="d-block w-100" src="` + fuenteImagen + `">
                </div>
        `;

    }
        document.getElementById("productImages").innerHTML = contenidoHTMLParaAgregar;
        document.getElementById("pImgCarousel").innerHTML = carouselHTML;
    
}//cierro funcion showImagenGallery

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") //caso de obtener el json
        {
            productinfo = resultObj.data;

            let productNameHTML  = document.getElementById("prodName");
            let productMonedaHTML = document.getElementById("productMoneda");
            let productPriceHTML = document.getElementById("productPrice");
            let proDescripHTML = document.getElementById("proDescription");
            let prodCategHTML = document.getElementById("category");
            let soldCountHTML = document.getElementById("soldCount");
        
            productNameHTML.innerHTML = productinfo.name;       //nombre
            productPriceHTML.innerHTML = productinfo.cost;      //precio de costo
            productMonedaHTML.innerHTML = productinfo.currency; //dolar o peso
            proDescripHTML.innerHTML = productinfo.description; //descripcion/comentario
            soldCountHTML.innerHTML = productinfo.soldCount;    //cantidad
            prodCategHTML.innerHTML = productinfo.category;     //categoria          

            showImGallery(productinfo.images);            //Muestro las imagenes en forma de galería            //showImGallery(productinfo.relatedProducts);

           //cargo los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    var showprodrel = resultObj.data;

                    let contenidoHTML = ``;

                    for (let x = 0 ; x < productinfo.relatedProducts.length; x++){

                        let productorelacionado = showprodrel[productinfo.relatedProducts[x]];

                        contenidoHTML += `
                        <a href="products.html" class="list-group-item list-group-item-action col">
                            <div class="col">
                                <img src="` + productorelacionado.imgSrc + `" alt="` + productorelacionado.name + `" class="img-thumbnail" width="300">
                            </div>
                            <div class="col">
                                <div class="col">
                                    <div class="d-flex text-center justify-content-between">
                                        <h5 class="mb-1 style='align-content: center; align-items: center;'"> <b>`+ productorelacionado.name +  `</b></h5>
                                    </div>
            
                                    <div class="d-flex text-center justify-content-between">
                                        <h5 class="text-muted ">` + productorelacionado.currency + ' ' + productorelacionado.cost + ` </h5>
                                    </div>
                                </div>
                            </div>
                        </a>   `;
                document.getElementById("proRelacionados").innerHTML = contenidoHTML;
                            //showRELprod();
                        }//CIERRO  for (let x = 0 ; x < productinfo.relatedProducts.length; x++)
                }//CIERRO  if (resultObj.status === "ok")
            }); //getJSONData(PRODUCTS_URL).then(function(resultObj)

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
                         <p><b>Fecha de publicación:</b>` + " " + coments[a].dateTime + `</p> 
                    </div>
                    <div class=" text-center text-lg-left pt-2">
                        <p><b>Puntaje otorgado:</b>` + estrellaPuntos + `</p>
                    </div>
                    <div class="text-center text-lg-left pt-2">
                        <p><b>Usuario: </b> ` + coments[a].user + `</b></p>
                    </div>
                    <div class=" text-center text-lg-left pt-2">
                        <p><b> Comentario Sobre Producto: </b> </p>
                        <p>` + coments[a].description + ` </p> 
                    </div>
                    <div class=" text-center text-lg-left pt-2">
                        <pre>
+---------------------------------------------------------------------------------------------------------------------+
                    </pre></div>
                        `;
                }
            document.getElementById("comm").innerHTML =comentarioS;
            }//si pudo cargar json
            else{
                    document.getElementById("comm").innerHTML ="Error";
            }
        }); //cierro getJSONData(PRODUCT_INFO_COMMENTS_URL).


    ////////////////////////cargar los productos///////////////////////////////// /** */

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
  };//cierro funcion puntajeTotal

  document.getElementById('puntaje').addEventListener('change',function(){
    puntajeTotal(document.getElementById('puntaje').value);
  });//espero que cambie el valor del select

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++* */
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  function masCero(num){ //para que tanto la fecha como la hora tenga sus valores en decenas 0000-00-00 00:00:00
      if (number<10){
          return "0"+num;
      }return num;
  }
  /******************************************************************************************** */
  /*                                       mostrar hora y fecha actual:                                             */
function comenzarTiempo(){
    fechaCompletaHoy=new Date();
    h=fechaCompletaHoy.getHours();
    m=fechaCompletaHoy.getMinutes();
    s=fechaCompletaHoy.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('reloj').innerHTML=h+":"+m+":"+s;
    t=setTimeout('comenzarTiempo()',500);
}
function checkTime(i){
    if (i<10){
        i="0"+i;
    }
    return i;
}//function checktime

window.onload=function(){ comenzarTiempo(); comenzarFecha();}
function comenzarFecha(){
    fechaCompletaHoy=new Date();
    yyyy=fechaCompletaHoy.getFullYear();
    mm=checkTime(fechaCompletaHoy.getMonth());
    dd=checkTime(fechaCompletaHoy.getDate());
    document.getElementById('datetime').innerHTML=yyyy+"-"+mm+"-"+dd;
}
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
   //funcion para agregar comentario
  //usuario:    --->usuaregistrado
  //textarea-id:--->coment
  //puntuacion: --->calif
/*
var today = new Date;
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours()+":"+today.getMinutes()+":"+today.getSecond();
  function agregarComentario(coment){
      if (coment.trim()!= "")
      { //en el caso de escribir comentario 
            var today = new Date();
            var date = today.getFullYear() + '-' + masCero(today.getMonth()+1) + '-' + masCero(today.getDate());
            var time = masCero(today.getHours()) + ":" masCero(today.getMinutes()) + ":" + masCero(today.getSeconds());

            let nuevoComentario = {};
            nuevoComentario.score = calif;
            nuevoComentario.user = localStorage.getItem("usuario");
            nuevoComentario.dateTime = date + ' ' + time;

            coments.push(nuevoComentario);

            mostrarComentario();
      }//if
      else{
          alert("Debe ingresar un comentario y seleccionar un puntaje");
      }
  }//function agregarComentario */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  function agregarComentario(coment){
    if (coment.trim()!= ""){ //en el caso de escribir comentario
      
      alert( "GRACIAS POR SU COMENTARIO: Nos importa tu opinion sobre nuestro producto");
    }
    else{
        alert("ingrese una puntuacion y escriba un comentario");
    }
}