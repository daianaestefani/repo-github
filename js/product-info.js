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

    // CARGAR IMÁGENES ILUSTRATIVAS
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

    // CARGAR PRODUCTOS RELACIONADOS (Aislado para que no choque con nada)
    let relacionadosHTML = "";
    if (productData.relatedProducts && productData.relatedProducts.length > 0) {
        productData.relatedProducts.forEach(rel => {
            relacionadosHTML += `
            <div class="col-lg-3 col-md-4 col-6 mb-3" style="cursor: pointer;" onclick="localStorage.setItem('prodID', ${rel.id}); window.location='product-info.html'">
                <div class="card h-100 shadow-sm custom-card">
                    <img class="img-fluid card-img-top" src="${rel.image}" alt="${rel.name}">
                    <div class="card-body p-2">
                        <p class="card-text font-weight-bold text-center small mb-0">${rel.name}</p>
                    </div>
                </div>
            </div>`;
        });
        
        let contenedorRelacionados = document.getElementById("proRelacionados");
        if (contenedorRelacionados) {
            contenedorRelacionados.innerHTML = relacionadosHTML;
        }
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

// 2. FUNCIÓN PARA DIBUJAR LOS COMENTARIOS REALES (En formato de lista vertical limpia)
function showComments(commentsArray) {
    let htmlContentToAppend = "";
    
    commentsArray.forEach(comment => {
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.score) {
                estrellas += `<span class="fa fa-star checked" style="color: orange;"></span>`;
            } else {
                estrellas += `<span class="fa fa-star" style="color: grey;"></span>`;
            }
        }

        // Usamos una estructura de bloque completo (w-100) para obligar a que vayan uno abajo del otro
        htmlContentToAppend += `
        <div class="w-100 list-group-item list-group-item-action mb-3 p-3 shadow-sm style="display: block; clear: both;">
            <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                <h6 class="mb-0"><strong>${comment.user}</strong></h6>
                <small class="text-muted">${comment.dateTime}</small>
            </div>
            <p class="mb-2 text-secondary small">${comment.description}</p>
            <div>${estrellas}</div>
        </div>`;
    });

    let contenedorComentarios = document.getElementById("productComments");
    if (contenedorComentarios) {
        contenedorComentarios.innerHTML = htmlContentToAppend;
    }
}

// 3. EVENTO PRINCIPAL: INDEPENDIENTE PARA CADA LLAMADA
document.addEventListener("DOMContentLoaded", function(e) {
    // Pedir información del producto
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfo = resultObj.data;
            showProductInfo(currentProductInfo);
        }
    });

    // Pedir comentarios por separado para que si uno falla, el otro funcione igual
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentComments = resultObj.data;
            showComments(currentComments);
        }
    });
});
