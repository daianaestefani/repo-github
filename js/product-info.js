document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");

    // 1. Verificación de seguridad inicial
    if (!prodID) {
        console.error("No se encontró un ID de producto en localStorage.");
        return;
    }

    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
    const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

    // 2. Carga de la información principal
    fetch(URL_INFO)
        .then(response => response.json())
        .then(p => {
            // Llenado de textos (con validación de existencia de elementos)
            const setText = (id, text) => { if(document.getElementById(id)) document.getElementById(id).innerText = text; };
            
            setText("productName", p.name);
            setText("productPrice", `${p.currency} ${p.cost}`);
            setText("proDescription", p.description);
            setText("soldCount", p.soldCount);

            // Renderizado de imágenes (Carrusel)
            let imgHTML = "";
            p.images.forEach((img, i) => {
                imgHTML += `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100 img-fluid">
                </div>`;
            });
            if(document.getElementById("productImages")) document.getElementById("productImages").innerHTML = imgHTML;

            // Renderizado de Productos Relacionados
            let relHTML = "";
            p.relatedProducts.forEach(rel => {
                relHTML += `
                <div class="col-6 col-md-3">
                    <div class="card" onclick="setProductID(${rel.id})" style="cursor:pointer;">
                        <img src="${rel.image}" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${rel.name}</h6>
                        </div>
                    </div>
                </div>`;
            });
            if(document.getElementById("proRelacionados")) document.getElementById("proRelacionados").innerHTML = relHTML;
        })
        .catch(err => console.error("Error al cargar producto:", err));

    // 3. Carga de comentarios
    fetch(URL_COMMENTS)
        .then(response => response.json())
        .then(comments => {
            let commHTML = "";
            comments.forEach(c => {
                commHTML += `
                <div class="list-group-item">
                    <strong>${c.user}</strong> - <small>${c.dateTime}</small>
                    <p>${c.description}</p>
                    <p>Puntaje: ${c.score}/5</p>
                </div>`;
            });
            if(document.getElementById("productComments")) document.getElementById("productComments").innerHTML = commHTML;
        })
        .catch(err => console.error("Error al cargar comentarios:", err));
});

// Función para cambiar de producto al hacer clic en uno relacionado
function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
