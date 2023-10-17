class Product {
    constructor(id, title, price, image, description = null) {
      this.id = id;
      this.description = description;
      this.title = title;
      this.price = price;
      this.image = image;
    }
    getPrice() {
      return this.price;
    }
    setPrice(value) {
      this.price = value;
    }
    getDescription() {
      return this.description;
    }
    setDescription(value) {
      this.description = value;
    }
    getImage() {
      return this.image;
    }
    getTemplate() {
      return `
                   <div class="product-image">
                      <img src="${this.image}">
                  </div>
                   <div class="product-details">
                  <div class="product-title">${this.title}</div>
                  <p class="product-description" style="margin-top: 20px;">${this.description}</p>
                      </div>
                   <div class="product-price">${this.price}</div>
               <div  class="product-quantity">
          <input id="quantity_${this.id}" type="number" value="1" min="1">
               </div>
              <div class="product-removal">
                  <button  id="btn_${this.id}" class="remove-product">
              Remove
           </button>
               </div>
          <div id="total_${this.id}" class="product-line-price"></div>
  `;
    }
  }
  
  class Row {
    constructor(product) {
      this.product = product;
      this.totalPrice = null;
      this.quantity = null;
    }
  }
  
  class Cart {
    constructor(rows = []) {
      this.rows = rows;
    }
  }
  
  let product = new Product(
    1,
    "Père riche, père pauvre - Edition 20e anniversaire",
    19.99,
    "https://m.media-amazon.com/images/I/716f1Rtx1CL._SY466_.jpg",
    "Père riche, Père pauvre – un livre qui : Brise le mythe selon lequel il faut gagner beaucoup d'argent pour devenir riche. Remet en question cette croyance voulant que votre maison est un actif."
  );
  let product2 = new Product(
    2,
    "Le pouvoir de la confiance en soi Broché",
    16.9,
    "https://m.media-amazon.com/images/I/61TQaLDkZZL._SY466_.jpg",
    "Avec ce livre, devenez une personne d'action, surmontez tous les obstacles et gravissez tous les sommets ! Le degré de confiance en soi détermine le degré d'ambition que l'on met dans chaque objectif que l'on se donne."
    
    );
  let products = [product, product2];
  let divProducts = document.getElementById("products");
  let cart = new Cart();
  
  for (const prod of products) {
    let row = document.createElement("div");
    let r = new Row(prod);
    cart.rows.push(r);
    row.className = "product";
    row.innerHTML = prod.getTemplate();
    divProducts.appendChild(row);
  
    let total = document.getElementById("total_" + prod.id);
    console.log(total);
    total.innerText = prod.price;
  
    let quantity = document.getElementById("quantity_" + prod.id);
    quantity.addEventListener("change", function () {
      //changer le prix total
      r.totalPrice = prod.price * quantity.value;
      r.quantity = quantity.value;
      total.innerText = prod.price * quantity.value;
    });
  
    let btn = document.getElementById("btn_" + prod.id);
    btn.addEventListener("click", function () {
      //changer le prix total
      divProducts.removeChild(row);
    });
  }