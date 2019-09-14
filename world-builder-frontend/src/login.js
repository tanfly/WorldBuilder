    document.addEventListener("DOMContentLoaded", () =>{
        menu()
    })

    const main = document.querySelector("main")

    function menu(){
    
        const div = document.createElement("div")
        div.className = "container";
        div.id = "menu-buttons"
        div.innerHTML += `
        <input type="button" id="create-acct-btn" value="Create Account">
        <input type="button" id="login-btn" value="Login">
        <input type="button" id="facebook-login-btn" value="Login with Facebook">
        `

        document.body.appendChild(div)

        document.getElementById("create-acct-btn").onclick = createAccountForm; hideButtons;
        document.getElementById("login-btn").onclick = createLoginForm;
        document.getElementById("facebook-login-btn").onclick = loginWithFacebook;

        div.addEventListener("click", hideButtons);

    }
    
    
    function createAccountForm(){
        console.log("createAccount fn here")
        let newAccountForm = document.createElement("div")
        newAccountForm.className = "form-style"
        newAccountForm.id = "form"
        newAccountForm.innerHTML = ""
        newAccountForm.innerHTML =
        `
        <form id="create-acct-form">
        <fieldset><legend>Create an Account</legend>
        <label for="username"><span>Username <span class="required">*</span></span><input type="text" id="new-username" class="input-field" name="field1" value="" /></label>
        <label for="email"><span>Email <span class="required">*</span></span><input type="email" id="new-email" class="input-field" name="field2" value="" /></label>
        <label for="password"><span>Password <span class="required">*</span></span><input type="password" id="new-password" class="input-field" name="field3" value="" /></label>
        <label for="avatar"><span>Avatar</span><input type="text" id="new-avatar" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="form-submit-button" value="Create Account" /></label>
        </fieldset>
        `
        main.appendChild(newAccountForm)


        document.getElementById('form-submit-button').addEventListener("click", () => {
        makeNewUser();
        hideForm();
        });
        
    }

    function hideButtons(){
        const btns = document.getElementById("menu-buttons")
        if (btns.style.display === "none") {
            btns.style.display = "block";
          } else {
            btns.style.display = "none";
          }
    }

    function hideForm(){
        const form = document.getElementById("form")
        if (form.style.display === "none") {
            form.style.display = "block";
          } else {
            form.style.display = "none";
          }
    }

    function makeNewUser(){
        const form = document.getElementById("form")
        const username = document.getElementById('new-username').value
        const email = document.getElementById('new-email').value
        const password = document.getElementById('new-password').value
        const avatar = document.getElementById('new-avatar').value
        App.fetchNewUser(username, email, password, avatar)
    }

    function createLoginForm(){
        const div = document.createElement("div")
        div.className = "form-style";
        div.innerHTML += `
        <form>
        <fieldset><legend>Login</legend>
        <label for="username"><span>Username <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
        <label for="password"><span>Password <span class="required">*</span></span><input type="password" class="input-field" name="field3" value="" /></label>
        <label><input type="submit" value="Login" /></label>
        </fieldset>
        </form>
        `

        main.appendChild(div)

    }

    function loginWithFacebook(){

    }



        


