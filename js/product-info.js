const infoProduct = document.getElementById("cards");
const infoCardProduct = document.getElementById("infoCardProduct");

fetch(PRODUCT_INFO_URL + localStorage.getItem("catIDP") + EXT_TYPE)
  .then((resp) => resp.json())
  .then((data) => {
    /*Obtengo el objeto del .json*/
    const carousel = document.getElementById("carousel");
    console.log(data);
    cards.innerHTML =
      `
        <h5 class="card-title">${data.name} - ${data.currency} ${data.cost}</h5>
        <h6>${data.soldCount} Vendidos</h6>
        <p class="card-text">${data.description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      `
    for (i = 0; i < data.images.length; i++) {
      carousel.innerHTML +=
        `
      <div class="carousel-item active">
      <img src="${data.images[i]}" class="d-block w-100" alt="...">
    </div>
      `
    }

  }
  )

/*
<div class="card text-center">
<div class="card-header">
  Featured
</div>
<div class="card-body">
  <h5 class="card-title">Special title treatment</h5>
  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
<div class="card-footer text-muted">
  2 days ago
</div>
</div>
*/


/*
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
*/