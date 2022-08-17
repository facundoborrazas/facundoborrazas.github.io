const email = document.querySelector('#floatingInput'); /*Guardamos en una constante la etiqueta con id "floatingInput"*/
const contraseña = document.querySelector('#floatingPassword'); /*En esta guardamos la etiqueta con el id "floatingPassword"*/
const bttn = document.querySelector('#regBtn'); /*En esta ultima guardamos la rtiqueta con id "regBtn"*/

function showAlertSuccess() { /*Funcion para mostrar alerta de datos bien ingresados*/
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() { /*Funcion para mostrar alerta de datos mal ingresados*/
    document.getElementById("alert-danger").classList.add("show");
}


function passCaracteres() { /*Funcion que evala si el campo de la contraseña tiene más, o menos, caracteres de los que son necesarios para ingresar*/
    if (contraseña.value.length < 6) {
        return false;
    }
    else {
        return true;
    }
}

function verificarInput() { /*Funcion que evalua que al menos haya un caracter dentro del campo de email*/
    if (email.value.length < 1) {
        return false;
    }
    else {
        return true;
    }
}

bttn.addEventListener('click', function () { /*En la constante bttn agregamos el evento "click" 
para que utilizando las anteriores dos funciones nos muestre un mensaje de aprovacion o de 
desaprobacion segun si hicimos bien el logeo. En el caso positivo, nos llevara a la pantalla inicial
en el caso negativo nos recargará la pantalla de logeo*/
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

/*Google:*/

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }