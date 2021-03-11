class UserAdapter {
    constructor(baseUrl) {
        this.baseUrl =  baseUrl
    }

    getUsers(){
        return fetch(this.baseUrl)
        .then(r => r.json())
    }





}