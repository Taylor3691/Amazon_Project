import { cart, addToCart, updateCart, sumOfCart} from "./carts.js";
import { convertMoney } from "./utils/money.js";
import { products } from "./products.js";

let htmlElement = ``;
products.forEach((item)=>{
    htmlElement += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${convertMoney(item.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary add-interactive" data-product-name ="${item.id}">
            Add to Cart
          </button>
        </div>`
});
        
document.querySelector('.js-product-list').innerHTML = htmlElement;
document.querySelectorAll('.add-interactive').forEach((button)=>{
    button.addEventListener('click', ()=>{
        addToCart(button);
        updateCart();
    });
});
document.querySelector('.js-quantity').innerHTML = sumOfCart();

