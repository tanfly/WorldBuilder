    document.addEventListener("DOMContentLoaded", () =>{
        menu()
    })

    const main = document.querySelector("main")

    function menu(){
    
        const div = document.createElement("div")
        div.className = "container";
        div.innerHTML += `
        <input type="button" value="Create Account">
        <input type="button" value="Login">
        <input type="button" value="Login with Facebook">
        `
        
        main.appendChild(div)
        

        div.addEventListener("click", function(e){
            e.preventDefault();
            div.style.visibility = "hidden"

            switch(e.target.value){
                case "Create Account":
                    createAccountForm();
                    break;
                case "Login":
                    createLoginForm();
                    break;
                case "Login with Facebook":
                    facebookLogin();
                    break;
            }
        })
    }
    
    
    function createAccountForm(){
        const div = document.createElement("div")
        div.className = "form-style";
        div.innerHTML += `
        <form>
        <fieldset><legend>Create an Account</legend>
        <label for="username"><span>Username <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
        <label for="email"><span>Email <span class="required">*</span></span><input type="email" class="input-field" name="field2" value="" /></label>
        <label for="password"><span>Password <span class="required">*</span></span><input type="password" class="input-field" name="field3" value="" /></label>
        <label for="avatar"><span>Avatar</span><input type="text" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><span> </span><input type="submit" value="Create Account" /></label>
        </fieldset>
        </form>`

        main.appendChild(div)

        div.addEventListener("submit", function(e){
            e.preventDefault();
            
                fetch( `http://localhost:3000/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                    "username": `${e.target.username.value}`,
                    "email": `${e.target.email.value}`,
                    "password": `${e.target.password.value}`,
                    "avatar": `${e.target.avatar.value}`,
                    })
                })
                .then(response => response.json())
                .then(console.log(response))
        })
    }

    function createLoginForm(){
        const div = document.createElement("div")
        div.className = "form-style";
        div.innerHTML += `
        <form>
        <fieldset><legend>Login</legend>
        <label for="username"><span>Username <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
        <label for="password"><span>Password <span class="required">*</span></span><input type="password" class="input-field" name="field3" value="" /></label>
        <label><span> </span><input type="submit" value="Login" /></label>
        </fieldset>
        </form>
        `

        main.appendChild(div)

    }

    function loginWithFacebook(){

    }



        


