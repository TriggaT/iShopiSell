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
        productTag.addEventListener("click", () => this.addProductToShoppingCart())
        additionalInfo.innerText = `Quantity: ${this.quantity} - $${this.price}`
        productTag.appendChild(additionalInfo)
        productContainer.prepend(productTag)
    
    }

    addProductToShoppingCart(){
        const products = Array.from(document.getElementsByClassName("products-display"))
        let shoppedProduct = products.find(e => e.innerHTML.includes(this.name) && e.innerHTML.includes(this.seller))
    
        let i = 1
        if (this.quantity <= 0 || isNaN(this.quantity)){
            this.quantity = "Sold Out"
        }
        else {
            this.quantity = this.quantity - i;
            shopping.push(this)
        }
        shoppedProduct.childNodes[1].innerText = `Quantity: ${this.quantity} - $${this.price}`
        i++
    }

    displayProductInCart(){
        let shopItem = document.createElement("li")
        shopItem.innerText = `${this.name} - $${this.price}`
    
        shoppingList.appendChild(shopItem)
    }

    updateSellerAccount(){
        let seller = User.all.find(e => e.name === this.seller)
        seller.accountBalance = seller.accountBalance + this.price 
    
        userAdapter.updateBalance(seller)
    }
    

    




}