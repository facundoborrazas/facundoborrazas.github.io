// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  if ((localStorage.getItem("nombreUser") !== "")) { //Si el localstorage nombreUser es distinto de vacío
    document.getElementById("validationCustom01").value = localStorage.getItem("nombreUser");
  }
  if ((localStorage.getItem("apellidoUser") !== "")) { //Si el localstorage apellidoUser es distinto de vacío
    document.getElementById("validationCustom02").value = localStorage.getItem("apellidoUser");
  }
  if ((localStorage.getItem("emailUser") !== "")) { //Si el localstorage emailUser es distinto de vacío
    document.getElementById("validationCustom03").value = localStorage.getItem("emailUser");
  }
  if ((localStorage.getItem("2doNombreUser") !== "")) { //Si el localstorage 2doNombreUser es distinto de vacío
    document.getElementById("validationCustom04").value = localStorage.getItem("2doNombreUser");
  }
  if ((localStorage.getItem("2doApellidoUser") !== "")) { //Si el localstorage 2doApellidoUser es distinto de vacío
    document.getElementById("validationCustom05").value = localStorage.getItem("2doApellidoUser");
  }
  if ((localStorage.getItem("telUser") !== "")) { //Si el localstorage telUser es distinto de vacío
    document.getElementById("validationCustom06").value = localStorage.getItem("telUser");
  }
  if ((localStorage.getItem("photoPerfil") !== "")) { //Si el localstorage photoPerfil es distinto de vacío
    document.getElementById("fotoDePerfil").src = localStorage.getItem("photoPerfil");
  }

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      localStorage.setItem("nombreUser", document.getElementById("validationCustom01").value); //Se guarda en localStorage  el valor del nombre
      localStorage.setItem("apellidoUser", document.getElementById("validationCustom02").value); //Se guarda en localStorage  el valor del apellido
      localStorage.setItem("emailUser", document.getElementById("validationCustom03").value); //Se guarda en localStorage  el valor del email
      localStorage.setItem("2doNombreUser", document.getElementById("validationCustom04").value); //Se guarda en localStorage  el valor del 2do nombre
      localStorage.setItem("2doApellidoUser", document.getElementById("validationCustom05").value); //Se guarda en localStorage  el valor del 2do apellido
      localStorage.setItem("telUser", document.getElementById("validationCustom06").value); //Se guarda en localStorage  el valor del teléfono
      form.classList.add('was-validated')
    }, false)
  })

})()

document.getElementById("nombreDeUsuario").innerHTML += `<p>${localStorage.getItem("usuario")}</p>` //Se coloca el nombre de usuario debajo del titulo "Perfil"

document.addEventListener("DOMContentLoaded", function () {
  if ((localStorage.getItem("photoPerfil") === "")||(localStorage.getItem("photoPerfil") === null)) { //Si el localstorage photoPerfil es vacío o nulo se le deja el valor de "/img/img_perfil.png" a .src
    document.getElementById("fotoDePerfil").src = "/img/img_perfil.png";
  }
})


function encodeImageFileAsURL() { //Funcion para subir una imagen para el perfil y poderla utilizar. Codifica la imagen para poder utilizarla

  var filesSelected = document.getElementById("formFileSm").files; //Se detecta la imagen que se coloca en el input

  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.getElementById("fotoDePerfil");
      newImage.src = srcData;
      localStorage.setItem("photoPerfil", srcData);
    }
    fileReader.readAsDataURL(fileToLoad);
  }
}

