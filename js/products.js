const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function autos() {
    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => {
            const h2 = document.getElementById("titulo-autos");
            h2.innerHTML = "Verás aquí todos los productos de la categoría " + data.catName;

            for(var i = 0; i < 5; i++){
                const img0 = document.querySelector(".card-img-top" + i );
                img0.src = data["products"][i]["image"];
                const title0 = document.querySelector(".card-title" + i);
                title0.innerHTML = data["products"][i]["name"] + " - USD " + data["products"][i]["cost"];
                const description0 = document.querySelector(".card-text" + i);
                description0.innerHTML = data["products"][i]["description"];
                const soldCount0 = document.querySelector(".text-muted" + i);
                soldCount0.innerHTML = data["products"][i]["soldCount"] + " Vendidos";
            }
            
        })
}

autos();