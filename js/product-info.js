// URLs directas de la API de JAP
const URL_INFO = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("prodID") + ".json";
const URL_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("prodID") + ".json";

// Función para reemplazar getJSONData si falla la carga
function fetchJSON(url) {
    return fetch(url).then(response => response.json());
}

document.addEventListener("DOMContentLoaded", function(e) {
    // Intentamos cargar la info del producto
    fetchJSON(URL_INFO).then(p => {
        document.getElementById("productName").innerHTML = p.name;
        document.getElementById("productPrice").innerHTML = p.cost;
        document.getElementById("productMoneda").innerHTML = p.currency;
        document.getElementById("proDescription").innerHTML = p.description;
        document.getElementById("soldCount").innerHTML = p.soldCount;

        // Imágenes
        let imgHTML = "";
        p.images.forEach(img => {
            imgHTML += `<div class="col-3"><img src="${img}" class="img-fluid img-thumbnail"></div>`;
        });
        document.getElementById("productImages").innerHTML = imgHTML;

        // Relacionados
        let relHTML = "";
        p.relatedProducts.forEach(rel => {
            relHTML += `
            <div class="col-3">
                <img src="${rel.image}" class="img-fluid">
                <p>${rel.name}</p>
            </div>`;
        });
        document.getElementById("proRelacionados").innerHTML = relHTML;
    }).catch(err => console.error("Error cargando el producto:", err));

    // Intentamos cargar los comentarios
    fetchJSON(URL_COMMENTS).then(comments => {
        let commHTML = "";
        comments.forEach(c => {
            commHTML += `<li class="list-group-item">${c.user}: ${c.description}</li>`;
        });
        document.getElementById("productComments").innerHTML = commHTML;
    });
});
