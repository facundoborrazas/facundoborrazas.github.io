const infoProduct = document.getElementById("cards");
const infoCardProduct = document.getElementById("infoCardProduct");
const carouselIndicators = document.getElementById("carouselIndicators");
const productosRelacionados = document.getElementById("productosRelacionados");
const comentariosDePersonas = document.getElementById("comentariosDePersonas");
//Constantes de puntajes
const puntaje5 = `
<p>Puntaje:
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
</p>`;
const puntaje4 = `
<p>Puntaje:
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
</p>`;
const puntaje3 = `
<p>Puntaje:
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</p>`;
const puntaje2 = `
<p>Puntaje:
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</p>`;
const puntaje1 = `
<p>Puntaje:
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</p>`;
const puntaje0 = `
<p>Puntaje:
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
</p>`;


async function tarjetasDeProductos() { //fetch que llama al .json del producto y se utiliza para hacer la tarjeta del producto
  try {
    const result = await fetch(PRODUCT_INFO_URL + localStorage.getItem("catIDP") + EXT_TYPE);
    const data = await result.json();

    /*Obtengo el objeto del .json*/
    const carousel = document.getElementById("carousel");
    const infoRelatedProducts = data.relatedProducts; //Constante que guarda la info de cada producto relacionado
    //Tarjeta con la info del producto
    cards.innerHTML =
      `
       <h5 class="card-title">${data.name} - ${data.currency} ${data.cost}</h5>
       <h6>${data.description}</h6>
       <p class="card-text">${data.soldCount} Vendidos</p>
       <a href="#" class="btn btn-primary">Comprar</a>
       <a href="#" class="btn btn-primary">Agregar al carrito</a>
     `
    //Carousel de fotos de cada producto
    for (i = 0; i < data.images.length; i++) {

      if (i === 0) {
        carouselIndicators.innerHTML = `
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${[i]}" class="active" aria-current="true" aria-label="Slide ${[i + 1]}"></button>
     `
      } else {
        carouselIndicators.innerHTML += `
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${[i]}" aria-label="Slide ${[i + 1]}"></button>
     `
      }

      if (i === 0) {
        carousel.innerHTML = `
        <div class="carousel-item active">
           <img src="${data.images[i]}" class="d-block w-100" alt="...">
        </div>
        `
      } else {
        carousel.innerHTML += `
       <div class="carousel-item">
         <img src="${data.images[i]}" class="d-block w-100" alt="...">
       </div>
      `
      }
    }
    //Tarjeta de los productos relacionados con su info correspondiente
    for (t = 0; t < data.relatedProducts.length; t++) {
      productosRelacionados.innerHTML += `
     <div class="card col-6">
       <div class="card-header text-center">
         <img src="${infoRelatedProducts[t].image}" alt="Imagen representativa de ${infoRelatedProducts[t].name}" style="width: 100%;">
       </div>
       <div class="card-body">
         <h5 class="card-title">${infoRelatedProducts[t].name}</h5>
         <a href="/product-info.html" class="btn btn-primary" onclick="setCatID(${infoRelatedProducts[t].id})">Ver Producto</a>
       </div>
     </div>
     `
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function comentariosDeOtrosUsuarios() { //Fetch para llamar a los comentarios de cada producto
  try {
    const result = await fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("catIDP") + EXT_TYPE);
    const data = await result.json();

    //For que publica cada comentario
    for (i = 0; i < data.length; i++) {
      comentariosDePersonas.innerHTML += `<li class="list-group-item">
      <h5 class="text-left text-capitalize">${data[i].user}:</h6>
      <p>${data[i].description}</p>
      <p><small>${data[i].dateTime}</small></p>
      </li>`
      if ((data[i].score) === 5) {
        comentariosDePersonas.innerHTML += puntaje5;
      } else if ((data[i].score) === 4) {
        comentariosDePersonas.innerHTML += puntaje4;
      } else if ((data[i].score) === 3) {
        comentariosDePersonas.innerHTML += puntaje3;
      } else if ((data[i].score) === 2) {
        comentariosDePersonas.innerHTML += puntaje2;
      } else if ((data[i].score) === 1) {
        comentariosDePersonas.innerHTML += puntaje1;
      } else if ((data[i].score) === 0) {
        comentariosDePersonas.innerHTML += puntaje0;
      }
    }
    //For que agrega el comentario hecho anteriormente
    for (i = 0; i < 6; i++) {
      if (localStorage.getItem("comentarioPropio" + i + localStorage.getItem("catIDP")) !== null) {
        comentariosDePersonas.innerHTML += localStorage.getItem("comentarioPropio" + i + localStorage.getItem("catIDP"));
      }
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

tarjetasDeProductos();
comentariosDeOtrosUsuarios();


//Funcion para obtener el id del producto relacionado y para que te redireccione a ese producto
function setCatID(id) {
  localStorage.setItem("catIDP", id);
  window.location = "products-info.html"

}

//Funcion para crear un comentario propio
document.getElementById("btnComentar").addEventListener("click", function () {
  const comentario = document.getElementById("comentar").value;
  const vaciarComentario = document.getElementById("comentar");
  const estrella_5 = document.getElementById("estrella5");
  const estrella_4 = document.getElementById("estrella4");
  const estrella_3 = document.getElementById("estrella3");
  const estrella_2 = document.getElementById("estrella2");
  const estrella_1 = document.getElementById("estrella1");
  const estrella_0 = document.getElementById("estrella0");
  //Esto se hace para estraer la hora
  let hoy = new Date();
  let año = hoy.getFullYear();
  let mes = (hoy.getMonth() + 1);
  let fecha = hoy.getDate();
  let hora = hoy.getHours();
  let minutos = hoy.getMinutes();
  let segundos = hoy.getSeconds();

  const comentarioHecho = `
  <li class="list-group-item">
  <h5 class="text-left text-capitalize">${localStorage.getItem("usuario")}:</h6>
  <p>${comentario}</p>
  <p><small>${año}-${mes}-${fecha} ${hora}:${minutos}:${segundos}</small></p>
  </li>
  `;

  if (comentario.length > 0) {
    if (estrella_5.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje5;
      localStorage.setItem("comentarioPropio5" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje5));
    } else if (estrella_4.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje4;
      localStorage.setItem("comentarioPropio4" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje4));
    } else if (estrella_3.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje3;
      localStorage.setItem("comentarioPropio3" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje3));
    } else if (estrella_2.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje2;
      localStorage.setItem("comentarioPropio2" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje2));
    } else if (estrella_1.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje1;
      localStorage.setItem("comentarioPropio1" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje1));
    } else if (estrella_0.checked) {
      comentariosDePersonas.innerHTML += comentarioHecho;
      comentariosDePersonas.innerHTML += puntaje0;
      localStorage.setItem("comentarioPropio0" + localStorage.getItem("catIDP"), (comentarioHecho + puntaje0));
    }
    vaciarComentario.value = "";
  }
})