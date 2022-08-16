const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const cards = document.querySelector("#cards");

function autos() {
    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
            const h2 = document.getElementById("titulo-autos");
            h2.innerHTML = "Verás aquí todos los productos de la categoría " + data.catName;
            const cantidadDeProductos = data.products.length;
            console.log(data.products);
            let productos = data.products;
            let i = 0;

            for (let product of productos) {
                i++

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

autos();