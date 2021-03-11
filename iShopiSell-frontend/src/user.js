class User {

    static all = []

    constructor(id, name, accountBalance = 200, shoppingCart = []){
        this.id = id
        this.name = name 
        this.accountBalance = accountBalance
        this.shoppingCart = shoppingCart
        User.all.push(this)
    }

    static currentUser = {}

    displayAccountInfo(){
        let username = document.getElementById("user")
        let aBalance = document.getElementById("account-balance")
    
        username.innerText = this.name 
        aBalance.innerText = `$${this.accountBalance}`
    }




}