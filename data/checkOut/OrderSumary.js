import { products } from "../products.js"
import { cart,removeFromtCart,sumOfCart,updateCartOption } from "../carts.js"
import { convertMoney } from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOption} from "../deliveryOptions.js"
import { renderPayment } from "./Payment.js"

 
 export function renderOrders(){
    document.querySelector('.js-count').innerHTML = `Checkout (<a class="return-to-home-link cart-quantity"
            href="amazon.html">${sumOfCart()} Items</a>)`;
    let checkOutElementHTML = ``;
    cart.forEach((item) =>{
        const productId = item.id;
        let matchingProdcut;
        products.forEach((unit)=>{
            if(productId === unit.id){
                matchingProdcut = unit;
            }
        });
        let optionId;
        deliveryOption.forEach((option)=>{
          if(item.option ===option.id){
            optionId = option;
          }
        });
        const today = dayjs();
        const date = today.add(optionId.deliveryTime,'days');
        let dateString = date.format('dddd, MMMM D');
        checkOutElementHTML += `          
            <div class="cart-item-container js-cart-item-container-${matchingProdcut.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString};
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
                    ${deliveryOptionHTML(matchingProdcut)}
                  </div>
                </div>
              </div>`
    
    });
    
    document.querySelector('.js-cart-item').innerHTML = checkOutElementHTML;
    document.querySelectorAll('.js-delete-button').forEach((item) => {
        item.addEventListener('click',()=>{
            removeFromtCart(item.dataset.productId);
            renderOrders();
            renderPayment();
            
        })
    });
  
    document.querySelectorAll('.js-option-delivery').forEach((input)=>{
      input.addEventListener('click',()=>{
         updateCartOption(input.dataset.productId, Number(input.dataset.optionId));
         renderOrders();
         renderPayment();
      });
    });
  }


  function deliveryOptionHTML(matchingProdcut){
    let html = ``;
    const today = dayjs();
    let findOptionProduct;
    cart.forEach((item)=>{
      if(item.id === matchingProdcut.id){
        findOptionProduct = item;
      }
    });
  
    deliveryOption.forEach((option)=>{
      let isCheck = findOptionProduct.option === option.id ? 'checked' : '';
      const deliveryDate = today.add(option.deliveryTime,'days');
      let  dateString = deliveryDate.format('dddd, MMMM D');
      let  priceString = option.priceCents===0 ? 'FREE Shipping' : convertMoney(option.priceCents)
      html += `                
      <div class="delivery-option js-option-delivery" data-option-id = "${option.id}" data-product-id = "${matchingProdcut.id}">
        <input type="radio" ${isCheck}
          class="delivery-option-input"
          name="delivery-option-${matchingProdcut.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>`
    });
    return html;
  }