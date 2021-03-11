class ProductAdapter {
    constructor(baseUrl) {
        this.baseUrl =  baseUrl
    }

    getProducts(){
        return fetch(productsBaseURL)
        .then(r => r.json())
    }







}