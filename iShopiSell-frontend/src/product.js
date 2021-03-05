class Product {

    static all = []

    constructor(id, name, price, quantity, seller){
        this.id = id
        this.name = name 
        this.price = price 
        this.quantity = quantity
        this.seller = seller
        Product.all.push(this)
    }




}