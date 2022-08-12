const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function autos() {
    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
            const h2 = document.getElementById("titulo-autos");
            h2.innerHTML = "Verás aquí todos los productos de la categoría " + data.catName;

            //Primer Auto
            const img0 = document.querySelector(".card-img-top0");
            img0.src = data["products"][0]["image"];
            const title0 = document.querySelector(".card-title0");
            title0.innerHTML = data["products"][0]["name"] + " - USD " + data["products"][0]["cost"];
            const description0 = document.querySelector(".card-text0");
            description0.innerHTML = data["products"][0]["description"];
            const soldCount0 = document.querySelector(".text-muted0");
            soldCount0.innerHTML = data["products"][0]["soldCount"] + " Vendidos";
        })
}

autos();