const userAdapter = new UserAdapter("http://localhost:3000/users");
const productAdapter = new ProductAdapter("http://localhost:3000/products");
const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
const productContainer = document.getElementById("products-container")
let shopping = []
const specialButtons = document.getElementsByClassName("btns")
const newProductButton = document.getElementById("new-product")
let productForm = document.getElementById("new-product-form")
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

loginbtn.addEventListener("click", function() {
    User.currentUser = User.all.find(e => e.name.toLowerCase().trim() === username.value.toLowerCase())
    
    
    if (!!User.currentUser){
        User.currentUser.displayAccountInfo()
    }
    if (!User.currentUser){  
        if (!username.value.trim()){
            alert("Your username can not be empty")
            return 
        }
        else userAdapter.makeUser(username.value.trim())
        .then(u => {let user = new User(u.id, u.name, u.account_balance)
            alert("Thank you for creating an iShopiSell account. You can add any item to your shopping cart with just a click")
            user.displayAccountInfo()
            User.currentUser = user 
        })
    }


    loginContainer.innerHTML = ""
    Product.all.forEach(e => e.displayProduct())
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

    productAdapter.createNewProduct()
    .then(p => {let product = new Product(p.id, p.name, p.price, p.quantity, currentUser.name); 
    product.displayProduct(); 
    productForm.style = "display:none;";})    

})


shoppingCartButton.addEventListener("click", function(e){
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










