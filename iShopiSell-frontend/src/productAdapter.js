class ProductAdapter {
    constructor(baseURL) {
        this.baseURL =  baseURL
    }

    getProducts(){
        return fetch(this.baseURL)
        .then(r => r.json())
    }

    createNewProduct(productData){

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

    newQuantity(product){
        if (product.quantity === 0 || product.quantity === "Sold Out"){
            product.quantity = 0
        }
    
        let configObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({quantity:`${product.quantity}`})
        }

    
    
        fetch(this.baseURL+`/${product.id}`, configObj)
        .then(r => r.json())
        .then(p => p)
    }


}