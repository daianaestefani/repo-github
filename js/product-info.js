document.addEventListener("DOMContentLoaded", function() {
    // 1. Recuperamos el ID y validamos
    const prodID = localStorage.getItem("prodID");
    if (!prodID) {
        console.error("Error: No existe un prodID en localStorage. Debes seleccionar un producto primero.");
        document.body.innerHTML = "<h1>Error: Producto no seleccionado</h1>";
        return;
    }

    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    // 2. Usamos fetch nativo (independiente de init.js)
    fetch(URL_INFO)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta de la API");
            return response.json();
        })
        .then(p => {
            // Llenamos el HTML
            document.getElementById("productName").innerText = p.name;
            document.getElementById("productPrice").innerText = `${p.currency} ${p.cost}`;
            document.getElementById("proDescription").innerText = p.description;
            document.getElementById("soldCount").innerText = p.soldCount;

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
        })
        .catch(err => {
            console.error("Detalle del error:", err);
            document.getElementById("productName").innerText = "Error al cargar el producto";
        });
});
