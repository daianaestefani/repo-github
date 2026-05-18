let cartArticles = [];

// 1. FUNCIÓN PARA DIBUJAR LOS PRODUCTOS EN LA TABLA DEL CARRITO
function showCartArticles(articles) {
    let htmlContentToAppend = "";
    let tableContainer = document.getElementById("cart-items") || document.getElementById("items-carrito") || document.getElementById("carrito-tabla");

    if (!tableContainer) return;

    if (articles.length === 0) {
        tableContainer.innerHTML = `<tr><td colspan="6" class="text-center p-4 text-muted">El carrito está vacío.</td></tr>`;
        calculateTotal();
        return;
    }

    articles.forEach((article, index) => {
        // Compatibilidad de variables por si vienen de la API de JAP o del localStorage
        let itemImg = article.src || article.image || "img/vehicle-placeholder.png";
        let itemName = article.name || "Producto sin nombre";
        let itemCost = article.unitCost || article.cost || 0;
        let itemCurrency = article.unitCurrency || article.currency || "USD";
        let itemCount = article.count || 1;
        let subtotal = itemCost * itemCount;

        htmlContentToAppend += `
        <tr class="align-middle">
            <td>
                <img src="${itemImg}" alt="${itemName}" class="img-thumbnail" style="width: 70px; height: auto; object-fit: contain;">
            </td>
            <td><strong>${itemName}</strong></td>
            <td>${itemCurrency} ${itemCost}</td>
            <td>
                <input type="number" class="form-control form-control-sm" style="width: 75px;" 
                       value="${itemCount}" min="1" onchange="updateSubtotal(${index}, this.value)">
            </td>
            <td><span class="font-weight-bold text-dark">${itemCurrency} <span id="subtotal-${index}">${subtotal}</span></span></td>
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

// 2. ACTUALIZAR SUBTOTAL CUANDO SE CAMBIA LA CANTIDAD EN EL INPUT
function updateSubtotal(index, count) {
    let cant = parseInt(count);
    if (isNaN(cant) || cant < 1) return;
    
    cartArticles[index].count = cant;
    
    let itemCost = cartArticles[index].unitCost || cartArticles[index].cost || 0;
    let newSubtotal = itemCost * cartArticles[index].count;
    
    let subtotalElement = document.getElementById(`subtotal-${index}`);
    if (subtotalElement) {
        subtotalElement.innerHTML = newSubtotal;
    }
    calculateTotal();
}

// 3. ELIMINAR UN ARTÍCULO DEL CARRITO
function removeCartItem(index) {
    let eliminado = cartArticles[index];
    cartArticles.splice(index, 1);
    
    // Si el artículo eliminado venía de lo que seleccionaste vos, lo sacamos del localStorage
    let localItems = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    let updatedLocal = localItems.filter(item => item.name !== eliminado.name);
    localStorage.setItem("carritoCompras", JSON.stringify(updatedLocal));
    
    // Volvemos a dibujar la tabla limpia
    showCartArticles(cartArticles);
}

// 4. CALCULAR LOS TOTALES GENERALES
function calculateTotal() {
    let total = 0;
    cartArticles.forEach(article => {
        let itemCost = article.unitCost || article.cost || 0;
        let itemCount = article.count || 1;
        total += itemCost * itemCount;
    });
    
    let totalElement = document.getElementById("cart-total-amount") || document.getElementById("total-general");
    if (totalElement) {
        totalElement.innerHTML = total;
    }
}

// 5. EVENTO PRINCIPAL DE CARGA
document.addEventListener("DOMContentLoaded", function(e) {
    // URL por defecto del obligatorio JAP (Carrito pre-cargado con el Peugeot)
    const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let apiArticles = resultObj.data.articles || [];
            
            // Levantamos los autos que vos hayas comprado con el botón verde
            let localArticles = JSON.parse(localStorage.getItem("carritoCompras")) || [];
            
            // Unimos los dos mundos en una sola lista para la pantalla
            cartArticles = [...apiArticles, ...localArticles];
            
            showCartArticles(cartArticles);
        }
    });
});
