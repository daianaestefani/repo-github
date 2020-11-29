///////////////////////////////////////////////////////////////////////////
/////////////////funcion para CERRAR SESION CON user/////////////////
function cerrarsesion(){
    alert('Cerrando sesión de usuario: '+sesion);
    localStorage.clear(); 
    location.href='index.html';
  }
/************************************ */
///////////////////////////////////////////////////////////////////////////
/////////////////funcion para INICIAR SESION CON user-pass/////////////////
function loginUser(user, pass){
    if (user.trim()=== "" || pass.trim()=== ""){
        //alert("Debe rellenar los datos");
        Swal.fire({
            title: 'Faltaron Datos',
            text: "Debe ingresar todos los datos",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
    } else {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("contraseña", pass.trim());

        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
////////////////funcion para registrar con EMAIL-USER-PASS////////////////
function usermailpass (user, mail, pass){
    if (user.trim()=== "" || pass.trim()=== "" || mail.trim()==="")
    {
        //alert("Debe rellenar TODOS los datos");
        Swal.fire({
            title: 'Faltaron Datos',
            text: "Debe ingresar todos los datos",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
    } 
    else {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("email", mail.trim());
        localStorage.setItem("contraseña", pass.trim());
        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////function iniciar sesion google////////////////////////////
var objetoPerfil={};

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile(); 

    localStorage.setItem("usuario", profile.getName());         //guarda EL NOMBRE DEL USUARIO
    localStorage.setItem("nombre", profile.getGivenName());     //NOMBRE
    localStorage.setItem("apellido", profile.getFamilyName());  //APELLIDO
    localStorage.setItem("email", profile.getEmail());      //EMAIL
    localStorage.setItem("imgperfilURL", profile.getImageUrl());   //IMAGEN DE PERFIL
    
    localStorage.setItem("usuario", profile.getName()).value = objetoPerfil.nombre;

    location.href="principalmenu.html";                  //REDIRECCIONA A LA PANTALLA PRINCIPAL
}//funcion iniciar sesión
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
    auth2.signOut().then(function(){
        alert('Cerrando sesion de usuario:' +usuario);
        location.reload();
    });//    auth2.disconnect();    
    location.href='index.html';     //redirecciono al index
} //funcion serrar sesion del boton