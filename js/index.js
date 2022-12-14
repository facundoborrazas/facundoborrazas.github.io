document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function inicioDeSeccion() {
    const conocido = localStorage.getItem("usuario");
    if (conocido != "") {
        var perfil = document.getElementById("barraDeUsuario");
        if ((localStorage.getItem("photoPerfil") === "")||(localStorage.getItem("photoPerfil") === null)) {
            perfil.innerHTML = `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img/img_perfil.png" alt="" width="30" height="24"> ${localStorage.getItem("usuario")} 
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="./my-profile.html">Perfil</a></li>
                <li><a class="dropdown-item" href="./cart.html">Carrito</a></li>
                <li><a class="dropdown-item" href="./login.html">Cerrar Seccion</a></li>
            </ul>
            </li>
            `
        }else if((localStorage.getItem("photoPerfil") !== "")||(localStorage.getItem("photoPerfil") !== null)){
            perfil.innerHTML = `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${localStorage.getItem("photoPerfil")}" alt="" width="30" height="24" style="border-radius: 50%;"> ${localStorage.getItem("usuario")} 
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="./my-profile.html">Perfil</a></li>
                <li><a class="dropdown-item" href="./cart.html">Carrito</a></li>
                <li><a class="dropdown-item" href="./login.html">Cerrar Seccion</a></li>
            </ul>
            </li>
            `
        }
        
        
    }
    if(conocido === null) {
        location.href="./login.html";
    } 
}

inicioDeSeccion();