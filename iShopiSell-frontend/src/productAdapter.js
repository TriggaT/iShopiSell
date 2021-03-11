class ProductAdapter {
    constructor(baseURL) {
        this.baseURL =  baseURL
    }

    getProducts(){
        return fetch(this.baseURL)
        .then(r => r.json())
    }

    createNewProduct(product){
        let productData = {
            name: document.getElementById("product-name").value, 
            price: document.getElementById("product-price").value,
            quantity: document.getElementById("product-quantity").value,
            user_id: currentUser.id    
        }

        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(productData)
        }
    
        return fetch(this.baseURL, configObj)
        .then(r => r.json())

    }









}