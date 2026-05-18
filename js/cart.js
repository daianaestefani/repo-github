let cartArticles = [];

function showCartArticles(articles) {
    let htmlContentToAppend = "";
    let tableContainer = document.getElementById("cart-items") || document.getElementById("items-carrito") || document.getElementById("carrito-tabla");

    if (!tableContainer) return;

    articles.forEach((article, index) => {
        let itemImg = article.src || article.image;
        let itemName = article.name;
        let itemCost = article.unitCost || article.cost;
        let itemCurrency = article.unitCurrency || article.currency;
        let itemCount = article.count || 1;
        let subtotal = itemCost * itemCount;

        htmlContentToAppend += `
        <tr class="align-middle">
            <td><img src="${itemImg}" alt="${itemName}" class="img-thumbnail" style="width: 70px;"></td>
            <td>${itemName}</td>
            <td>${itemCurrency} ${itemCost}</td>
            <td><input type="number" class="form-control form-control-sm" style="width: 70px;" value="${itemCount}" min="1" onchange="updateSubtotal(${index}, this.value)"></td>
            <td><strong>${itemCurrency} <span id="subtotal-${index}">${subtotal}</span></strong></td>
            <td><button class="btn btn-outline-danger btn-sm" onclick="removeCartItem(${index})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
    });

    tableContainer.innerHTML = htmlContentToAppend;
}

function updateSubtotal(index, count) {
    if (count < 1) return;
    cartArticles[index].count = parseInt(count);
    let itemCost = cartArticles[index].unitCost || cartArticles[index].cost;
    let newSubtotal = itemCost * cartArticles[index].count;
    let subtotalElement = document.getElementById(`subtotal-${index}`);
    if (subtotalElement) subtotalElement.innerHTML = newSubtotal;
}

function removeCartItem(index) {
    let localItems = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    let updatedLocal = localItems.filter(item => item.name !== cartArticles[index].name);
    localStorage.setItem("carritoCompras", JSON.stringify(updatedLocal));
    cartArticles.splice(index, 1);
    showCartArticles(cartArticles);
}

document.addEventListener("DOMContentLoaded", function(e) {
    const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let apiArticles = resultObj.data.articles || [];
            let localArticles = JSON.parse(localStorage.getItem("carritoCompras")) || [];
            cartArticles = [...apiArticles, ...localArticles];
            showCartArticles(cartArticles);
        }
    });
});
