
///////////////////////////////////////////////////////////////////////////////////
////////////////////////INICIAR/REGISTRAR LLENANDO DATOS////////////////////////

//registrar usuario (no registrado), llenando datos
//no funciona como tal, solo muestra que valores fueron ingresados
function registraruser(usereg, usermail, userpass){
  if (usereg.trim()==="" || userpass.trim()==="" || usermail.trim()==="")
  {
    Swal.fire({
      title: 'Faltaron Datos',
      text: "Debe ingresar todos los datos",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })
      //alert("No ingresó todos los datos");   
  } 
  else {
        //alert("REGISTRO : * Usuario: " + usereg + ' * ' + ' Email: ' + usermail + ' * ' + ' Contraseña: ' + userpass + ' * '),
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Exitoso!',
          text: 'Usuario: '+ usereg + ' .  Email: ' + usermail,
          showConfirmButton: true,
          timer: 9990
        }).then((result) => {

          localStorage.setItem("usuario", user.usereg());
          localStorage.setItem("contraseña", userpass.trim());
          location.href="index.html"
        });
        
        //alert(" Email: " + usermail );      //alert(" Contraseña: " + userpass );
      }//cierre else*/

  } //cierre de funcion

////////////////////////INICIAR LLENANDO DATOS ()////////////////////////
  //iniciar sesion ingresando usuario y contraseña
  function loginUser(user, pass){
    if (user.trim()=== "" || pass.trim()=== ""){
        //alert("Debe rellenar los datos");
        Swal.fire({
          title: 'Faltaron Datos',
          text: "Debe rellenar los datos",
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


//cerrar sesion, limpiar usuario, volver a iniciar sesion...
  function cerrarsesion(){
    //alert('Usuario: '+ sesion+' desconectandose...');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario'+usereg + 'desconectandose...',
        text: 'Usuario: '+ usereg + ' .  Email: ' + usermail,
        showConfirmButton: true,
        timer: 9999,
      }).then((result)=>{
      localStorage.clear(); 
      location.href='index.html'
      });
  }


///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////GOOGLE//////////////////////////////////////
  //funcion cerrar sesion google (copie de la pagina de google, pero no funciona)
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  //<a href="#" onclick="signOut();">Sign out</a>

//function iniciar sesion google  (copie de la pagina de google, pero no funciona)
function onSignIn(googleUser){
  var profile = googleUser.getBasicProfile();
  console.log('ID : ' + profile.getId());
  console.log('Nombre : ' + profile.getName());
}