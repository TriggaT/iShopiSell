const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
let productContainer = document.getElementById("products-container")
const userBaseURL = "http://localhost:3000/users"
const productsBaseURL = "http://localhost:3000/products"
const products = document.getElementsByClassName("products-display")


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
    let currentUser = User.all.find(e => e.name.toLowerCase() === username.value.toLowerCase())
    
    if (!!currentUser){
        let shopping = currentUser.shoppingCart
        loginContainer.innerHTML = ""
        Product.all.forEach(e => e.displayProduct())
    }
    else {createUser(username.value)
    alert("Thank you for creating a iShopiSell account")
    loginContainer.innerHTML = ""}

})

// let displayProduct = function(p){

//     let productTag = document.createElement("h4")
//     let additionalInfo = document.createElement("h5")
//     productTag.innerText = `${p.name} by ${p.seller}`
//     productTag.className = "products-display"
//     productTag.addEventListener("click", addProductShoppingCart)
//     additionalInfo.innerText = `Quantity: ${p.quantity} - $${p.price}`
//     productTag.appendChild(additionalInfo)
//     productContainer.appendChild(productTag)

// }

let addProductShoppingCart = (p) => {
    console.log(p)}






