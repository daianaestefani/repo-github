document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");
    if (!prodID) return;

    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    fetch(URL_INFO)
        .then(res => res.json())
        .then(p => {
            // Función segura para actualizar elementos
            const updateElement = (id, content) => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = content;
            };

            updateElement("productName", p.name);
            updateElement("productPrice", `${p.currency} ${p.cost}`);
            updateElement("proDescription", p.description);
            updateElement("soldCount", p.soldCount);

            // Imágenes
            let imgHTML = "";
            p.images.forEach((img, i) => {
                imgHTML += `<div class="carousel-item ${i === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100">
                            </div>`;
            });
            updateElement("productImages", imgHTML);

            // Relacionados
            let relHTML = "";
            p.relatedProducts.forEach(rel => {
                relHTML += `
                <div class="col-6 col-md-3">
                    <div class="card" onclick="setProductID(${rel.id})" style="cursor:pointer;">
                        <img src="${rel.image}" class="card-img-top">
                        <div class="card-body"><p>${rel.name}</p></div>
                    </div>
                </div>`;
            });
            updateElement("proRelacionados", relHTML);
        })
        .catch(err => console.error("Error al cargar:", err));
});

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
