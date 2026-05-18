let currentProductInfo = {};
let currentComments = [];

// 1. FUNCIÓN PARA MOSTRAR LA INFORMACIÓN PRINCIPAL Y EL BOTÓN VERDE
function showProductInfo(productData) {
    let nameHTML = document.getElementById("productName");
    let priceHTML = document.getElementById("productPrice");
    let currencyHTML = document.getElementById("productMoneda");
    let descriptionHTML = document.getElementById("proDescripHTML") || document.getElementById("proDescription");
    let soldHTML = document.getElementById("soldCount");
    let categoryHTML = document.getElementById("prodCateg");

    if (nameHTML) nameHTML.innerHTML = productData.name;
    if (priceHTML) priceHTML.innerHTML = productData.cost;
    if (currencyHTML) currencyHTML.innerHTML = productData.currency;
    if (soldHTML) soldHTML.innerHTML = productData.soldCount;
    if (categoryHTML) categoryHTML.innerHTML = productData.category;
    
    if (descriptionHTML) {
        descriptionHTML.innerHTML = productData.description + `
            <br><br>
            <button id="btn-agregar-carrito" class="btn btn-success btn-lg mt-3">
                <i class="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
        `;
    }

    // CARGAR IMÁGENES
    let imagenesHTML = "";
    let carouselHTML = "";
    if (productData.images && productData.images.length > 0) {
        productData.images.forEach((imgSrc, index) => {
            imagenesHTML += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${imgSrc}" alt="">
                </div>
            </div>`;
            let activeClass = index === 0 ? "active" : "";
            carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${imgSrc}" class="d-block w-100" alt="...">
            </div>`;
        });
        let contenedorImagenes = document.getElementById("productImages");
        let contenedorCarrusel = document.getElementById("pImgCarousel");
        if (contenedorImagenes) contenedorImagenes.innerHTML = imagenesHTML;
        if (contenedorCarrusel) contenedorCarrusel.innerHTML = carouselHTML;
    }

    // CARGAR PRODUCTOS RELACIONADOS
    let relacionadosHTML = "";
    if (productData.relatedProducts && productData.relatedProducts.length > 0) {
        productData.relatedProducts.forEach(rel => {
            relacionadosHTML += `
            <div class="col-lg-3 col-md-4 col-6" style="cursor: pointer;" onclick="setProductID(${rel.id})">
                <div class="card mb-4 shadow-sm custom-card">
                    <img class="img-fluid img-thumbnail" src="${rel.image}" alt="${rel.name}">
                    <div class="card-body">
                        <p class="card-text font-weight-bold text-center">${rel.name}</p>
                    </div>
                </div>
            </div>`;
        });
        let contenedorRelacionados = document.getElementById("relatedProducts") || document.querySelector(".related-products-container");
        if (contenedorRelacionados) contenedorRelacionados.innerHTML = relacionadosHTML;
    }

    // ACCIÓN DEL BOTÓN VERDE
    let botonCarrito = document.getElementById("btn-agregar-carrito");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", function() {
            let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];
            let nuevoProducto = {
                id: productData.id || 1,
                name: productData.name,
                count: 1,
                unitCurrency: productData.currency,
                src: productData.images && productData.images[0] ? productData.images[0] : "",
                unitCost: productData.cost
            };
            let existe = carrito.find(item => item.name === nuevoProducto.name);
            if (existe) { existe.count++; } else { carrito.push(nuevoProducto); }
            localStorage.setItem("carritoCompras", JSON.stringify(carrito));
            alert("¡" + productData.name + " agregado al carrito con éxito!");
        });
    }
}

// 2. FUNCIÓN PARA DIBUJAR LOS COMENTARIOS Y LAS ESTRELLAS
function showComments(commentsArray) {
    let htmlContentToAppend = "";
    
    commentsArray.forEach(comment => {
        let estrellas = "";
        // Armamos las 5 estrellas (pintadas según el puntaje)
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.score) {
                estrellas += `<span class="fa fa-star checked" style="color: orange;"></span>`;
            } else {
                estrellas += `<span class="fa fa-star" style="color: grey;"></span>`;
            }
        }

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><strong>${comment.user}</strong></h5>
                <small class="text-muted">${comment.dateTime}</small>
            </div>
            <p class="mb-1">${comment.description}</p>
            <div class="mb-1">${estrellas}</div>
        </div>`;
    });

    // Revisa si en tu HTML el contenedor de comentarios se llama "productComments"
    let contenedorComentarios = document.getElementById("productComments") || document.getElementById("comentarios");
    if (contenedorComentarios) {
        contenedorComentarios.innerHTML = htmlContentToAppend;
    }
}

// 3. EVENTO PRINCIPAL: LLAMA AL PRODUCTO Y A SUS COMENTARIOS
document.addEventListener("DOMContentLoaded", function(e) {
    // Pedimos la info del producto
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfo = resultObj.data;
            showProductInfo(currentProductInfo);
        }
    });

    // Pedimos los comentarios del producto
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentComments = resultObj.data;
            showComments(currentComments);
        }
    });
});
