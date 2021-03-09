const userBaseURL = "http://localhost:3000/users"
const productsBaseURL = "http://localhost:3000/products"
const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
const productContainer = document.getElementById("products-container")
let shopping = []
const specialButtons = document.getElementsByClassName("btns")
const newProductButton = document.getElementById("new-product")
const productForm = document.getElementsByClassName("new-product-form")[0]
const shoppingCartButton = document.getElementById("shopping-cart")
const shoppingList = document.getElementById("shoppingList")


document.addEventListener("DOMContentLoaded", function (){
    fetch(userBaseURL)
    .then(r => r.json())
    .then(users => { users.forEach(u => new User(u.id, u.name, u.account_balance))
    })
})

document.addEventListener("DOMContentLoaded", function (){
    fetch(productsBaseURL)
    .then(r => r.json())
    .then(products => { products.forEach(p => new Product(p.id, p.name, p.price, p.quantity, p.user.name))
    })
})

function createUser(user){
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({name:user})
    }

    fetch(userBaseURL, configObj)
    .then(r => r.json())
    .then(u => new User(u.id, u.name, u.account_balance))
}


loginbtn.addEventListener("click", function() {
    User.currentUser = User.all.find(e => e.name.toLowerCase().trim() === username.value.toLowerCase())
    
    if (!!User.currentUser){
        loginContainer.innerHTML = ""
        Product.all.forEach(e => e.displayProduct())
        Array.from(specialButtons).map(e => e.style = "display:inline;")
        displayAccountInfo(User.currentUser)
    }
    else {createUser(username.value.trim())

    alert("Thank you for creating a iShopiSell account")
    loginContainer.innerHTML = ""}

})


newProductButton.addEventListener("click", function(){
    if (newProductButton.innerText === "Sell New Product"){  
    productForm.style = "display:inline;";}

   
    

})

productForm.addEventListener("submit", function(e){
    e.preventDefault();
    currentUser = User.currentUser;

    let productData = {
        name: document.getElementById("product-name").value, 
        price: document.getElementById("product-price").value,
        quantity: document.getElementById("product-quantity").value,
        user_id: currentUser.id    
    }

    
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(productData)
    }

    fetch(productsBaseURL, configObj)
    .then(r => r.json())
    .then(p => {let product = new Product(p.id, p.name, p.price, p.quantity, currentUser.name); 
    product.displayProduct(); productForm.style = "display:none;"})    

})


let addProductToShoppingCart = function(p) {
    const products = Array.from(document.getElementsByClassName("products-display"))
    let shoppedProduct = products.find(e => e.innerHTML.includes(p.name) && e.innerHTML.includes(p.seller))

    let i = 1
    if (p.quantity <= 0 || isNaN(p.quantity)){
        p.quantity = "Sold Out"
    }
    else {
        p.quantity = p.quantity - i;
        shopping.push(p)
    }
    shoppedProduct.childNodes[1].innerText = `Quantity: ${p.quantity} - $${p.price}`
    i++
}

shoppingCartButton.addEventListener("click", function(e){
    currentUser = User.currentUser
    currentUser.shoppingCart = shopping

    let totalPrice = document.createElement("p")
    total = [...shopping.map(e => e.price)].reduce((a, b) => a + b)

    shopping.forEach(p => displayShopCart(p))

    totalPrice.innerText = `Total Price: $${total}`
    shoppingList.append(totalPrice)

})

function displayShopCart(p){
    let shopItem = document.createElement("li")
    shopItem.innerText = `${p.name} - $${p.price}`

    shoppingList.appendChild(shopItem)


}
    
    

let displayCart = function(){
    currentUser = User.currentUser
    currentUser.shoppingCart = shopping
   
    console.log(currentUser.shoppingCart)

}

function displayAccountInfo(u){
    let username = document.getElementById("user")
    let aBalance = document.getElementById("account-balance")

    // debugger

    username.innerText = u.name 
    aBalance.innerText = `$${u.accountBalance}`


}






