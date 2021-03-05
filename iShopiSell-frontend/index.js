const userBaseURL = "http://localhost:3000/users"
const productsBaseURL = "http://localhost:3000/products"
const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
const productContainer = document.getElementById("products-container")
let shopping = []


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
        loginContainer.innerHTML = ""
        Product.all.forEach(e => e.displayProduct())
    }
    else {createUser(username.value)
    alert("Thank you for creating a iShopiSell account")
    loginContainer.innerHTML = ""}

})


let addProductToShoppingCart = function(p) {
    shopping.push(p)
    const products = Array.from(document.getElementsByClassName("products-display"))
    let shoppedProduct = products.find(e => e.innerHTML.includes(p.name) && e.innerHTML.includes(p.seller))

}
    
    

let displayCart = function(){
    console.log(shopping)

}






