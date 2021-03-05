const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
const userBaseURL = "http://localhost:3000/users"
const productsBaseURL = "http://localhost:3000/products"

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
    let userNameArray = User.all.map(e => e.name.toLowerCase())
    
    if (userNameArray.includes(username.value.toLowerCase())){
        loginContainer.innerHTML = ""
    }
    else createUser(username.value)
    alert("Thank you for creating a iShopiSell account")
    loginContainer.innerHTML = ""

})

