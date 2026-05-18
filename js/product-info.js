let currentProductInfo = {};
let currentComments = [];

// 1. FUNCIÓN PARA MOSTRAR LA INFORMACIÓN PRINCIPAL Y PRODUCTOS RELACIONADOS
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
    if (productData.images && productData.images.length > 0) {
        let imagenesHTML = "";
        let carouselHTML = "";
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
    if (productData.relatedProducts && productData.relatedProducts.length > 0) {
        let relacionadosHTML = "";
        
        productData.relatedProducts.forEach(rel => {
            let itemImg = rel.imgSrc || rel.image || rel.src || "";
            let itemName = rel.name || "Producto Relacionado";
            let itemId = rel.id || localStorage.getItem("prodID");

            relacionadosHTML += `
            <div class="col-lg-3 col-md-4 col-6 mb-3" style="cursor: pointer;" onclick="localStorage.setItem('prodID', ${itemId}); window.location='product-info.html'">
                <div class="card h-100 shadow-sm custom-card">
                    <img class="img-fluid card-img-top" src="${itemImg}" alt="${itemName}">
                    <div class="card-body p-2">
                        <p class="card-text font-weight-bold text-center small mb-0 text-dark">${itemName}</p>
                    </div>
                </div>
            </div>`;
        });
        
        let contenedorRelacionados = document.getElementById("proRelacionados");
        if (contenedorRelacionados) {
            contenedorRelacionados.innerHTML = relacionadosHTML;
        }
    }

    // ACCIÓN DEL BOTÓN VERDE (Guarda el producto seleccionado en el localStorage)
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
            if (existe) {
                existe.count++;
            } else {
                carrito.push(nuevoProducto);
            }
            
            localStorage.setItem("carritoCompras", JSON.stringify(carrito));
            alert("¡" + productData.name + " agregado al carrito con éxito!");
        });
    }
}

// 2. FUNCIÓN PARA MOSTRAR LOS COMENTARIOS REALES
function showComments(commentsArray) {
    let htmlContentToAppend = "";
    
    if (!commentsArray || commentsArray.length === 0) {
        htmlContentToAppend = `<p class="text-muted">No hay comentarios para este producto aún.</p>`;
    } else {
        commentsArray.forEach(comment => {
            let estrellas = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= comment.score) {
                    estrellas += `<span class="fa fa-star checked" style="color: orange;"></span>`;
                } else {
                    estrellas += `<span class="fa fa-star" style="color: grey;"></span>`;
                }
            }

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action p-3 mb-2 shadow-sm" style="display: block; clear: both; width: 100%;">
                <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                    <h6 class="mb-0"><strong>${comment.user || comment.usuario}</strong></h6>
                    <small class="text-muted">${comment.dateTime || comment.time}</small>
                </div>
                <p class="mb-2 text-secondary small">${comment.description || comment.description}</p>
                <div>${estrellas}</div>
            </div>`;
        });
    }

    // Buscamos todos los IDs posibles que JAP suele estructurar en el HTML
    let contenedorComentarios = document.getElementById("productComments") 
                                || document.getElementById("comentarios") 
                                || document.getElementById("comments-list")
                                || document.getElementById("comentarios-container");
                                
    if (contenedorComentarios) {
        contenedorComentarios.innerHTML = htmlContentToAppend;
    }
}

// 3. EVENTO PRINCIPAL
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfo = resultObj.data;
            showProductInfo(currentProductInfo);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentComments = resultObj.data;
            showComments(currentComments);
        }
    });
});
