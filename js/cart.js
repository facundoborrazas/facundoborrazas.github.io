var costoDeProducto = 0;
var moneda = undefined;

async function compras() {
  try {
    const result = await fetch(CART_INFO_URL + "25801" + EXT_TYPE);
    const data = await result.json();

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

      document.getElementById("productosEnCarrito").innerHTML = Peugeot208;

    });


    if ((localStorage.getItem("htmlDeProductos") === "") || (localStorage.getItem("htmlDeProductos") === null)) {
      document.getElementById("productosEnCarrito").innerHTML = document.getElementById("productosEnCarrito").innerHTML;
    } else {
      document.getElementById("productosEnCarrito").innerHTML = document.getElementById("productosEnCarrito").innerHTML + localStorage.getItem("htmlDeProductos");
    }


  } catch (error) {
    console.log("Error: " + error);
  }
}

function cantidad() {
  const cantidad = document.getElementById("cantidad");
  var costoDeProductoXcantidad = costoDeProducto * cantidad.value;
  document.getElementById("valorTotalPorProdcuto").innerHTML = moneda + " - " + (costoDeProductoXcantidad);
}

function cantidadProductoAgregado(id) {
  const cantidad = document.getElementById("cantidad"+id);
  var costoDeProductoAgregadoXcantidad = localStorage.getItem("costoProducto" + id) * cantidad.value;
  document.getElementById("valorTotalPorProdcuto"+id).innerHTML = localStorage.getItem("monedaProducto" + id) + " - " + (costoDeProductoAgregadoXcantidad);
}

compras();

