const email = document.querySelector('#floatingInput'); /*Guardamos en una constante la etiqueta con id "floatingInput"*/
const contraseña = document.querySelector('#floatingPassword'); /*En esta guardamos la etiqueta con el id "floatingPassword"*/
const bttn = document.querySelector('#regBtn'); /*En esta ultima guardamos la rtiqueta con id "regBtn"*/

function showAlertSuccess() { /*Funcion para mostrar alerta de datos bien ingresados*/
    document.getElementById("alert-success").classList.add("show");
}

function showAlertEmailError() { /*Funcion para mostrar alerta de email mal ingresada*/
    document.getElementById("alert-danger-email").classList.add("show");
}

function showAlertPasswordError() { /*Funcion para mostrar alerta de contraseña mal ingresada*/
    document.getElementById("alert-danger-password").classList.add("show");
}


function passCaracteres() { /*Funcion que evala si el campo de la contraseña tiene más, o menos, caracteres de los que son necesarios para ingresar*/
    if (contraseña.value.length < 6) {
        showAlertPasswordError();
        return false;
    }
    else {
        return true;
    }
}

function verificarInput() { /*Funcion que evalua que al menos haya un caracter dentro del campo de email*/
    if (email.value.length < 1) {
        showAlertEmailError();
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
        let nombreUsusarioConArroba = email.value;
        localStorage.setItem("email", nombreUsusarioConArroba);
        let nombreUsuario = nombreUsusarioConArroba.indexOf("@");
        let nombreUsuarioExtraido = nombreUsusarioConArroba.substring(0,nombreUsuario);
        localStorage.setItem("usuario", nombreUsuarioExtraido[0].toUpperCase() + nombreUsuarioExtraido.substring(1));
        showAlertSuccess();
        setTimeout(() => {
            location.href = "index.html"
        }, 1000);
    }
    else {
        setInterval("location.reload()", 2500);
    }

});


//Boton de google 

function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)

    localStorage.setItem("usuario", data.name);
    localStorage.setItem("email", data.email);
    showAlertSuccess();
    setTimeout(() => {
        location.href = "index.html"
    }, 1000);

    console.log(data.name);
    console.log(data.sub);
    console.log(data.given_name);
    console.log(data.family_name);
    console.log(data.email);
    console.log(data.email_verified);
  
   // picture.setAttribute("src", data.picture)
  }

  window.onload = function () {
    const clientID = "41946208457-m2hsc97f16mm4p0j1f4tf7fpmfd4th3q.apps.googleusercontent.com";

    google.accounts.id.initialize({
      client_id: clientID,
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), {
      theme: "filled_black",
      size: "large",
      type: "standard",
      shape: "pill",
      locale: "es-419",
      logo_alignment: "left",
    } // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }