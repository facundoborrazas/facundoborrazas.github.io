var costoDeProducto = 0;
var moneda = undefined;

async function compras() {
  try {
    const result = await fetch(CART_INFO_URL + "25801" + EXT_TYPE); //Llamo al json
    const data = await result.json(); //Lo utilizo

    //Podemos llamar una funcion acá


    //Genero un forEach para generar la tarjeta del producto del json
    data.articles.forEach(element => {
      costoDeProducto = element.unitCost;
      moneda = element.currency;

      const Peugeot208 = `
      <div class="row justify-content-evenly list-group-item list-group-item-action">
         <div class="col-3">
           <p class="text-start">
           ${element.name}
           <img src="${element.image}" alt="imagen ilustrativa de ${element.name}" style="max-width: 10rem; max-height: 10rem;">
           </p>
           
         </div>
         <div class="col-3">
           <p class="">${element.currency} - ${element.unitCost}</p>
         </div>
         <div class="col-3">
           <input type="number" min="1" id="cantidad" value="${element.count}" style="width : 3rem; heigth : 3rem" onchange="cantidad()">
         </div>
         <div class="col-3">
           <p class="fw-bold" id="valorTotalPorProdcuto">${moneda} - ${costoDeProducto}</p>
         </div>
       </div>
      `;

      document.getElementById("productosEnCarrito").innerHTML = Peugeot208; //Lo pongo en la etiqueta con el id productosEnCarrito

    });


    if ((localStorage.getItem("htmlDeProductos") === "") || (localStorage.getItem("htmlDeProductos") === null)) { //Si el localstorage de htmlDeProductos esta vacio o nulo
      document.getElementById("productosEnCarrito").innerHTML = document.getElementById("productosEnCarrito").innerHTML; // Se deja todo como estaba
    } else {
      document.getElementById("productosEnCarrito").innerHTML = document.getElementById("productosEnCarrito").innerHTML + localStorage.getItem("htmlDeProductos"); //Si no se agrega el localstorage de htmlDeProductos
    }

    //Funcion de checkbox de la tarjeta de credito
    document.getElementById("tarjetaDeCredito").addEventListener("click", function () {

      document.getElementById("numeroDeCuenta").setAttribute("disabled", "");

      if (document.getElementById("numeroDeTarjeta").disabled) {
        document.getElementById("numeroDeTarjeta").removeAttribute("disabled", "");
        document.getElementById("CodigoDeSeguridad").removeAttribute("disabled", "");
        document.getElementById("Vencimiento").removeAttribute("disabled", "");
      }

    });

    //Funcion de checkbox de la transferencia bancaria
    document.getElementById("transferenciaBancaria").addEventListener("click", function () {

      document.getElementById("numeroDeTarjeta").setAttribute("disabled", "");
      document.getElementById("CodigoDeSeguridad").setAttribute("disabled", "");
      document.getElementById("Vencimiento").setAttribute("disabled", "");

      if (document.getElementById("numeroDeCuenta").disabled) {
        document.getElementById("numeroDeCuenta").removeAttribute("disabled", "");
      }

    });

    //Funcion para cambiar "no se ha seleccionado" a tarjeta de credito o transferencia bancaria segun lo que hayas elegido
    document.getElementById("cerrarGuardar").addEventListener("click", function () {
      if (document.getElementById("transferenciaBancaria").checked) {
        document.getElementById("selectFormaDePago").innerHTML = `
        <p>
        Transferencia Bancaria
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Seleccionar
          </button>
          </p>
        `
      } else if (document.getElementById("tarjetaDeCredito").checked) {
        document.getElementById("selectFormaDePago").innerHTML = `
        <p>
        Tarjeta de Credito
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Seleccionar
          </button>
          </p>
        `
      }

    });


  } catch (error) {
    console.log("Error: " + error);
  }
  
}

var costoDeProductoXcantidad = 0;

function cantidad() { //Funcion para calcular el precio del producto llamado por el json 
  const cantidad = document.getElementById("cantidad"); //Se guarda en una constante la etiqueta con id=cantidad
  costoDeProductoXcantidad = costoDeProducto * cantidad.value; //Se genera una variable que tendrá el valor del costo del producto por la cantidad elegida de productos
  document.getElementById("valorTotalPorProdcuto").innerHTML = moneda + " - " + (costoDeProductoXcantidad); // Luego se sustituye lo que habia en la etuiqueta con id=valorTotalPorProdcuto con el nuevo precio 
  
}

