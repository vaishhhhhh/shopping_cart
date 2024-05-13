/* app.js */
// select elements

const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items")
const subTotalE1 = document.querySelector(".subtotal")
const totalItemsE1 = document.querySelector(".total-items-in-cart")

// render products
function renderProducts() {
    products.forEach((product) => {
        productsE1.innerHTML += `<div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onClick = "addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>`
    })
}
renderProducts();
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
// add to cart

function addToCart(id) {
    // checking if product exists in cart
    if(cart.some ((item) => item.id === id)){
        changeNumberOfUnits("plus", id)
    }
else{
    const item = products.find((product) => product.id === id)
    
    cart.push({
        ...item, 
        numberOfUnits: 1
    })}
// update cart
updateCart();
}
function updateCart(){
    renderCartItems();
    renderSubTotal();
    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}
// calculate and rendersubtotal
function renderSubTotal(){
    let totalPrice =0, totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subTotalE1.innerHTML = ` Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
    totalItemsE1.innerHTML = totalItems;
}
// render cart items
function renderCartItems(){
    cartItemsE1.innerHTML = "" // clear cart
    cart.forEach((item) => {
        cartItemsE1.innerHTML += `<div class="cart-item">
        <div class="item-info" onClick = "removeItemFromCart(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onClick = "changeNumberOfUnits('minus', ${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onClick = "changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
    </div>`
    })
}

// remove items from cart
function removeItemFromCart(id){
cart = cart.filter((item)=> item.id !== id);
updateCart();
}

function changeNumberOfUnits(action, id){
  cart = cart.map((item)=> {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id){
        if(action === "minus" && numberOfUnits > 1){
            numberOfUnits--;
        }else if(action === "plus" && numberOfUnits < item.instock){
            numberOfUnits++;
        }
    }
    return{
        ...item,
        numberOfUnits,
    };
  })

  updateCart();
}