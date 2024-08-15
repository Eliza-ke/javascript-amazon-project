//import {cart as myCart} from '../data/cart.js';
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

let cartQuantity = calculateCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

products.forEach((product)=>{
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}
            
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button data-product-id="${product.id}" class="add-to-cart-button button-primary js-add-to-cart">
                Add to Cart
            </button>
        </div>
    `;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;


function addedMessage(productId){

    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-show');

    const addedMessageTimeouts = {}

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId){
        clearTimeout(previousTimeoutId);
    }

    const timeout = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-show');
    }, 1000);

    addedMessageTimeouts[productId] = previousTimeoutId;
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', ()=> {
        const productId = button.dataset.productId;

        addToCart(productId);
        cartQuantity = calculateCartQuantity();
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        addedMessage(productId)
    });
});



