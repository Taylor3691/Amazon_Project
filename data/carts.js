import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('listCart')) || [];

export function  addToCart(button){
    let check;
    const productName = button.dataset.productName;
    cart.forEach((item)=>{
        if(item.id === productName){
            check = item;
        }
    });
    let price;
    products.forEach((item)=>{
        if(item.id === productName){
            price = item.priceCents;
        }
    });
    if(check){
        check.quantity+=1;
    }else{
        cart.push({
            id: productName,
            quantity: 1,
            priceCents: price,
            option: 3
        });
    }
    saveCartLocalStorage();
}

export function updateCart(){
    let total = 0;
    cart.forEach((item)=>{
        total += item.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML = total;
}

export function saveCartLocalStorage(){
    localStorage.setItem('listCart', JSON.stringify(cart));
}

export function removeFromtCart(productId){
    let newCart = [];
    cart.forEach((item)=>{
        if(item.id !== productId){
            newCart.push(item);
        }
    })
    cart = newCart;
    updateCart();
    saveCartLocalStorage();
    console.log(cart);
}

export function updateCartOption(itemId, optionId){
    let matchingProdcut;
    cart.forEach((product)=>{
        if(product.id===itemId){
            matchingProdcut = product;
        }
    });
    matchingProdcut.option = optionId;
    saveCartLocalStorage();
}

export function sumOfCart(){
    let total = 0;
    cart.forEach((item)=>{
        total+=item.quantity;
    });
    return total;
}