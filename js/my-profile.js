/* estoy guardando los valores que se ingresen en la seccion de perfil,
 * usando la funcion actualizarPerfil
 * 
 * creo las variables, les cargo el valor dependiendo de cada input
 * 
 * usando un objeto creado por mi 
 * 
 * les cargo valores de las variables usadas anteriormente
 * cargo todo al objeto temporalmente, enla memoria local
 * 
 * en el evento de escucha de DOMContentLoaded
 * declaro una variable para cargar lo quee tenia almacenado en la memoria local
 * 
 * vuelvo a cargar en cada input los valores anteriormente guardados en las variables
 */
//var arrayPerfil=[];
var objetoPerfil={};

function actualizarPerfil(){
    var nombre = document.getElementById('idnombre').value;
    var apellidoUno = document.getElementById('idapellidoUno').value;
    var apellidoDos = document.getElementById('idapellidoDos').value;
    var edad = document.getElementById('idedad').value;
    var telefono = document.getElementById('idtelefono').value;
    var email = document.getElementById('idemail').value;
    
    objetoPerfil.nombre = nombre;
    objetoPerfil.apellidoUno = apellidoUno;
    objetoPerfil.apellidoDos = apellidoDos;
    objetoPerfil.edad = edad;
    objetoPerfil.telefono = telefono;
    objetoPerfil.email = email;

    localStorage.setItem('objetoPerfil', JSON.stringify(objetoPerfil));
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) { 
    //cargo valores
    var objetoPerfil = JSON.parse(localStorage.getItem('objetoPerfil')); //para cargar los valores, sino da indefinido
//obtengo los valores
    document.getElementById('idnombre').value = objetoPerfil.nombre;
    document.getElementById('idapellidoUno').value = objetoPerfil.apellidoUno;
    document.getElementById('idapellidoDos').value = objetoPerfil.apellidoDos;
    document.getElementById('idedad').value = objetoPerfil.edad;
    document.getElementById('idtelefono').value = objetoPerfil.telefono;
    document.getElementById('idemail').value = objetoPerfil.email;
});   