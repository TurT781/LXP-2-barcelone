let taxRate = 0.05;
let shippingRate = 10.00;
let fadeTime = 300;
let idCounter = 1

$(document).ready(function () {

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {

        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let productRow = $('.product:contains("' + item.name + '")');
            productRow.find('.product-quantity input').val(item.quantity);
            updateQuantity(productRow.find('.product-quantity input'));
        }
    }

    $('.product-quantity input').change(function () {
        updateQuantity(this);
    });

    $('.product-removal button').click(function () {
        removeItem(this);
    });
});
function CalTitle() {
    let item = carItem[i];
    document.getElementById(title_h1);
}

function recalculateCart() {
    let subtotal = 0;

    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    let tax = subtotal * taxRate;
    let shipping = (subtotal > 0 ? shippingRate : 0);
    let total = subtotal + tax + shipping;


    let cartData = {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));

    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}
// calc price after updt qtt 
function updateQuantity(quantityInput) {
    let productRow = $(quantityInput).parent().parent();
    let price = parseFloat(productRow.children('.product-price').text());
    let quantity = $(quantityInput).val();
    let linePrice = price * quantity;

    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);

        });
    });

    let cartItems = [];
    $('.product').each(function () {
        let productName = $(this).find('.product-title').text();
        let productPrice = parseFloat($(this).find('.product-price').text());
        let productQuantity = parseInt($(this).find('.product-quantity input').val());

        cartItems.push({
            id: idCounter,
            name: productName,
            price: productPrice,
            quantity: productQuantity
        });
        idCounter = idCounter + 1
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// rm items from the cart and save it on the localStorage
function removeItem(removeButton) {
    let productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();

        // get the cart from the localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        let productName = productRow.find('.product-title').text();

        // delete product from the local
        cartItems = cartItems.filter(function (item) {
            return item.name !== productName;
        });

        // save the update to the localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });

}

// Retrieve cart data from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems'));

// Select the shopping cart div where you want to add the items
let shoppingCart = document.querySelector('.shopping-cart');

// Iterate through the cart items and generate them dynamically
cartItems.forEach(function (item) {
    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.id = item.id; // Make sure the ID matches what's in local storage

    // ... Create other elements (image, title, description, price, quantity, remove button, etc.) and add them to productDiv

    shoppingCart.appendChild(productDiv); // Add the product to the cart
});

