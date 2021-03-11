const userBaseURL = "http://localhost:3000/users"
const productsBaseURL = "http://localhost:3000/products"
const userAdapter = new UserAdapter(userBaseURL);
const productAdapter = new ProductAdapter(productsBaseURL);
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
    userAdapter.getUsers()
    .then(users => { users.forEach(u => new User(u.id, u.name, u.account_balance))
    })

    productAdapter.getProducts()
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
    productForm.style.display = "inline";}

   
    

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
    product.displayProduct(); 
    productForm.style = "display:none;";
    placedProductOnMarket(product)})    

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


    if (document.getElementById("totalPrice")){
        shoppingList.innerHTML = ""
    }

    let totalPrice = document.createElement("p")
    let buyProducts = document.createElement("button")
    total = [...shopping.map(e => e.price)].reduce((a, b) => a + b)

    shopping.forEach(p => displayShopCart(p))

    totalPrice.innerText = `Total Price: $${total}`
    buyProducts.innerText = "Purchase Products"
    totalPrice.id = "totalPrice"

    shoppingList.append(totalPrice)
    shoppingList.append(buyProducts)

    buyProducts.addEventListener("click", purchase)



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


    username.innerText = u.name 
    aBalance.innerText = `$${u.accountBalance}`


}

function purchase(){
    let aBalance = document.getElementById("account-balance")
    currentUser.accountBalance = currentUser.accountBalance - total


    currentUser.shoppingCart.map(newQuantity)

    currentUser.shoppingCart.map(paySeller)
    
    aBalance.innerText = `$${currentUser.accountBalance}`


    shopping = []

    shoppingList.innerHTML = ""

    updateBalance(currentUser)
   

    
}

function updateBalance(user){
    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({account_balance:user.accountBalance})
    }


    fetch(userBaseURL+`/${user.id}`, configObj)
    .then(r => r.json())
    .then(u => console.log(u));
}


function newQuantity(product){
    if (product.quantity === 0 || product.quantity === "Sold Out"){
        product.quantity = 0
    }

    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({quantity:`${product.quantity}`})
    }


    fetch(productsBaseURL+`/${product.id}`, configObj)
    .then(r => r.json())
    .then(u => console.log(product))
}

function paySeller(product){
    let seller = User.all.find(e => e.name === product.seller)
    seller.accountBalance = seller.accountBalance + product.price 

    

    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({account_balance:seller.accountBalance})
    }


    fetch(userBaseURL+`/${seller.id}`, configObj)
    .then(r => r.json())
    .then(u => console.log(u))
}

function placedProductOnMarket(product){
    let seller = User.all.find(e => e.name === product.seller)
    seller.accountBalance = seller.accountBalance - product.quantity

    let admin = User.all.find(e => e.name === "adminBank")
    admin.accountBalance = admin.accountBalance + product.quantity
    marketProfits(admin)

    let aBalance = document.getElementById("account-balance")
    aBalance.innerText = `$${seller.accountBalance}`
    





    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({account_balance:seller.accountBalance})
    }


    fetch(userBaseURL+`/${seller.id}`, configObj)
    .then(r => r.json())
    .then(u => console.log(u))
}

function marketProfits(admin){
    let configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({account_balance:admin.accountBalance})
    }


    fetch(userBaseURL+`/${admin.id}`, configObj)
    .then(r => r.json())
    .then(u => console.log(u))
}








