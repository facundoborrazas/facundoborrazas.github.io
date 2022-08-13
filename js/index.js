document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

/*import {seccionAbierta} from "./login";

function seccionIniciada(){
    if( seccionAbierta === 0){
        location.href = "login.html";
    }
    else{
        location.href = "index.html";
    }
}

seccionIniciada();*/