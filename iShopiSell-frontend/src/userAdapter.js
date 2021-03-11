class UserAdapter {
    constructor(baseUrl) {
        this.baseUrl =  baseUrl
    }

    getUsers(){
        return fetch(this.baseUrl)
        .then(r => r.json())
    }

    makeUser(user){
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({name:user})
        }
    
        return fetch(this.baseUrl, configObj)
        .then(r => r.json())
    }





}