const loginbtn = document.getElementById("login-button")
const username = document.getElementById("login")
const loginContainer = document.getElementById("login-container")
const userBaseURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function (){
    fetch(userBaseURL)
    .then(r => r.json())
    .then(data => { data.forEach(u => new User(u.id, u.name, u.account_balance))
    })
})



loginbtn.addEventListener("click", function() {
    let userNameArray = User.all.map(e => e.name.toLowerCase())
    
    if (userNameArray.includes(username.value.toLowerCase())){
        loginContainer.innerHTML = ""
    }
    else console.log(username.value)

})

