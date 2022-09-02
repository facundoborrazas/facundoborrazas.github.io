const cards = document.querySelector("#cards"); /*Seleccionamos la etiqueta con la id "cards" y la guardamos en una constante para luego poder utilizar*/
const buscador = document.querySelector("#search");
const buscadorBtn = document.querySelector("#searchBtn");
const fondoProducto = document.querySelector("#encabezado");
const btnMin = document.querySelector("#rangeFilterCountMin");
const enlacesProductos = document.querySelector("#linkProduct");
const resultado = document.querySelector("#resultado");


/*fetch para generar la lista de busqueda*/
fetch(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE)
  .then((resp) => resp.json())
  .then((data) => {
    /*Obtengo el objeto del .json*/
    // Buscador
    const productos = data.products;
    const filtro = () => {
      resultado.innerHTML = "";

      const texto = buscador.value.toLowerCase();
      for (let products of productos) {
        let nombre = products.name.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
          resultado.innerHTML += ` 
          <ul class="list-group row row-1 mb-1">
            <li class="list-group-item col-3"><a href="/product-info.html" style="text-decoration: none;" onclick="setCatID(${products.id})">${products.name} - USD ${products.cost}</a></li>
          </ul>
          `
        }
      }

      if (texto === "") {
        resultado.innerHTML = " ";
      }

      if (resultado.innerHTML === "") {
        resultado.innerHTML += ` 
        <li>Producto no encontrado...</li>
        `
      }
    }

    buscador.addEventListener("keyup", filtro);
  })


/*fetch para generar las portadas de cada categoria utilizando el .json*/
fetch(CATEGORIES_URL)
  .then((resp) => resp.json())
  .then((data) => {
    /*Obtengo el objeto del .json*/
    const portadaCategoría = data[localStorage.getItem("catID") - 101];

    fondoProducto.innerHTML = `
        <header class="text-center portadaProducts" id="encabezado" style="background-image: url(${portadaCategoría.imgSrc});">
        <div class="sombrePortadaProducts">
        <h2 class="fw-bolder letrasDelH2YP">${portadaCategoría.name}</h2>
        <p id="titulo-autos" class="lead letrasDelH2YP">Verás aquí todos los productos de la categoría.</p>
        </div>
        </header>
      `
  }
  )

// Aquí empieza el filtro 

const ORDER_ASC_BY_NAME = "AZ"; // Orden ascendente 
const ORDER_DESC_BY_NAME = "ZA"; // Orden descendente 
const ORDER_BY_PROD_COUNT = "Cant."; // Orden cantidad vendida 
const ORDER_BY_PROD_COST_DOWN = "Menos$"; // Orden menos precio 
const ORDER_BY_PROD_COST_UP = "Mas$"; // Orden mas precio 
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Funcion para ordenar los productos 

function sortCategories(criteria, array) {
  let result = [];
  // Si el criterio es el Orden ascendente 
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {  // Si el criterio es el Orden descendente 
    result = array.sort(function (a, b) {
      if (a.name > b.name) { return -1; }
      if (a.name < b.name) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) { // Si el criterio es el Orden cantidad vendida
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COST_DOWN) { // Si el criterio es el Orden menos precio
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COST_UP) { // Si el criterio es el Orden mas precio
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount < bCount) { return -1; }
      if (aCount > bCount) { return 1; }
      return 0;
    });
  }

  return result;
}

function setCatID(id) {
  localStorage.setItem("catIDP", id);
  window.location = "products-info.html"

}

// Funcion para mostrar los productos segun el filtro usado 

function showCategoriesList() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

      htmlContentToAppend += `
              <div class="card m-1" style="width: 33.333% ">
              <img src="${category.image}" class="card-img-top" alt="Imagen representativa de ${category.name}" style="width: 100%;">
              <div class="card-body">
                <h5 class="card-title">${category.name} - USD ${category.cost}</h5>
                <p class="card-text">${category.description}</p>
                <p class="card-text}"><small class="text-muted">${category.soldCount} Vendidos</small></p>
                <a href="/product-info.html" id="linkProduct" class="btn btn-primary" onclick="setCatID(${category.id})">Ver</a>
              </div>
            </div>
              `
    }
    cards.innerHTML = htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  //Muestro las categorías ordenadas
  showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data.products
      showCategoriesList()
      //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document.getElementById("sortByCostDown").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COST_DOWN);
  });

  document.getElementById("sortByCostUp").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COST_UP);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList();
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }

    showCategoriesList();

  });

});


