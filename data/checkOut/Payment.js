import { products } from "../products.js"
import { cart,removeFromtCart,updateCartOption, sumOfCart } from "../carts.js"
import { convertMoney } from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOption} from "../deliveryOptions.js"


export function renderPayment(){
    let costCart = 0;
    let shipCost = 0;
    let tax = 0;
    let total = 0;
    cart.forEach((item)=>{
        costCart+= item.quantity * item.priceCents;
        deliveryOption.forEach((option)=>{
            if(option.id === item.option){
                shipCost += option.priceCents;
            }
        });
    });


    tax = (shipCost + costCart) *0.1;
    total = (shipCost + costCart) + tax;
    let html = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${sumOfCart()}):</div>
                <div class="payment-summary-money">$${convertMoney(costCart)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${convertMoney(shipCost)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${convertMoney(costCart+shipCost)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${convertMoney(tax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
            <div class="payment-summary-money">$${convertMoney(total)}</div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
    document.querySelector('.js-payment').innerHTML = html;
}