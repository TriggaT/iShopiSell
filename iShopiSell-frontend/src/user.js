class User {

    static _all = []

    constructor(id, name, accountBalance = 200, password, shoppingCart = []){
        this.id = id
        this.name = name 
        this.accountBalance = accountBalance
        this.password = password 
        this.shoppingCart = shoppingCart
        User._all.push(this)
    }

    static currentUser;

    displayAccountInfo(){
        let username = document.getElementById("user")
        let aBalance = document.getElementById("account-balance")
    
        username.innerText = this.name 
        aBalance.innerText = `$${this.accountBalance}`
    }

    purchaseProductsInCart(){
        let aBalance = document.getElementById("account-balance")
 
        let market = User._all.find(e => e.id === 1)

        if (total > this.accountBalance){
            alert("You can't afford every item in your cart. Please remove some items.")
            return
        } 
        
        this.accountBalance = this.accountBalance - total
        market.accountBalance = market.accountBalance + shopping.length
        
        this.shoppingCart.map(e => productAdapter.newQuantity(e))
        this.shoppingCart.map(e => e.updateSellerAccount())
        
        aBalance.innerText = `$${currentUser.accountBalance}`
        shopping = []
        shoppingList.innerHTML = ""

        userAdapter.updateBalance(this)
        userAdapter.updateBalance(market)   
    }




}