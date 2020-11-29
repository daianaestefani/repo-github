function convertir(img) {
        img.crossOrigin="anonymous";
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var contexto = canvas.getContext("2d");
        contexto.drawImage(img, 0, 0,img.width, img.height);
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL;
  }

  document.addEventListener('DOMContentLoaded',function(){
        var imgbase64 = convertir(document.getElementById("img"));
        localStorage.imagen=imgbase64;
        document.getElementById('imagen2').src=`${localStorage.imagen}`;
        document.getElementById('contenido').innerHTML=localStorage.imagen;
        console.log(imgbase64);
  });
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
function importarimagen(){
      var imgprevia = document.getElementById('myImg');
      var archivoImg = document.querySelector('input[type=archivoImg]').files[0];
      var lectura = new FileReader();

      lectura.addEventListener("load", function(){
            imgprevia.src =  lectura.result;
            localStorage.setItem("myImg", (lectura.reslut));
      });

      if (archivoImg){
            lectura.readAsDataURL(archivoImg);
      }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
