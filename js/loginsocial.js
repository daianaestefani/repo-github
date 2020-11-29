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

