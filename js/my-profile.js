const nombreDeUsuario = document.getElementById("nombreDeUsuario"); //Nombre de usuario sacado con el email

const nombreUsuario = document.getElementById("nombreUsuario"); //Nombre verdadero del usuario
const apellidoUsuario = document.getElementById("apellidoUsuario"); //Apellido verdadero del usuario
const emailUsuario = document.getElementById("emailUsuario"); //Email con el que ingreso el usuario
const direccionUsuario = document.getElementById("direccionUsuario"); //Direccion del usuario
const numeroUsuario = document.getElementById("numeroUsuario");//Numero del usuario


const editarNombre = document.getElementById("editarNombre"); //Input para editar el nombre
const editarApellido = document.getElementById("editarApellido"); //Input para editar el apellido
const editarDireccions = document.getElementById("editarDireccions"); //Input para editar la direcion
const editarNumero = document.getElementById("editarNumero"); //Input para editar el numero

const fotoPerfil = document.getElementById("fotoPerfil"); //Boton para cambiar la foto de perfil
const urlPerfil = document.getElementById("urlPerfil"); //Input para cambiar la foto de perfil


nombreDeUsuario.innerHTML = `<p>${localStorage.getItem("usuario")}</p>`
emailUsuario.innerHTML += `<p class="fw-normal">${localStorage.getItem("email")}</p>`

document.addEventListener("DOMContentLoaded", function () {
    const OK0 = document.getElementById("OK0");
    const OK1 = document.getElementById("OK1");
    const OK3 = document.getElementById("OK3");
    const OK4 = document.getElementById("OK4");

    OK0.addEventListener("click", function () {
        if (editarNombre.value.length > 0) {
            localStorage.setItem("editarNombre", editarNombre.value);
            nombreUsuario.innerHTML = `<p class="mt-3 fw-bold">Nombre:</p><p class="fw-normal">${localStorage.getItem("editarNombre")}</p>`
        }
    })

    OK1.addEventListener("click", function () {
        if (editarApellido.value.length > 0) {
            localStorage.setItem("editarApellido", editarApellido.value);
            apellidoUsuario.innerHTML = `<p class="mt-3 fw-bold">Apellido:</p><p class="fw-normal">${localStorage.getItem("editarApellido")}</p>`
        }
    })

    OK3.addEventListener("click", function () {
        if (editarDireccions.value.length > 0) {
            localStorage.setItem("editarDireccions", editarDireccions.value);
            direccionUsuario.innerHTML = `<p class="mt-3 fw-bold">Diereccion:</p><p class="fw-normal">${localStorage.getItem("editarDireccions")}</p>`
        }
    })

    OK4.addEventListener("click", function () {
        if (editarNumero.value.length > 0) {
            localStorage.setItem("editarNumero", editarNumero.value);
            numeroUsuario.innerHTML = `<p class="mt-3 fw-bold">Apellido:</p><p class="fw-normal">${localStorage.getItem("editarNumero")}</p>`
        }
    })

    if (localStorage.getItem("editarNombre") !== null) {
        nombreUsuario.innerHTML = `<p class="mt-3 fw-bold">Nombre:</p><p class="fw-normal">${localStorage.getItem("editarNombre")}</p>`
    }
    if (localStorage.getItem("editarApellido") !== null) {
        apellidoUsuario.innerHTML = `<p class="mt-3 fw-bold">Apellido:</p><p class="fw-normal">${localStorage.getItem("editarApellido")}</p>`
    }
    if (localStorage.getItem("editarDireccions") !== null) {
        direccionUsuario.innerHTML = `<p class="mt-3 fw-bold">Dirección:</p><p class="fw-normal">${localStorage.getItem("editarDireccions")}</p>`
    }
    if (localStorage.getItem("editarNumero") !== null) {
        numeroUsuario.innerHTML = `<p class="mt-3 fw-bold">Número:</p><p class="fw-normal">${localStorage.getItem("editarNumero")}</p>`
    }

    for (i = 0; i < 6; i++) {
        comentariosHechos.innerHTML = `<p class="text-center mt-5 text-muted">No hay ningun comentario hecho</p>`;
        if (localStorage.getItem("comentarioPropio" + i + localStorage.getItem("catIDP")) !== null) {
            comentariosHechos.innerHTML ="";
            comentariosHechos.innerHTML += localStorage.getItem("comentarioPropio" + i + localStorage.getItem("catIDP"));
        }
      }
})


