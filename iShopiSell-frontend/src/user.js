class User {

    static all = []

    constructor(id, name, accountBalance = 200){
        this.id = id
        this.name = name 
        this.accountBalance = accountBalance
        User.all.push(this)
    }




}