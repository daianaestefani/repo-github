let productInfo = {};

// Función que muestra la información del producto y agrega el botón
function showProductInfo(productInfo) {
    let productNameHTML  = document.getElementById("productName");
    let productPriceHTML = document.getElementById("productPrice");
    let productMonedaHTML = document.getElementById("productMoneda");
    let proDescripHTML   = document.getElementById("proDescripHTML");
    let soldCountHTML    = document.getElementById("soldCount");
    let prodCategHTML    = document.getElementById("prodCateg");

    // Cargamos tus datos originales en las etiquetas
    if (productNameHTML) productNameHTML.innerHTML = productInfo.name;
    if (productPriceHTML) productPriceHTML.innerHTML = productInfo.cost;
    if (productMonedaHTML) productMonedaHTML.innerHTML = productInfo.currency;
    if (proDescripHTML) proDescripHTML.innerHTML = productInfo.description;
    if (soldCountHTML) soldCountHTML.innerHTML = productInfo.soldCount;
    if (prodCategHTML) prodCategHTML.innerHTML = productInfo.category;

    // --- AQUÍ SE INYECTA EL BOTÓN VERDE ---
    if (proDescripHTML) {
        proDescripHTML.innerHTML += `
            <br><br>
            <button id="btn-agregar-carrito" class="btn btn-success btn-lg mt-3">
                <i class="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
        `;
    }

    // --- CÓDIGO DE LAS IMÁGENES ORIGINALES ---
    let contenidoHTMLParaAgregar = "";
    let carouselHTML = "";

    if (productInfo.images && productInfo.images.length > 0) {
        productInfo.images.forEach((imageSrc, index) => {
            // Imágenes ilustrativas de abajo
            contenidoHTMLParaAgregar += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${imageSrc}" alt="">
                </div>
            </div>
            `;

            // Imágenes del Carrusel
            let activeClass = index === 0 ? "active" : "";
            carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${imageSrc}" class="d-block w-100" alt="...">
            </div>
            `;
        });

        let prodImagesCont = document.getElementById("productImages");
        let pImgCarouselCont = document.getElementById("pImgCarousel");
        
        if (prodImagesCont) prodImagesCont.innerHTML = contenidoHTMLParaAgregar;
        if (pImgCarouselCont) pImgCarouselCont.innerHTML = carouselHTML;
    }

    // --- LÓGICA DEL CLIC DEL BOTÓN ---
    let botonCarrito = document.getElementById("btn-agregar-carrito");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", function() {
            let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];
            
            let productoParaAgregar = {
                id: productInfo.id || 1,
                name: productInfo.name,
                count: 1,
                unitCurrency: productInfo.currency,
                src: productInfo.images && productInfo.images[0] ? productInfo.images[0] : "",
                unitCost: productInfo.cost
            };
            
            let existe = carrito.find(item => item.name === productoParaAgregar.name);
            if (existe) {
                existe.count++;
            } else {
                carrito.push(productoParaAgregar);
            }
            
            localStorage.setItem("carritoCompras", JSON.stringify(carrito));
            alert("¡" + productInfo.name + " agregado al carrito con éxito!");
        });
    }
}

// Se ejecuta cuando carga la página y llama a la API de JAP
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
        }
    });
});