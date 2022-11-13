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
         <div class="col-3 col-lg-2 col-xl-2">
           <p class="text-start">
           ${element.name}
           <img src="${element.image}" alt="imagen ilustrativa de ${element.name}" style="max-width: 6rem; max-height: 6rem;">
           </p>
         </div>
         <div class="col-3 col-lg-3 col-xl-3">
           <p class="">${element.currency} - ${element.unitCost}</p>
         </div>
         <div class="col-3 col-lg-3 col-xl-3">
           <input type="number" min="1" id="cantidad" value="${element.count}" style="width : 3rem; heigth : 3rem" onchange="cantidad()">
         </div>
         <div class="col-3 col-lg-4 col-xl-4">
           <p class="fw-bold" id="valorTotalPorProdcuto">${moneda} - ${costoDeProducto}</p>
           <button type="button" class="btn btn-outline-danger"  id="borrar" style="width : 4rem; heigth : 4rem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                </svg>
          </button>
         </div>
       </div>
      `;

      document.getElementById("productosEnCarrito").innerHTML = Peugeot208; //Lo pongo en la etiqueta con el id productosEnCarrito

    });
    ;
    productAddToCart();




  } catch (error) {
    console.log("Error: " + error);
  }

}

let a = 0;

function productAddToCart() {
  let listToCart = JSON.parse(localStorage.getItem("addToCart")); //Traigo los productos comprados y los pongo en una lista

  for (i = 0; i <= listToCart.length; i++) {
    if (listToCart[i].name.length < 11) {
      document.getElementById("productosEnCarrito").innerHTML += `
      <div class="row justify-content-evenly list-group-item list-group-item-action">
       <div class="col-3 col-lg-2 col-xl-2">
         <p class="text-start" style="font-size: 1.3rem;">
         ${listToCart[i].name} 
         <img src="${listToCart[i].images}" alt="imagen ilustrativa de ${listToCart[i].name}" style="max-width: 6rem; max-height: 6rem;">
         </p>
       </div>
       <div class="col-3 col-lg-3 col-xl-3">
         <p >${listToCart[i].currency} - ${listToCart[i].cost}</p>
       </div>
       <div class="col-3 col-lg-3 col-xl-3">
         <input type="number" min="1" id="cantidad${listToCart[i].id}" value="${listToCart[i].count}" style="width : 3rem; heigth : 3rem" onchange="subTotalUnit(${listToCart[i].id},${listToCart[i].cost})">
       </div>
       <div class="col-3 col-lg-4 col-xl-4">
         <p class="fw-bold valorDeProducto" id="valorTotalPorProdcuto${listToCart[i].id}">${listToCart[i].currency} - ${listToCart[i].cost}</p>
         <button type="button" class="btn btn-outline-danger"  id="borrar${listToCart[i].id}" onclick="deleteProduct(${i})" style="width : 4rem; heigth : 4rem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                </svg>
          </button>
         </div>
     </div>
    `;
    } else {
      document.getElementById("productosEnCarrito").innerHTML += `
      <div class="row justify-content-evenly list-group-item list-group-item-action">
       <div class="col-3 col-lg-2 col-xl-2">
         <p class="text-start">
         ${listToCart[i].name} 
         <img src="${listToCart[i].images}" alt="imagen ilustrativa de ${listToCart[i].name}" style="max-width: 6rem; max-height: 6rem;">
         </p>
       </div>
       <div class="col-3 col-lg-3 col-xl-3">
         <p >${listToCart[i].currency} - ${listToCart[i].cost}</p>
       </div>
       <div class="col-3 col-lg-3 col-xl-3">
         <input type="number" min="1" id="cantidad${listToCart[i].id}" value="${listToCart[i].count}" style="width : 3rem; heigth : 3rem" onchange="subTotalUnit(${listToCart[i].id},${listToCart[i].cost})">
       </div>
       <div class="col-3 col-lg-4 col-xl-4">
         <p class="fw-bold valorDeProducto" id="valorTotalPorProdcuto${listToCart[i].id}">${listToCart[i].currency} - ${listToCart[i].cost}</p>
         <button type="button" class="btn btn-outline-danger"  id="borrar${listToCart[i].id}" onclick="deleteProduct(${i})" style="width : 4rem; heigth : 4rem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                </svg>
          </button>
         </div>
     </div>
    `;
    }

    if (a === 0) {
      a = parseInt(listToCart[i].cost);
      document.getElementById("subTotalGral").innerHTML = "USD - " + a;
    } else {
      a = a + parseInt(listToCart[i].cost);
      document.getElementById("subTotalGral").innerHTML = "USD - " + a;
    }

    /*if((listToCart[i].count).change){
      console.log("a");
    }
    */

  }
}


function deleteProduct(i) {
  let listToCart = JSON.parse(localStorage.getItem("addToCart"));
  listToCart.splice(i, 1);
  localStorage.setItem("addToCart", JSON.stringify(listToCart));
  location.reload();

}

function subTotalUnit(id, cost) {
  let count = document.getElementById("cantidad" + id).value;
  localStorage.setItem("count" + id, count);
  let price = document.getElementById("valorTotalPorProdcuto" + id);
  price.innerHTML = "USD - " + (count * cost);
  let p = a - (parseInt(cost)) + (parseInt(count * cost));
  document.getElementById("subTotalGral").innerHTML = "USD - " + p;
}


var costoDeProductoXcantidad = 0;

function cantidad() { //Funcion para calcular el precio del producto llamado por el json 
  const cantidad = document.getElementById("cantidad"); //Se guarda en una constante la etiqueta con id=cantidad
  costoDeProductoXcantidad = costoDeProducto * cantidad.value; //Se genera una variable que tendrá el valor del costo del producto por la cantidad elegida de productos
  document.getElementById("valorTotalPorProdcuto").innerHTML = moneda + " - " + (costoDeProductoXcantidad); // Luego se sustituye lo que habia en la etuiqueta con id=valorTotalPorProdcuto con el nuevo precio 

}

compras();



// Validaciones:

// Example starter JavaScript for disabling form submissions if there are invalid fields
// Validacion de boostrap
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
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