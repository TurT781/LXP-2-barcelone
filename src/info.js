/*
fetch("http://localhost:3000/products")
.then((response)=> response.json())
.then((data)=> console.log(data))
.catch((error) => console.error("Error:", error));


const reponse = await fetch("http://localhost:3000/products");
const book = await reponse.json();

const article = book[0];
const nomElement = document.createElement("h2");
nameElement.innerText = article.name;
const imageElement = document.createElement("img");
imageElement.src = article.URL_image;
const synopsisElement = document.createElement("p");
synopsisElement.innerText = article.synopsis;
const categoryElement = document.createElement("p");
categoryElement.innerText = article.category;
const priceElement = document.createElement("p");
priceElement.innerText = `price: ${article.price} €`;


const productContainer = document.createElement("div");
productContainer.appendChild(imageElement);
productContainer.appendChild(nameElement);
productContainer.appendChild(priceElement);
productContainer.appendChild(categoryElement);
productContainer.appendChild(synopsisElement)

const sectionFiches = document.getElementById("fiches");
sectionFiches.appendChild(productContainer);
*/

const urlParams = new URLSearchParams(window.location.search);
const wantedId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/article/" + wantedId)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then(function(data) {
      const nameElement = document.createElement("h2");
      nameElement.innerText = data.name;
      const authorsElement = document.createElement("h2");
      authorsElement.innerText = data.authors;
      const imageElement = document.createElement("img");
      imageElement.src = data.img;
      const synopsisElement = document.createElement("p");
      synopsisElement.innerText = data.synopsis;
      const categoryElement = document.createElement("p");
      categoryElement.innerText = data.category;
      const priceElement = document.createElement("p");
      priceElement.innerText = `price: ${data.price} €`;

      const productContainer = document.createElement("div");
      productContainer.appendChild(nomElement);
      productContainer.appendChild(authorsElement);
      productContainer.appendChild(imageElement);
      productContainer.appendChild(categoryElement);
      productContainer.appendChild(synopsisElement);
      productContainer.appendChild(priceElement);


      const sectionFiches = document.getElementById("fiches");
      sectionFiches.appendChild(productContainer);
    })

     });




//localStorage.setItem("bookName", "The book thief")
