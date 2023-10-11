var taxRate = 0.05;
var shippingRate = 10.00;
var fadeTime = 300;
let idCounter = 1

$(document).ready(function () {
    // var cartData = JSON.parse(localStorage.getItem('cartData'));
    // if (cartData) {
    //     $('#cart-subtotal').html(cartData.subtotal);
    //     $('#cart-tax').html(cartData.tax);
    //     $('#cart-shipping').html(cartData.shipping);
    //     $('#cart-total').html(cartData.total);
    // }

    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            var productRow = $('.product:contains("' + item.name + '")');
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

function recalculateCart() {
    var subtotal = 0;

    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;


    var cartData = {
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
// cal price after updt qtt 
function updateQuantity(quantityInput) {
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);

        });
    });

    var cartItems = [];
    $('.product').each(function () {
        var productName = $(this).find('.product-title').text();
        var productPrice = parseFloat($(this).find('.product-price').text());
        var productQuantity = parseInt($(this).find('.product-quantity input').val());

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
    var productRow = $(removeButton).parent().parent();


    // step 1 get the id of the item clicked
    // const id = 3
    // step 2 get cartData as an array (just get from localStorage)
    // step 3 look for the item in cartData that has that id, then delete it
    // step 3 alternative ---- const newArr = arr.filter(element => element.id !== yourId)
    // step 4 set cardData on localStorage again
    //localStorage.setItem('cartData', JSON.stringify(newArr))

    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
        //console.log(cartData)
    });
}


