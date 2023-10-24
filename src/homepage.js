import { ProductService } from "../src/productService.js";
const productService = new ProductService();

productService.getApi().then((products) => {
    const divProductsList = document.getElementById("productsList");
    for (const product of products) {
        const div = document.createElement("div");
        div.classList.add("image", "card", "col-md-2", "m-4");

        const image = document.createElement("img")
        image.classList.add("card-img-top");
        image.setAttribute("src", product.image)
        image.setAttribute("alt", `image of the book ${product.title}`)

        const title = document.createElement("h6")
        title.classList.add("card-subtitle", "mb-2", "text-muted");
        title.textContent = product.title

        const body = document.createElement("div")
        body.classList.add("card-body")

        const footer = document.createElement("div")
        footer.classList.add("card-footer")

        const price = document.createElement("h5")
        price.classList.add("card-title");
        price.textContent = product.price

        const btn = document.createElement("a")
        btn.classList.add("btn");
        btn.textContent = "Add to cart"
        if (product.price === "Out of stock") {
            btn.classList.add("disabled", "btn-secondary");
        }
        else {
            btn.classList.add("btn-primary")
        }
        btn.addEventListener("click", function () {

            // making the localStorage
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        })

        body.appendChild(price)
        body.appendChild(title)
        footer.appendChild(btn)
        div.appendChild(image)
        div.appendChild(body)
        div.appendChild(footer)
        divProductsList.appendChild(div);
    }

});
