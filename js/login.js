const email = document.querySelector('#floatingInput');
const contraseña = document.querySelector('#floatingPassword');
const bttn = document.querySelector('#regBtn');
/*export var seccionAbierta;*/

bttn.addEventListener('click', function () {
    if (passCaracteres() && verificarInput()) {
        showAlertSuccess();
        setTimeout(() => {
            location.href = "index.html"
        }, 1000);
        var seccionAbierta = 1;
    }
    else {
        showAlertError();
        setInterval("location.reload()", 1000);
    }

});



function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


function passCaracteres() {
    if (contraseña.value.length < 6) {
        return false;
    }
    else {
        return true;
    }
}

function verificarInput() {
    if (email.value.length < 1) {
        return false;
    }
    else {
        return true;
    }
}