const urlParams = new URLSearchParams(window.location.search);
const wantedId = urlParams.get("id");

import { ProductService } from "../src/productService.js";
const productService = new ProductService();

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/article/" + wantedId)
    .then((response) => response.json())
    .then((product) => console.log(product))
    .then(function(product) {
      const nameElement = document.createElement("h2");
      nameElement.innerText = product.name;

      const authorsElement = document.createElement("h2");
      authorsElement.innerText = product.authors;

      const imageElement = document.createElement("img");
      imageElement.src = product.img;

      const synopsisElement = document.createElement("p");
      synopsisElement.innerText = product.synopsis;
      synopsisElement.style.maxWidth = "40%";
      synopsisElement.style.fontSize = "100%"

      const categoryElement = document.createElement("p");
      categoryElement.innerText = product.category;

      const priceElement = document.createElement("button");
      priceElement.innerText = `price: ${product.price} €`;
      priceElement.classList = "type_formats button-right"

      var featuresButtonsDiv = document.createElement('div');
      featuresButtonsDiv.id = 'features_buttons';
      var label = document.createElement('label');
      label.setAttribute('for', 'copies');
      label.textContent = 'Quantity :';
      var input = document.createElement('input');
      input.type = 'number';
      input.id = 'quantity_button';
      input.name = 'copies';
      input.min = '1';
      input.max = '9';
      var quantityButtonA = document.createElement('a');
      quantityButtonA.className = 'quantity_button';
      quantityButtonA.textContent = 'Quantity :';
      featuresButtonsDiv.appendChild(label);
      featuresButtonsDiv.appendChild(input);
      featuresButtonsDiv.appendChild(quantityButtonA);

      const productContainer = document.createElement("div");
      productContainer.appendChild(nomElement);
      productContainer.appendChild(authorsElement);
      productContainer.appendChild(imageElement);
      productContainer.appendChild(categoryElement);
      productContainer.appendChild(synopsisElement);
      productContainer.appendChild(priceElement);
      productContainer.appendChild(featuresButtonsDiv);


      const sectionFiches = document.getElementById("fiches");
      sectionFiches.appendChild(productContainer);
    })

     });
