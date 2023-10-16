fetch("http://localhost:3000/products")
.then((response)=> response.json())
.then((data)=> console.log(data))
.catch((error) => console.error("Error:", error));


const reponse = await fetch("http://localhost:3000/products");
const book = await reponse.json();

const article = book[0];
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const imageElement = document.createElement("img");
imageElement.src = article.URL_image;
const synopsisElement = document.createElement("p");
synopsisElement.innerText = article.synopsis;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} €`;


const productContainer = document.createElement("div");
productContainer.appendChild(imageElement);
productContainer.appendChild(nomElement);
productContainer.appendChild(prixElement);
productContainer.appendChild(categorieElement);
productContainer.appendChild(synopsisElement)

const sectionFiches = document.getElementById("fiches");
sectionFiches.appendChild(productContainer);




//localStorage.setItem("bookName", "The book thief")
