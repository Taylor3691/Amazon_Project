export let cart = JSON.parse(localStorage.getItem('listCart')) || [];

export function  addToCart(button){
    let check;
    const productName = button.dataset.productName;
    cart.forEach((item)=>{
        if(item.id === productName){
            check = item;
        }
    });

    if(check){
        check.quantity+=1;
    }else{
        cart.push({
            id: productName,
            quantity: 1
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