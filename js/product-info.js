document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let p = resultObj.data;
            document.getElementById("productName").innerHTML = p.name;
            document.getElementById("productPrice").innerHTML = p.cost;
            document.getElementById("productMoneda").innerHTML = p.currency;
            document.getElementById("proDescription").innerHTML = p.description;
            document.getElementById("soldCount").innerHTML = p.soldCount;
            
            // Imágenes
            let imgHTML = "";
            p.images.forEach(img => {
                imgHTML += `<img src="${img}" class="img-thumbnail" width="150">`;
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
        }
    });
});
