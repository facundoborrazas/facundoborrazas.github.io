var costoDeProducto = 0;
var moneda = undefined;

async function compras() {
  try {
    const result = await fetch(CART_INFO_URL + "25801" + EXT_TYPE); //Llamo al json
    const data = await result.json(); //Lo utilizo

    //Genero un forEach para generar la tarjeta del producto del json
    data.articles.forEach(element => {
      console.log(element);
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


  } catch (error) {
    console.log("Error: " + error);
  }
}

function cantidad() { //Funcion para calcular el precio del producto llamado por el json 
  const cantidad = document.getElementById("cantidad"); //Se guarda en una constante la etiqueta con id=cantidad
  var costoDeProductoXcantidad = costoDeProducto * cantidad.value; //Se genera una variable que tendrá el valor del costo del producto por la cantidad elegida de productos
  document.getElementById("valorTotalPorProdcuto").innerHTML = moneda + " - " + (costoDeProductoXcantidad); // Luego se sustituye lo que habia en la etuiqueta con id=valorTotalPorProdcuto con el nuevo precio 
}

function cantidadProductoAgregado(id) { //Funcion para calcular el precio del producto comprado por nosotros mismos 
  const cantidad = document.getElementById("cantidad"+id); //Se guarda en una constante la etiqueta con id=cantidad+id
  var costoDeProductoAgregadoXcantidad = localStorage.getItem("costoProducto" + id) * cantidad.value; //Se genera una variable que tendrá el valor del costo del producto por la cantidad elegida de productos
  document.getElementById("valorTotalPorProdcuto"+id).innerHTML = localStorage.getItem("monedaProducto" + id) + " - " + (costoDeProductoAgregadoXcantidad); // Luego se sustituye lo que habia en la etuiqueta con id=valorTotalPorProdcuto+id con el nuevo precio
}

compras();

