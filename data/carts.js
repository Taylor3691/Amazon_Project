export let cart = [];

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
}

export function updateCart(){
    let total = 0;
    cart.forEach((item)=>{
        total += item.quantity;
    })
    document.querySelector('.cart-quantity').innerHTML = total;
}