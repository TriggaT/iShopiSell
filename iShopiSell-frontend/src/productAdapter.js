class ProductAdapter {
    constructor(baseURL) {
        this.baseURL =  baseURL
    }

    getProducts(){
        return fetch(this.baseURL)
        .then(r => r.json())
    }

    createNewProduct(product){
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(product)
        }
    
        return fetch(this.baseURL, configObj)
        .then(r => r.json())

    }









}