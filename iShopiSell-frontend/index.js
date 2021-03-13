const userAdapter = new UserAdapter("http://localhost:3000/users");
const productAdapter = new ProductAdapter("http://localhost:3000/products");
const loginbtn = document.getElementById("login-button")
const signupbtn = document.getElementById("signup-button")
const logoutbtn = document.getElementById("logout")
const username = document.getElementById("login")
const password = document.getElementById("password")
const loginContainer = document.getElementById("login-container")
const productContainer = document.getElementById("products-container")
let shopping = []
const specialButtons = document.getElementsByClassName("btns")
const newProductButton = document.getElementById("new-product")
let productForm = document.getElementById("new-product-form")
const shoppingCartButton = document.getElementById("shopping-cart")
const shoppingList = document.getElementById("shoppingList")
const messages = document.getElementsByClassName("message")

document.addEventListener("DOMContentLoaded", function (){
    userAdapter.getUsers()
    .then(users => { users.forEach(u => new User(u.id, u.name, u.account_balance, u.password))
    })

    productAdapter.getProducts()
    .then(products => { products.forEach(p => new Product(p.id, p.name, p.price, p.quantity, p.user.name))
    })
})

loginbtn.addEventListener("click", function() {
    User.currentUser = User._all.find(e => e.name.toLowerCase().trim() === username.value.toLowerCase())
    if(username.value === ""){
        alert("Please put your username")
        return
    }

    if (!!User.currentUser && User.currentUser.password === password.value){
        User.currentUser.displayAccountInfo()
    }

    if (!User.currentUser || User.currentUser.password != password.value){  
        if (User.currentUser.password != password.value || password.value === ""){
            alert("Your password is incorrect or empty")
            return
        }
    }

    loginContainer.style = "display:none;"
    Array.from(messages).map(e => e.style = "display:block;")
    logoutbtn.style = "display:inline;"
    Product._all.forEach(e => e.displayProduct())
    Array.from(specialButtons).map(e => e.style = "display:inline;")

})

signupbtn.addEventListener("click", function(){
    User.currentUser = User._all.find(e => e.name.toLowerCase().trim() === username.value.toLowerCase())
    
    if(username.value === "" || password.value === ""){
        alert("Please make sure you put a username and password")
        return
    }

    if (!!User.currentUser){
        alert("This user already exists. Try a different username or login.")
        return 
    }

    else userAdapter.makeUser(username.value.trim(), password.value)
        .then(u => {let user = new User(u.id, u.name, u.account_balance, u.password)
            alert("Thank you for creating an iShopiSell account.")
            user.displayAccountInfo()
            User.currentUser = user 
        })
    
    loginContainer.style = "display:none;"
    Array.from(messages).map(e => e.style = "display:block;")
    logoutbtn.style = "display:inline;"
    Product._all.forEach(e => e.displayProduct())
    Array.from(specialButtons).map(e => e.style = "display:inline;")
})


newProductButton.addEventListener("click", function(){
    switch(newProductButton.innerText) {
        case "Sell New Product":
        newProductButton.innerText = "View Products Only"
        productForm.style.display = "inline";
        break;
        case "View Products Only":
        newProductButton.innerText = "Sell New Product"
        productForm.style.display = "none";
        break;
    } 
})

productForm.addEventListener("submit", function(e){
    e.preventDefault();
    currentUser = User.currentUser;
    
    let productName = document.getElementById("product-name").value
    let productPrice = document.getElementById("product-price").value
    let productQuantity = document.getElementById("product-quantity").value

    if(productName === "" || productPrice === "" || productQuantity === ""){
        alert("Make sure you fill out all information for your product. Thanks!")
        return  
    }

    let productData = {
        name: productName, 
        price: productPrice,
        quantity: productQuantity,
        user_id: currentUser.id    
    }

    productAdapter.createNewProduct(productData)
    .then(p => {let product = new Product(p.id, p.name, p.price, p.quantity, currentUser.name); 
    product.displayProduct(); 
    productForm.style = "display:none;";})    

})


shoppingCartButton.addEventListener("click", function(){
    currentUser = User.currentUser
    currentUser.shoppingCart = shopping

    if (document.getElementById("totalPrice")){
        shoppingList.innerHTML = ""
    }

    let totalPrice = document.createElement("p")
    let buyProducts = document.createElement("button") 

    total = shopping.map(e => e.price).reduce((a, b) => a + b)

    shopping.forEach(p => p.displayProductInCart())

    totalPrice.innerText = `Total Price: $${total}`
    buyProducts.innerText = "Purchase Products"
    totalPrice.id = "totalPrice"

    shoppingList.append(totalPrice)
    shoppingList.append(buyProducts)

    buyProducts.addEventListener("click", e=> currentUser.purchaseProductsInCart())

})

logoutbtn.addEventListener("click", function(){
    let username = document.getElementById("user")
    let aBalance = document.getElementById("account-balance")
    let additionalInfo = document.createElement("h5")

    let items = [...shopping]

    User.currentUser = {} 
    items.forEach(e => e.removeFromCart())
    username.innerText = ""
    aBalance.innerText = ""
    loginContainer.style = "display:inline;"
    Array.from(messages).map(e => e.style = "display:none;")
    logoutbtn.style = "display:none;"
    productContainer.innerHTML = ""
    shoppingList.innerHTML = ""
    additionalInfo.innerHTML = ""
    
    
    Array.from(specialButtons).map(e => e.style = "display:none;")
    password.value = ""
} )










