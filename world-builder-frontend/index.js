const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const WORLDS_URL = `${BASE_URL}/worlds`

const body = document.querySelector("body")
const error = document.getElementById("modal")
error.style.visibility = "hidden"


function logIn(){
    const loginForm = document.querySelector("form-style")
    loginForm.addEventListener("click", function(e){
        e.preventDefault();
        if (e.target.value === "Create Account"){
            fetch( `http://localhost:3000/toys/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                "likes": likesCount
                })

             })
            .then(response => response.json())
            .then(console.log)
        }
    })
}