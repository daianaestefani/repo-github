let cartArticles = [];

// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS EN LA TABLA DEL CARRITO
function showCartArticles(articles) {
    let htmlContentToAppend = "";
    let tableContainer = document.getElementById("cart-items") || document.getElementById("items-carrito");

    if (!tableContainer) return;

    articles.forEach((article, index) => {
        // Adaptamos los nombres de propiedades por si vienen del servidor original o del localStorage
        let itemImg = article.src || article.image;
        let itemName = article.name;
        let itemCost = article.unitCost || article.cost;
        let itemCurrency = article.unitCurrency || article.currency;
        let itemCount = article.count || 1;
        
        let subtotal = itemCost * itemCount;

        htmlContentToAppend += `
        <tr class="align-middle">
            <td>
                <img src="${itemImg}" alt="${itemName}" class="img-thumbnail" style="width: 70px;">
            </td>
            <td>${itemName}</td>
            <td>${itemCurrency} ${itemCost}</td>
            <td>
                <input type="number" class="form-control form-control-sm" style="width: 70px;" 
                       value="${itemCount}" min="1" onchange="updateSubtotal(${index}, this.value)">
            </td>
            <td><strong class="text-dark">${itemCurrency} <span id="subtotal-${index}">${subtotal}</span></strong></td>
            <td>
                <button class="btn btn-outline-danger btn-sm" onclick="removeCartItem(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>`;
    });

    tableContainer.innerHTML = htmlContentToAppend;
    calculateTotal();
}

// ACTUALIZAR EL SUBTOTAL CUANDO CAMBIA LA CANTIDAD
function updateSubtotal(index, count) {
    if (count < 1) return;
    cartArticles[index].count = parseInt(count);
    
    let itemCost = cartArticles[index].unitCost || cartArticles[index].cost;
    let newSubtotal = itemCost * cartArticles[index].count;
    
    let subtotalElement = document.getElementById(`subtotal-${index}`);
    if (subtotalElement) {
        subtotalElement.innerHTML = newSubtotal;
    }
    calculateTotal();
}

// ELIMINAR UN ELEMENTO DEL CARRITO
function removeCartItem(index) {
    cartArticles.splice(index, 1);
    
    // Guardamos la lista actualizada en el localStorage (excluyendo el base de JAP si corresponde)
    let localItems = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    // Filtramos por nombre para removerlo de la persistencia
    let updatedLocal = localItems.filter(item => item.name !== cartArticles[index]?.name);
    localStorage.setItem("carritoCompras", JSON.stringify(updatedLocal));
    
    showCartArticles(cartArticles);
}

// CÁLCULO DE COSTOS TOTALES (Requerido para la entrega completa)
function calculateTotal() {
    let total = 0;
    cartArticles.forEach(article => {
        let itemCost = article.unitCost || article.cost;
        let itemCount = article.count || 1;
        total += itemCost * itemCount;
    });
    
    let totalElement = document.getElementById("cart-total-amount");
    if (totalElement) {
        totalElement.innerHTML = total;
    }
}

// EVENTO DOMContentLoaded PARA CARGAR LOS DATOS
document.addEventListener("DOMContentLoaded", function(e) {
    // URL por defecto de JAP para el carrito (ID de usuario 25801)
    const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            // Artículos predeterminados de la API
            let apiArticles = resultObj.data.articles || [];
            
            // Artículos guardados por el usuario desde "Agregar al carrito"
            let localArticles = JSON.parse(localStorage.getItem("carritoCompras")) || [];
            
            // Combinamos ambos en una sola lista para mostrar en pantalla
            cartArticles = [...apiArticles, ...localArticles];
            
            showCartArticles(cartArticles);
        }
    });
});
