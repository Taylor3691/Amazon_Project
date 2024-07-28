import { products } from "./products.js";
import { cart,removeFromtCart } from "./carts.js";
import { convertMoney } from "./utils/money.js";

let checkOutElementHTML = ``;
cart.forEach((item) =>{
    const productId = item.id;
    let matchingProdcut;
    products.forEach((unit)=>{
        if(productId === unit.id){
            matchingProdcut = unit;
        }
    });

    checkOutElementHTML += `          
        <div class="cart-item-container js-cart-item-container-${matchingProdcut.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProdcut.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProdcut.name}
                </div>
                <div class="product-price">
                  ${convertMoney(matchingProdcut.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id = "${matchingProdcut.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProdcut.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProdcut.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProdcut.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

});
document.querySelector('.js-cart-item').innerHTML = checkOutElementHTML;
document.querySelectorAll('.js-delete-button').forEach((item) => {
    item.addEventListener('click',()=>{
        removeFromtCart(item.dataset.productId);
        document.querySelector(`.js-cart-item-container-${item.dataset.productId}`).remove();
    })
});