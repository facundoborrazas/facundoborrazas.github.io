const URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json"; /*archivo .json a utilizar guardado en una constante para luego poder utilizar*/
const cards = document.querySelector("#cards"); /*Seleccionamos la etiqueta con la id "cards" y la guardamos en una constante para luego poder utilizar*/

/*Se hace una funcion para generar las tarjetas de cada producto utilizando el .json*/
function autos() {
  fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      /*Obtengo el objeto del .json*/
      const h2 = document.getElementById("titulo-autos"); /*Seleccionamos la etiqueta con la id "titulo-autos" y la guardamos en una constante para luego poder utilizar*/
      h2.innerHTML = "Verás aquí todos los productos de la categoría " + data.catName; /*Tomamos esta ultima constante y le decimos que ponga dentro de esa etiqueta lo siguiente*/
      const cantidadDeProductos = data.products.length; /*Guardo en una constante la cantidad de arrays del .json y lo guardo en una variable para luego utilizarlo*/
      console.log(data.products);
      let productos = data.products; /*Guardo en una variable el contenido de los arrays "products" del .json*/
      let i = 0; /*Iniciamos un contador*/

      for (let product of productos) { /*Utilizo un for of para recorrer la informacion de la variable "productos"*/
        i++ /*Se agrega 1 a la variable "i" por cada vuelta que hace el for of*/

        /*En la constante "cards" se ingresa el siguiente HTML que corresponde a cada tarjeta con su correspondiente informacion de cada producto*/
        cards.innerHTML += `
                <div class="card" style="width: 33.333%">
                <img src="${product.image}" class="card-img-top" alt="Imagen representativa de un auto" style="width: 100%;">
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
autos();