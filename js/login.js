//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function(e){
});*/
function loginUser(user, pass){
    if (user.trim()=== "" || pass.trim()=== ""){
        alert("Debe rellenar los datos");
    } else {
        /*localStorage.setItem("usuario", user.trim());
        localStorage.setItem("contraseña", pass.trim());*/
        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion
