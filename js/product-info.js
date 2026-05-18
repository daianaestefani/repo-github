let currentProductInfo = {};

// Función para mostrar los datos principales, el botón y las imágenes
function showProductInfo(productData) {
    // Buscamos tus etiquetas originales de HTML
    let nameHTML = document.getElementById("productName");
    let priceHTML = document.getElementById("productPrice");
    let currencyHTML = document.getElementById("productMoneda");
    let descriptionHTML = document.getElementById("proDescripHTML") || document.getElementById("proDescription");
    let soldHTML = document.getElementById("soldCount");
    let categoryHTML = document.getElementById("prodCateg");

    // Asignamos los textos de forma segura
    if (nameHTML) nameHTML.innerHTML = productData.name;
    if (priceHTML) priceHTML.innerHTML = productData.cost;
    if (currencyHTML) currencyHTML.innerHTML = productData.currency;
    if (soldHTML) soldHTML.innerHTML = productData.soldCount;
    if (categoryHTML) categoryHTML.innerHTML = productData.category;
    
    // Mostramos la descripción e inyectamos el botón verde justo debajo
    if (descriptionHTML) {
        descriptionHTML.innerHTML = productData.description + `
            <br><br>
            <button id="btn-agregar-carrito" class="btn btn-success btn-lg mt-3">
                <i class="fas fa-shopping-cart"></i> Agregar al carrito
            </button>
        `;
    }

    // --- CARGAR IMÁGENES ILUSTRATIVAS ---
    let imagenesHTML = "";
    let carouselHTML = "";

    if (productData.images && productData.images.length > 0) {
        productData.images.forEach((imgSrc, index) => {
            imagenesHTML += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${imgSrc}" alt="">
                </div>
            </div>
            `;
            let activeClass = index === 0 ? "active" : "";
            carouselHTML += `
            <div class="carousel-item ${activeClass}">
                <img src="${imgSrc}" class="d-block w-100" alt="...">
            </div>
            `;
        });

        let contenedorImagenes = document.getElementById("productImages");
        let contenedorCarrusel = document.getElementById("pImgCarousel");
        
        if (contenedorImagenes) contenedorImagenes.innerHTML = imagenesHTML;
        if (contenedorCarrusel) contenedorCarrusel.innerHTML = carouselHTML;
    }

 // --- CARGAR PRODUCTOS RELACIONADOS (Los dos autos de abajo) ---
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
            </div>
            `;
        });
        
        // Lo colgamos del contenedor de imágenes o del bloque de relacionados principal
        let contenedorRelacionados = document.getElementById("relatedProducts") || document.querySelector(".container .row:last-of-type") || document.getElementById("productImages");
        if (contenedorRelacionados && contenedorRelacionados.id !== "productImages") {
            contenedorRelacionados.innerHTML = relacionadosHTML;
        } else {
            // Si no encuentra el bloque específico, crea uno nuevo al final de las imágenes
            let divRelacionados = document.createElement("div");
            divRelacionados.className = "row mt-4";
            divRelacionados.innerHTML = relacionadosHTML;
            let section = document.querySelector("main") || document.body;
            if (section) section.appendChild(divRelacionados);
        }
    }

    // --- ACTIVAR ACCIÓN DEL BOTÓN VERDE ---
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

// Evento principal para pedir los datos a la API de JAP
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfo = resultObj.data;
            showProductInfo(currentProductInfo);
        }
    });
});
