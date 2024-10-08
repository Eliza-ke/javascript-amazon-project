export let cart;

loadFromStorage();

function loadFromStorage() {

    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
    }];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart)); // we don't need to paramter for cart because cart is declared above all the codes.
}

export function addToCart(productId) {
    let matchingItem;

    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    if (matchingItem){
        matchingItem.quantity += quantity;
    }else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1', // default deliveryOption
        });
    }
    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId != productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}


export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    // need to update Product, Delivery Option
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}