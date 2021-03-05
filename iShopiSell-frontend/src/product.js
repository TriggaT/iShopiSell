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

    displayProduct(){

        let productTag = document.createElement("h4")
        let additionalInfo = document.createElement("h5")
        productTag.innerText = `${this.name} by ${this.seller}`
        productTag.className = "products-display"
        productTag.addEventListener("click", addProductShoppingCart)
        additionalInfo.innerText = `Quantity: ${this.quantity} - $${this.price}`
        productTag.appendChild(additionalInfo)
        productContainer.appendChild(productTag)
    
    }




}