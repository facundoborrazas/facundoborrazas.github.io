// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  if ((localStorage.getItem("nombreUser") !== "")) {
    document.getElementById("validationCustom01").value = localStorage.getItem("nombreUser");
  }
  if ((localStorage.getItem("apellidoUser") !== "")) {
    document.getElementById("validationCustom02").value = localStorage.getItem("apellidoUser");
  }
  if ((localStorage.getItem("emailUser") !== "")) {
    document.getElementById("validationCustom03").value = localStorage.getItem("emailUser");
  }
  if ((localStorage.getItem("2doNombreUser") !== "")) {
    document.getElementById("validationCustom04").value = localStorage.getItem("2doNombreUser");
  }
  if ((localStorage.getItem("2doApellidoUser") !== "")) {
    document.getElementById("validationCustom05").value = localStorage.getItem("2doApellidoUser");
  }
  if ((localStorage.getItem("telUser") !== "")) {
    document.getElementById("validationCustom06").value = localStorage.getItem("telUser");
  }
  if ((localStorage.getItem("photoPerfil") !== "")) {
    document.getElementById("fotoDePerfil").src = localStorage.getItem("photoPerfil");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if ((localStorage.getItem("photoPerfil") === "")||(localStorage.getItem("photoPerfil") === null)) {
      document.getElementById("fotoDePerfil").src = "/img/img_perfil.png";
    }
  })


  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      localStorage.setItem("nombreUser", document.getElementById("validationCustom01").value);
      localStorage.setItem("apellidoUser", document.getElementById("validationCustom02").value);
      localStorage.setItem("emailUser", document.getElementById("validationCustom03").value);
      localStorage.setItem("2doNombreUser", document.getElementById("validationCustom04").value);
      localStorage.setItem("2doApellidoUser", document.getElementById("validationCustom05").value);
      localStorage.setItem("telUser", document.getElementById("validationCustom06").value);
      form.classList.add('was-validated')
    }, false)
  })


})()

document.getElementById("nombreDeUsuario").innerHTML += `<p>${localStorage.getItem("usuario")}</p>`


function encodeImageFileAsURL() {

  var filesSelected = document.getElementById("formFileSm").files;

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

