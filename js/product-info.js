document.addEventListener("DOMContentLoaded", function(e) {
    // Llamada a la API utilizando la función definida en init.js
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let product = resultObj.data;

            // Llenado de información básica
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productPrice").innerHTML = product.cost;
            document.getElementById("productMoneda").innerHTML = product.currency;
            document.getElementById("proDescription").innerHTML = product.description;
            document.getElementById("soldCount").innerHTML = product.soldCount;

            // Generación de imágenes (asegúrate de que product.images sea un array)
            let imgHTML = "";
            product.images.forEach(img => {
                imgHTML += `<div class="col-3"><img src="${img}" class="img-fluid img-thumbnail"></div>`;
            });
            document.getElementById("productImages").innerHTML = imgHTML;

            // Generación de productos relacionados
            let relHTML = "";
            product.relatedProducts.forEach(rel => {
                relHTML += `
                <div class="col-3">
                    <img src="${rel.image}" class="img-fluid">
                    <p>${rel.name}</p>
                </div>`;
            });
            document.getElementById("proRelacionados").innerHTML = relHTML;
        }
    });
});
