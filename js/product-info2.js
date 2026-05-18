let currentProductInfo = {};

function showProductInfo(product) {
    document.getElementById("productName").innerHTML = product.name;
    document.getElementById("productPrice").innerHTML = product.cost;
    document.getElementById("productMoneda").innerHTML = product.currency;
    document.getElementById("proDescription").innerHTML = product.description;
    document.getElementById("soldCount").innerHTML = product.soldCount;

    // Imágenes
    let htmlImages = "";
    product.images.forEach(img => {
        htmlImages += `<div class="col-3"><img src="${img}" class="img-thumbnail"></div>`;
    });
    document.getElementById("productImages").innerHTML = htmlImages;

    // Productos Relacionados
    let htmlRelacionados = "";
    product.relatedProducts.forEach(rel => {
        htmlRelacionados += `
            <div class="col-3">
                <img src="${rel.image}" class="img-fluid">
                <p>${rel.name}</p>
            </div>`;
    });
    document.getElementById("proRelacionados").innerHTML = htmlRelacionados;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfo = resultObj.data;
            showProductInfo(currentProductInfo);
        }
    });
});
