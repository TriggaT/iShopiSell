let loginbtn = document.getElementById("login-button")
let user = document.getElementById("login")
let userBaseURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function (){
    fetch(userBaseURL)
    .then(r => r.json())
    .then(data => console.log(data))
})



loginbtn.addEventListener("click", function() {
    console.log(user.value)}
)

