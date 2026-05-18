document.addEventListener("DOMContentLoaded", function() {
    // 1. Intentamos obtener el ID del localStorage
    let prodID = localStorage.getItem("prodID");

    // 2. Validación de seguridad
    if (!prodID || prodID === "null") {
        console.warn("No hay ID en localStorage. Redirigiendo a productos...");
        // Opcional: Redirigir si no hay ID, o mostrar un mensaje claro
        document.getElementById("productName").innerText = "Por favor, selecciona un producto desde el listado.";
        return; 
    }

    // 3. Si hay ID, construimos la URL correctamente
    const URL_INFO = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    fetch(URL_INFO)
        .then(response => {
            if (!response.ok) throw new Error("Producto no encontrado");
            return response.json();
        })
        .then(p => {
            document.getElementById("productName").innerText = p.name;
            // ... (resto de tu código de llenado aquí)
        })
        .catch(err => {
            console.error(err);
            document.getElementById("productName").innerText = "Error cargando este producto.";
        });
});
