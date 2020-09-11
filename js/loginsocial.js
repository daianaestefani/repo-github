/*function reregistrando(userSOCIAL, emailSOCIAL, passSOCIAL, passConfirm){*/
/*if (userSOCIAL.trim()=== "" || emailSOCIAL.trim()=== "" || passSOCIAL.trim()==="" || passConfirm.trim()==="")*/
/*
function reregistrando(userSOCIAL, emailSOCIAL, passSOCIAL){

    if (userSOCIAL.trim()=== "" || emailSOCIAL.trim()=== "" || passSOCIAL.trim()==="") {
            alert("No ha ingresado todos los datos! ");
    } //si NO escribi en todas las cajas
    else    {  
        alert(" Usuario: " + userSOCIAL + ". ");
        alert(" Email: " + emailSOCIAL + ". ");
        alert(" Contraseña: " + passSOCIAL + " . ");
        sessionStorage.setItem("usuario", userSOCIAL.trim());
        sessionStorage.setItem("contraseña", passSOCIAL.trim());

        location.href="principalmenu.html";
    }//cierre else*/
//} //cierre de funcion*/
///////////////////////////////////////////////////////////////////////////
////////////////funcion para registrar con EMAIL-USER-PASS////////////////
function usermailpass (user,mail,pass){
    if (user.trim()=== "" || pass.trim()=== "" || mail.trim()===""){
        alert("Debe rellenar los datos");
    } else {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("email", mail.trim());
        localStorage.setItem("contraseña", pass.trim());
        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion

///////////////////////////////////////////////////////////////////////////
/////////////////funcion para INICIAR SESION CON user-pass/////////////////
function loginUser(user, pass){
    if (user.trim()=== "" || pass.trim()=== ""){
        alert("Debe rellenar los datos");
    } else {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("contraseña", pass.trim());
        location.href="principalmenu.html";
    }//cierre else
} //cierre de funcion

///////////////////////////////////////////////////////////////////////////
/////////////////funcion para CERRAR SESION CON user/////////////////
function cerrarsesion(){
    localStorage.clear(); 
    alert('Usuario desconectado'); 
    alert('Cerrando sesión de usuario: '+sesion);
    location.href='index.html';
  }

/************************************ */
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////function iniciar sesion google////////////////////////////
function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    //console.log('Nombre: ' + profile.getName());    
    localStorage.setItem("usuario", profile.getName()); //guarda EL NOMBRE DEL USUARIO

    location.href="principalmenu.html";                  //REDIRECCIONA A LA PANTALLA PRINCIPAL
    //console.log('ID: ' + profile.getId()); //no enviar a tu backend! usar ID token
    //console.log('Email: ' + profile.getEmail());
    //var id_token = googleUser.getAuthResponse().id_token;
    //console.log(id_token);
}//funcion iniciar sesión

//////////////////////////////////////////////////////////////////////////////////////
//////////////////funcion para que google cierre sesion de usuario////////////////////
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance(); /*me salio error en esta linea.... Uncaught ReferenceError: gapi is not defined at signOut (loginsocial.js:70) at HTMLButtonElement.onclick (principalmenu.html:27)*/

    auth2.signOut().then(function(){
        localStorage.clear();           //borro el usuario, para volver a iniciar sesion
        alert('Usuario desconectado'); 
        location.href='index.html';     //redirecciono al index
        //console.log('Usuario desconectado');
    });
} //funcion serrar sesion del boton
