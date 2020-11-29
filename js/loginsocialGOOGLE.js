
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////function iniciar sesion google////////////////////////////

var arrayPERFIL = document.forms[0];

function onSignIn(googleUser){
    var profile = googleUser.geBasicProfile(); 
    var infoVacia ="";
    localStorage.setItem('nombre', profile.getName());         //guarda EL NOMBRE DEL USUARIO
    localStorage.setItem('usuario', profile.getGivenName());     //NOMBRE
    localStorage.setItem('apellido', profile.getFamilyName());  //APELLIDO
    localStorage.setItem('email', profile.getEmail());          //EMAIL
    localStorage.setItem('edad', infoVacia);                //EDAD
    localStorage.setItem('telefono', infoVacia);            //TELEFONO
    localStorage.setItem('imgperfilURL', profile.getImageUrl());   //IMAGEN DE PERFIL

    location.href="principalmenu.html";                  //REDIRECCIONA A LA PANTALLA PRINCIPAL
}//funcion iniciar sesión
document.addEventListener("DOMcontentLoaded", function(e){
    arrayPERFIL.addEventListener('submit', function(e){
        var usuario = arrayPERFIL[0].value;
        var infoVacia = "";
        var imgPerfilURL = "./img/perfilimagensilueta.png";

        localStorage.setItem('nombre', inombre);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('email', usuario);
        localStorage.setItem('apellido', infoVacia);
        localStorage.setItem('telefono', infoVacia);
        localStorage.setItem('imgPerfilURL', imgPerfilURL);
    })
    if (localStorage.getItem('usuario') != undefined){
        location.href="home.html";
    }
});
/*
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId());                // Don't send this directly to your server! // //no enviar a tu backend! usar ID token
    console.log('Full Name: ' + profile.getName());         //nombre completo
    console.log('Given Name: ' + profile.getGivenName());   //nombre 
    console.log('Family Name: ' + profile.getFamilyName()); //apellido
    console.log("Image URL: " + profile.getImageUrl());     //imagen url
    console.log("Email: " + profile.getEmail());            //correo electronico

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
  */
//////////////////////////////////////////////////////////////////////////////////////
//////////////////funcion para que google cierre sesion de usuario////////////////////
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance(); /*me salio error en esta linea.... Uncaught ReferenceError: gapi is not defined at signOut (loginsocial.js:70) at HTMLButtonElement.onclick (principalmenu.html:27)*/
    auth2.signOut();
    auth2.disconnect();
}

function init(){
    gapi.load('auth2', function(){
    gapi.auth2.init().then(function(e){
        signOut();
        location.href='index.html';     //redirecciono al index
    })
    });
}//function init