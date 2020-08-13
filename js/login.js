//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

function loginuser(user,pass){
    if (user.trim()==="" || pass.trim()===""){
        alert("Debe rellenar todos los datos para continuar");
    }   else {
            localStorage.setItem("usuario",user.trim());
            localStorage.setItem("contraseña",pass.trim());
            location.href="principalhome.html";
    }
}
