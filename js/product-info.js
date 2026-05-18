// Variable global para almacenar la información del producto
let currentProductInfo = {};

// Función para obtener y mostrar la información del producto
document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");

    if (!prodID) {
        console.error("No hay prodID seleccionado.");
        return;
    }

    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
    const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

    // Carga de Información del Producto
    fetch(URL_INFO)
        .then(res => res.json())
        .then(p => {
            currentProductInfo = p;
            
            document.getElementById("productName").innerText = p.name;
            document.getElementById("productPrice").innerText = `${p.currency} ${p.cost}`;
            document.getElementById("proDescription").innerText = p.description;
            document.getElementById("soldCount").innerText = p.soldCount;
            document.getElementById("prodCateg").innerText = p.category;

            // Renderizado de imágenes (Carrusel)
            let imgHTML = "";
            p.images.forEach((img, index) => {
                imgHTML += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100 img-fluid">
                </div>`;
            });
            document.getElementById("productImages").innerHTML = imgHTML;

            // Renderizado de Productos Relacionados
            let relHTML = "";
            p.relatedProducts.forEach(rel => {
                relHTML += `
                <div class="col-6 col-md-3">
                    <div class="card h-100" onclick="setProductID(${rel.id})" style="cursor:pointer;">
                        <img src="${rel.image}" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${rel.name}</h6>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById("proRelacionados").innerHTML = relHTML;
        })
        .catch(err => console.error("Error al cargar producto:", err));

    // Carga de Comentarios
    fetch(URL_COMMENTS)
        .then(res => res.json())
        .then(comments => {
            let commHTML = "";
            comments.forEach(c => {
                commHTML += `
                <div class="list-group-item">
                    <strong>${c.user}</strong> - ${c.dateTime} <br>
                    ${c.description} <br>
                    <small>Puntaje: ${c.score}/5</small>
                </div>`;
            });
            document.getElementById("productComments").innerHTML = commHTML;
        })
        .catch(err => console.error("Error al cargar comentarios:", err));
});

// Función para cambiar de producto al hacer clic en uno relacionado
function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
