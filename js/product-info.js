document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");
    if (!prodID) {
        console.error("No hay prodID en localStorage");
        return;
    }

    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    fetch(URL_INFO)
        .then(response => response.json())
        .then(p => {
            document.getElementById("productName").innerHTML = p.name;
            document.getElementById("productPrice").innerHTML = `${p.currency} ${p.cost}`;
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
        })
        .catch(err => console.error("Error al cargar:", err));
});
