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

                cards.innerHTML += `<div class="card-group" id="cards">
                <a href="/product-info.html" class="list-group-item list-group-item-action">
                <img src="${product.image}" class="card-img-top${i} img-products" alt="Imagen representativa de un auto">
                <div class="card-body">
                <h5 class="card-title${i}">${product.name} - ${product.cost}</h5>
                <p class="card-text${i}">${product.description}</p>
                <p class="card-text${i}"><small class="text-muted${i}">${product.soldCount}</small></p>
                </div>
                </a>
                </div>'
                `
            }

            /*for (var i = 0; i < cantidadDeProductos; i++) {
                 const img0 = document.querySelector(".card-img-top" + i );
                 img0.src = data["products"][i]["image"];
                 const title0 = document.querySelector(".card-title" + i);
                 title0.innerHTML = data["products"][i]["name"] + " - USD " + data["products"][i]["cost"];
                 const description0 = document.querySelector(".card-text" + i);
                 description0.innerHTML = data["products"][i]["description"];
                 const soldCount0 = document.querySelector(".text-muted" + i);
                 soldCount0.innerHTML = data["products"][i]["soldCount"] + " Vendidos";

                cards.innerHTML += '<div class="card-group" id="cards">' + '<img src="${data.product.image}" class="card-img-top0" alt="..."><a href="/product-info.html" class="list-group-item list-group-item-action"><div class="card-body"><h5 class="card-title0">Card title</h5><p class="card-text0">This is a wider card with supporting text below as a natural lead-in to additionalcontent. This content is a little bit longer.</p><p class="card-text0"><small class="text-muted0">Last updated 3 mins ago</small></p></div></a>' + '</div>'
           
            }
*/
        })
}

autos();