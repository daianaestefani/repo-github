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

    // CARGAR PRODUCTOS RELACIONADOS (Corregido con el formato exacto del array de JAP)
    // En el JSON original, relacionados es una lista de números de ID, y los datos se sacan de otra variable global de productos.
    // Si tu array ya trae los objetos, JAP usa 'imgSrc' (o 'image') y 'name'. Vamos a poner ambos por seguridad:
    if (productData.relatedProducts && productData.relatedProducts.length > 0) {
        let relacionadosHTML = `<div class="row w-100">`; // Forzamos una fila de Bootstrap nueva
        
        productData.relatedProducts.forEach(relIndex => {
            // Evaluamos si el dato viene como objeto directo o si mapea propiedades de JAP
            let itemImg = relIndex.imgSrc || relIndex.image || relIndex.src || "";
            let itemName = relIndex.name || relIndex.description || "Producto Relacionado";
            let itemId = relIndex.id || relIndex;

            relacionadosHTML += `
            <div class="col-md-4 col-sm-6 mb-4" style="cursor: pointer;" onclick="localStorage.setItem('prodID', ${itemId}); window.location='product-info.html'">
                <div class="card h-100 shadow-sm custom-card">
                    <img class="card-img-top img-fluid" src="${itemImg}" alt="${itemName}">
                    <div class="card-body text-center p-2">
                        <h6 class="card-title font-weight-bold mb-0">${itemName}</h6>
                    </div>
                </div>
            </div>`;
        });
        
        relacionadosHTML += `</div>`;
        
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

// 2. FUNCIÓN PARA DIBUJAR LOS COMENTARIOS
function showComments(commentsArray) {
    let htmlContentToAppend = `<div class="row w-100 mx-0">`; // Abrimos fila limpia
    
    commentsArray.forEach(comment => {
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= comment.score) {
                estrellas += `<span class="fa fa-star checked" style="color: orange;"></span>`;
            } else {
                estrellas += `<span class="fa fa-star" style="color: grey;"></span>`;
            }
        }

        // col-12 obliga a que ocupen TODO el ancho y vayan estrictamente uno abajo del otro
        htmlContentToAppend += `
        <div class="col-12 mb-3">
            <div class="list-group-item list-group-item-action p-3 shadow-sm">
                <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                    <h6 class="mb-0"><strong>${comment.user}</strong></h6>
                    <small class="text-muted">${comment.dateTime}</small>
                </div>
                <p class="mb-2 text-secondary small">${comment.description}</p>
                <div>${estrellas}</div>
            </div>
        </div>`;
    });

    htmlContentToAppend += `</div>`;

    let contenedorComentarios = document.getElementById("productComments") || document.getElementById("comentarios");
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
