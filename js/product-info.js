document.addEventListener("DOMContentLoaded", function() {
    // 1. Obtener el ID del producto
    const prodID = localStorage.getItem("prodID");
    if (!prodID) {
        console.error("No se encontró prodID en localStorage");
        return;
    }

    // 2. URLs directas (asegúrate de que estas sean las correctas para tu API)
    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    // 3. Carga de datos usando fetch nativo (más fiable que getJSONData si este falla)
    fetch(URL_INFO)
        .then(response => response.json())
        .then(p => {
            // Llenar datos básicos
            document.getElementById("productName").innerHTML = p.name;
            document.getElementById("productPrice").innerHTML = `${p.currency} ${p.cost}`;
            document.getElementById("proDescription").innerHTML = p.description;
            document.getElementById("soldCount").innerHTML = p.soldCount;

            // Imágenes (Carga dinámica)
            let imgHTML = "";
            p.images.forEach(img => {
                imgHTML += `<div class="col-3"><img src="${img}" class="img-fluid img-thumbnail"></div>`;
            });
            document.getElementById("productImages").innerHTML = imgHTML;

            // Productos Relacionados
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
        .catch(error => {
            console.error("Error al cargar los datos del producto:", error);
            document.body.innerHTML += `<div class="alert alert-danger">Error al cargar datos. Revisa la consola.</div>`;
        });
});