//const cantidad 
var costoDeProductoAgregadoXcantidad = 0;

function cantidadProductoAgregado(id) { //Funcion para calcular el precio del producto comprado por nosotros mismos 
  const cantidad = document.getElementById("cantidad" + id); //Se guarda en una constante la etiqueta con id=cantidad+id
  costoDeProductoAgregadoXcantidad = localStorage.getItem("costoProducto" + id) * cantidad.value; //Se genera una variable que tendrá el valor del costo del producto por la cantidad elegida de productos
  document.getElementById("valorTotalPorProdcuto" + id).innerHTML = localStorage.getItem("monedaProducto" + id) + " - " + (costoDeProductoAgregadoXcantidad); // Luego se sustituye lo que habia en la etuiqueta con id=valorTotalPorProdcuto+id con el nuevo precio
  localStorage.setItem("precioProductoAgregado" + id, localStorage.getItem("monedaProducto" + id) + " - " + (localStorage.getItem("costoProducto" + id) * cantidad.value));
  
  
 
}

compras();

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        console.log(event.target[9].value);
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

document.getElementById("finalizarCompra").addEventListener("click", function () { //Evento agregado al click de finalizar compra para la verificacion de la forma de pago

  if (document.getElementById("transferenciaBancaria").checked) { //Si el input de transferencia bancaria esta seleccionado
    if (document.getElementById("numeroDeCuenta").value !== "") { //Si el input de numero de cuenta no esta vacío 
      document.getElementById("selectFormaDePago").innerHTML = `
      <p>Transferencia Bancaria
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        required>
        Seleccionar
        </button>
      </p>
      <p class="text-success">Forma de pago seleccionada aceptada</p>
      `
      validatedInputs();

    } else { //Si solo esta seleccionado el input de transferencia bancaria pero el input de numero de cuenta esta vacío
      document.getElementById("selectFormaDePago").innerHTML = `
      <p>Transferencia Bancaria
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        required>
        Seleccionar
        </button>
      </p>
      <p class="text-danger">Forma de pago seleccionada aceptada, pero debe rellenar los datos</p>
      `
    }

  } else if (document.getElementById("tarjetaDeCredito").checked) { //Si el input de tarjeta de credito esta seleccionado
    if ((document.getElementById("numeroDeTarjeta").value !== "") || (document.getElementById("CodigoDeSeguridad").value !== "") || (document.getElementById("Vencimiento").value !== "")) { //Si los inputs de tarjeta de credito no esta vacío
      document.getElementById("selectFormaDePago").innerHTML = `
      <p>Tarjeta de Credito
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        required>
        Seleccionar
        </button>
      </p>
      <p class="text-success">Forma de pago seleccionada aceptada</p>
      `
      validatedInputs();
    } else { //Si solo esta seleccionado el input de tarjeta de credito pero los inputs estan vacío
      document.getElementById("selectFormaDePago").innerHTML = `
      <p>Tarjeta de Credito
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        required>
        Seleccionar
        </button>
      </p>
      <p class="text-danger">Forma de pago seleccionada aceptada, pero debe rellenar los datos</p>
    `
    }

  }
  else { //Si ni siquiera se ha seleccionado nada
    document.getElementById("selectFormaDePago").innerHTML = `
    <p>No se ha seleccionado
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
      required>
      Seleccionar
      </button>
    </p>
    <p class="text-danger">Debe seleccionar una forma de pago</p>
    `
  }

});

function validatedInputs() {

  //If para evaluar si estan todos los inputs estan marcados para hacer una compra exitosa
  if ((document.getElementById("invalidCheck00").checked || document.getElementById("invalidCheck01").checked || document.getElementById("invalidCheck02").checked) && document.getElementById("validationCustom01").value !== "" && document.getElementById("validationCustom02").value !== "" && document.getElementById("validationCustom03").value !== "") {
    document.getElementById("main").innerHTML += `
    <div class="alert alert-success" role="alert">
      ¡Haz comprado con exito!
    </div>`
    setTimeout(() => {
      location.href = "cart.html"
    }, 1000);
  }

}