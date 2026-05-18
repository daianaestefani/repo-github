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

    // CARGAR IMÁGENES ILUSTRATIVAS (CARRUSEL BOOTSTRAP)
    if (productData.images && productData.images.length > 0) {
        let carouselHTML = "";
        productData.images.forEach((imgSrc, index) => {
            let activeClass = index === 0 ? "active" : "";
            carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${imgSrc}" class="d-block w-100" alt="Imagen del producto" style="max-height: 400px; object-fit: contain;">
            </div>`;
        });
        let contenedorCarrusel = document.getElementById("productImages");
        if (contenedorCarrusel) contenedorCarrusel.innerHTML = carouselHTML;
    }

    // CARGAR PRODUCTOS RELACIONADOS (En tarjetas horizontales independientes)
    let relacionados = productData.relatedProducts || productData.RelatedProducts || [];
    if (relacionados.length > 0) {
        let relacionadosHTML = "";
        
        relacionados.forEach(rel => {
            let itemImg = rel.imgSrc || rel.image || rel.src || "";
            let itemName = rel.name || "Producto Relacionado";
            let itemId = rel.id || localStorage.getItem("prodID");

            relacionadosHTML += `
            <div class="col-6 col-md-3" style="cursor: pointer;" onclick="localStorage.setItem('prodID', ${itemId}); window.location='product-info.html'">
                <div class="card h-100 shadow-sm custom-card text-center bg-light p-2">
                    <img class="img-fluid card-img-top rounded mb-2" src="${itemImg}" alt="${itemName}" style="height: 120px; object-fit: cover;">
                    <div class="p-1">
                        <span class="d-block text-dark small font-weight-bold fw-bold">${itemName}</span>
                    </div>
                </div>
            </div>`;
        });
        
        let contenedorRelacionados = document.getElementById("proRelacionados");
        if (contenedorRelacionados) contenedorRelacionados.innerHTML = relacionadosHTML;
    }

    // ACCIÓN DEL BOTÓN VERDE DEL CARRITO
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
            alert("¡" + productData.name + " agregado al carrito!");
        });
    }
}

// 2. FUNCIÓN PARA MOSTRAR LOS COMENTARIOS CON ESTRELLAS
function showComments(commentsArray) {
    let htmlContentToAppend = "";
    if (!commentsArray || commentsArray.length === 0) {
        htmlContentToAppend = `<p class="text-muted p-3">No hay comentarios aún.</p>`;
    } else {
        commentsArray.forEach(comment => {
            let estrellas = "";
            let score = comment.score || 0;
            for (let i = 1; i <= 5; i++) {
                estrellas += `<span class="fa fa-star" style="color: ${i <= score ? 'orange' : 'grey'}; margin-right: 2px;"></span>`;
            }
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action p-3 mb-2 border rounded shadow-sm bg-light">
                <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                    <h6 class="mb-0 text-primary"><strong>${comment.user}</strong></h6>
                    <small class="text-muted">${comment.dateTime}</small>
                </div>
                <p class="mb-2 text-dark small">${comment.description}</p>
                <div>${estrellas}</div>
            </div>`;
        });
    }
    let contenedorComentarios = document.getElementById("productComments");
    if (contenedorComentarios) contenedorComentarios.innerHTML = htmlContentToAppend;
}

// 3. CARGA PRINCIPAL DE DATOS ASÍNCRONOS
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
