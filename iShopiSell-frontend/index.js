let loginbtn = document.getElementById("login-button")
let username = document.getElementById("login")
let userBaseURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function (){
    fetch(userBaseURL)
    .then(r => r.json())
    .then(data => { data.forEach(u => new User(u.id, u.name, u.account_balance))

    })
})



loginbtn.addEventListener("click", function() {
    console.log(user.value)}
)

