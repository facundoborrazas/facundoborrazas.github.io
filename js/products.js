const URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json"; /*archivo .json a utilizar guardado en una constante para luego poder utilizar*/
const cards = document.querySelector("#cards"); /*Seleccionamos la etiqueta con la id "cards" y la guardamos en una constante para luego poder utilizar*/
const buscador = document.querySelector("#search");
const buscadorBtn = document.querySelector("#searchBtn");
const fondoProducto = document.querySelector("#encabezado");

/*Se hace una funcion para generar las tarjetas de cada producto utilizando el .json*/
function productos() {
  fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      /*Obtengo el objeto del .json*/

      // Esta es la presentacion de la categoria si no tienen ningun producto.
      const h2 = document.getElementById("titulosH2");
      h2.innerHTML = data.catName;
      const p = document.getElementById("titulo-autos"); /*Seleccionamos la etiqueta con la id "titulo-autos" y la guardamos en una constante para luego poder utilizar*/
      p.innerHTML = "Verás aquí todos los productos de la categoría."; /*Tomamos esta ultima constante y le decimos que ponga dentro de esa etiqueta lo siguiente*/

      const cantidadDeProductos = data.products.length; /*Guardo en una constante la cantidad de arrays del .json y lo guardo en una variable para luego utilizarlo*/
      console.log(data.products);
      let productos = data.products; /*Guardo en una variable el contenido de los arrays "products" del .json*/
      let i = 0; /*Iniciamos un contador*/

      // Y esto se muestra si la categoria tiene algun producto.
      fondoProducto.innerHTML = `
      <header class="text-center portadaProducts" id="encabezado" style="background-image: url(${data.products[0].image});">
      <div class="sombrePortadaProducts">
      <h2 class="fw-bolder letrasDelH2YP">${data.catName}</h2>
      <p id="titulo-autos" class="lead letrasDelH2YP">Verás aquí todos los productos de la categoría.</p>
      </div>
      </header>
    ` 

      for (let product of productos) { /*Utilizo un for of para recorrer la informacion de la variable "productos"*/
        i++ /*Se agrega 1 a la variable "i" por cada vuelta que hace el for of*/

        /*En la constante "cards" se ingresa el siguiente HTML que corresponde a cada tarjeta con su correspondiente informacion de cada producto*/
        cards.innerHTML += `
                <div class="card" style="width: 33.333%">
                <img src="${product.image}" class="card-img-top" alt="Imagen representativa de ${data.catName}" style="width: 100%;">
                <div class="card-body">
                  <h5 class="card-title">${product.name} - USD ${product.cost}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text}"><small class="text-muted">${product.soldCount} Vendidos</small></p>
                  <a href="/product-info.html" class="btn btn-primary">Ver</a>
                </div>
              </div>
                `
      }
    })
}

/*Se inicia la funcion*/
productos();

