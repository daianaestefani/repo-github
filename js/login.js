//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function(e){
});*/
function loginUser(user, pass){
    if (user.trim()=== "" || pass.trim()=== ""){
        alert("Debe rellenar los datos");
    } else {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("contraseña", pass.trim());
        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion

function cerrarsesion(){
  localStorage.clear(); 
  alert('Usuario desconectado'); 
  location.href='index.html';
}

//funcion iniciar sesion con GOOGLE
/*function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }*/

//funcion cerrar sesion google
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  //<a href="#" onclick="signOut();">Sign out</a>

//function iniciar sesion google
function onSignIn(googleUser){
  var profile = googleUser.getBasicProfile();
  console.log('ID : ' + profile.getId());
  console.log('Nombre : ' + profile.getName());
}