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
        this.totalPrice = 1;
        this.quantity = 1;
        this.id = product.id;
    }
}

class Cart {
    constructor(rows = []) {
        this.rows = rows;
    }
}

let products = JSON.parse(localStorage.getItem("cart")) || [];
let divProducts = document.getElementById("products");
let cart = new Cart();


for (const pr of products) {
    const prod = new Product(pr.id, pr.title, pr.price, pr.image, pr.description);
    let row = document.createElement("div");
    const is_prod_exist = cart.rows.find((produit) => produit.id == prod.id)
    let r
    if (!is_prod_exist) {
        r = new Row(prod);
        cart.rows.push(r);
        row.className = "product";
        row.innerHTML = prod.getTemplate();
        divProducts.appendChild(row);
    } else {
        is_prod_exist.quantity = is_prod_exist.quantity + 1
        is_prod_exist.totalPrice = is_prod_exist.quantity * prod.price
        r = is_prod_exist
    }

    let total = document.getElementById("total_" + prod.id);
    if (total) total.innerText = prod.price;


    let quantity = document.getElementById("quantity_" + prod.id);

    if (quantity) {
        quantity.value = r.quantity; // Update the quantity field value
        total.innerText = r.totalPrice.toFixed(2); // Update the total with two decimal places

        quantity.addEventListener("change", function (event) {
            // Update the quantity in the Row object
            r.quantity = parseInt(this.value);
            // Update the total in the Row object
            r.totalPrice = r.quantity * prod.price;
            // Update the total display with two decimal places
            total.innerText = r.totalPrice.toFixed(2);
            // Update the local storage
            localStorage.setItem("cart", JSON.stringify(cart.rows));
            console.log(cart.rows);
        });
    }


    if (quantity) {
        quantity.value = r.quantity; // Mettez à jour la valeur du champ de quantité
        total.innerText = (r.totalPrice).toFixed(2); // Mettez à jour le total avec deux décimales
        quantity.addEventListener("change", function (event) {
            // Mettez à jour la quantité dans l'objet Row
            r.quantity = parseInt(this.value);
            // Mettez à jour le total dans l'objet Row
            r.totalPrice = r.quantity * prod.price;
            // Mettez à jour l'affichage du total avec deux décimales
            total.innerText = r.totalPrice.toFixed(2);
            // Mettez à jour le stockage local
            localStorage.setItem("cart", JSON.stringify(cart.rows));
            console.log(cart.rows);
        });
    }

    let btn = document.getElementById("btn_" + prod.id);
    if (btn) btn.addEventListener("click", function () {
        //change total price
        cart.rows = cart.rows.filter(x => x.id !== prod.id);

        let products = JSON.parse(localStorage.getItem("cart")) || [];
        let divProducts = document.getElementById("products");
        let cart = new Cart();

        for (const pr of products) {
            // Create a new instance of the Product class
            const prod = new Product(pr.id, pr.title, pr.price, pr.image, pr.description);

            let row = document.createElement("div");
            const is_prod_exist = cart.rows.find((produit) => produit.id == prod.id)
            let r
            // Supprimer le produit du panier
            cart.rows = cart.rows.filter(x => x.id !== prod.id);

            // Mettre à jour l'affichage du panier
            updateCartSubtotal();
            updateCartTax();
            updateCartTotal();

            // Mettre à jour le stockage local
            localStorage.setItem("cart", JSON.stringify(cart.rows));

            if (!is_prod_exist) {
                r = new Row(prod);
                cart.rows.push(r);
                row.className = "product";
                row.innerHTML = prod.getTemplate();
                divProducts.appendChild(row);
            } else {
                is_prod_exist.quantity = is_prod_exist.quantity + 1
                is_prod_exist.totalPrice = is_prod_exist.quantity * prod.price
                r = is_prod_exist
            }

            let total = document.getElementById("total_" + prod.id);
            if (total) total.innerText = prod.price;

            let quantity = document.getElementById("quantity_" + prod.id);

            if (quantity) {
                quantity.value = r.quantity; // Update the quantity field value
                total.innerText = r.totalPrice.toFixed(2); // Update the total with two decimal places

                quantity.addEventListener("change", function (event) {
                    // Update the quantity in the Row object
                    r.quantity = parseInt(this.value);
                    // Update the total in the Row object
                    r.totalPrice = r.quantity * prod.price;
                    // Update the total display with two decimal places
                    total.innerText = r.totalPrice.toFixed(2);
                    // Update the local storage
                    localStorage.setItem("cart", JSON.stringify(cart.rows));

                });
            }

            //-----//-----//-----//-----//-----//-----//-----//-----//-----//-----

            //-----//-----//-----//-----//-----//-----//-----//-----//-----//-----

        }

    });

}
const updateCartSubtotal = () => {
    const cartSubtotal = document.getElementById("cart-subtotal");

    // Calculate the subtotal
    let subtotal = 0;
    for (const row of cart.rows) {
        subtotal += row.totalPrice;
    }
    console.log(subtotal);

    // Update the subtotal in the HTML
    cartSubtotal.textContent = subtotal.toFixed(2);
};
//  À l'initialisation de la page, mettez à jour les taxes

const updateCartTax = () => {
    const cartTax = document.getElementById("cart-tax");

    // Calculate the tax (5% of the subtotal)
    let subtotal = 0;
    for (const row of cart.rows) {
        subtotal += row.totalPrice;
    }

    const tax = 0.05 * subtotal; // Calculate the tax (5%)
    // Update the tax in the HTML
    cartTax.textContent = tax.toFixed(2);

};
const updateCartTotal = () => {
    const cartTotal = document.getElementById("cart-total");

    // Calculate the subtotal
    let subtotal = 0;
    for (const row of cart.rows) {
        subtotal += row.totalPrice;
    }

    const tax = 0.05 * subtotal; // Calculate the tax (5%)
    const shipping = 10; // Shipping cost

    const total = subtotal + tax + shipping; // Calculate the total

    // Update the total in the HTML
    cartTotal.textContent = total.toFixed(2);
};


window.addEventListener("load", () => {
    updateCartSubtotal();
    updateCartTax();
    updateCartTotal();
})

const buttonCheckout = document.getElementById("checkout")
buttonCheckout.addEventListener("click", function () {
    function calculateAmount() {
        let amount = 0;
        for (const row of cart.rows) {
            amount += row.totalPrice;
        }
        return amount;
    }

    // Créer une promesse pour le calcul du montant
    const calculateAmountPromise = new Promise((resolve) => {
        resolve(calculateAmount());
    });

    // Une fois que le montant est calculé, construire l'URL et ouvrir la nouvelle fenêtre
    calculateAmountPromise.then((amount) => {
        const url = `checkout.html?amount=${amount}`;
        console.log(url);
        const popup = window.open(url, "Checkout");
    });

})
loadProductsFromLocalStorage();
updateCartSubtotal();
updateCartTax();
updateCartTotal();
