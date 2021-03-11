class UserAdapter {
    constructor(baseUrl) {
        this.baseUrl =  baseUrl
    }

    getUsers(){
        return fetch(this.baseUrl)
        .then(r => r.json())
    }

    makeUser(userName){
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({name:userName})
        }
    
        return fetch(this.baseUrl, configObj)
        .then(r => r.json())
    }





}