class User {

    static all = []

    constructor(id, name, accountBalance){
        this.id = id
        this.name = name 
        this.accountBalance = accountBalance
        User.all.push(this)
    }




}