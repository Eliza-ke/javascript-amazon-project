function Cart(localStorageKey) {

    const cart = { 
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1',
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2',
            }];
        },
    
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); // we don't need to paramter for cart because cart is declared above all the codes.
        },
    
        addToCart(productId) {
            let matchingItem;
    
            // const quantity = (Number(document.querySelector(`.js-quantity-selector-${productId}`).value)) || 1;
    
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            })
    
            if (matchingItem){
                matchingItem.quantity += 1;
            }else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1', // default deliveryOption
                });
            }
            this.saveToStorage();
        },
    
        removeFromCart(productId){
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId != productId){
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        calculateCartQuantity(){
            let cartQuantity = 0;
        
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            return cartQuantity;
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            // need to update Product, Delivery Option
            let matchingItem;
    
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
    
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    };

    return cart;
}

// can create multiple objects, we use function to generate multiple objects
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);