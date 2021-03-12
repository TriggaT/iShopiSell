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
        let removeItem = document.createElement("button")
        let addItem = document.createElement("button")
        removeItem.id = "remove-item-btn"
        removeItem.innerText = "Remove from Cart"
        addItem.id = "add-item-btn"
        addItem.innerText = "Add to Cart"

        productTag.innerText = `${this.name} by ${this.seller}`
        productTag.className = "products-display"
        productTag.addEventListener("click", e => this.addProductToShoppingCart())
        if (this.quantity <= 0 || isNaN(this.quantity)){
            this.quantity = "Sold Out"
        }
        additionalInfo.innerText = `Quantity: ${this.quantity} - $${this.price}`
        
        removeItem.addEventListener("click", e => this.removeFromCart())
        productTag.append(additionalInfo, addItem, removeItem)
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
        seller.accountBalance = seller.accountBalance + (this.price - 1) 

        userAdapter.updateBalance(seller)
    }

    removeFromCart(){
        
        const products = Array.from(document.getElementsByClassName("products-display"))
        let shoppedProduct = products.find(e => e.innerHTML.includes(this.name) && e.innerHTML.includes(this.seller))

        let item = shopping.find(e => e.name === this.name)
        if(!!item){
            this.quantity = this.quantity + 1
            const index = shopping.indexOf(item);
            if (index > -1) {
                shopping.splice(index, 1);
            }
        }



        this.quantity = this.quantity + 1
        shoppedProduct.childNodes[1].innerText = `Quantity: ${this.quantity} - $${this.price}`

        return shopping.pop() 

    }




    

    




}