class UserAdapter {
    constructor(baseURL) {
        this.baseURL =  baseURL
    }

    getUsers(){
        return fetch(this.baseURL)
        .then(r => r.json())
    }

    makeUser(userName, userPassword){ 
        let configObj = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({name:userName, password:userPassword})
        }


    
        return fetch(this.baseURL, configObj)
        .then(r => r.json())
    }

    updateBalance(user){
        let configObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({account_balance:user.accountBalance})
        }
    
    
        return fetch(this.baseURL+`/${user.id}`, configObj)
        .then(r => r.json())
        .then(u => u);
    }





}