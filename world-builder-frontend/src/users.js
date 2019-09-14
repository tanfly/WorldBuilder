class User{

    constructor(username, email, password, avatar){
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }

    static renderSidebar(userJson) {

        const user = userJson.data
        const userAttr = user.attributes

        const main = document.querySelector("main")
        const sidebar = document.createElement("div")
        main.appendChild(sidebar)
        
        sidebar.className = "sidebar"
        sidebar.id = "sidebar"

        const avatar = document.createElement('img')
        const username = document.createElement('p')
        username.classList.add("active")

        avatar.src = userAttr.avatar
        username.innerText = userAttr.username

        avatar.dataset.id = user.id
        username.dataset.id = user.id

        username.id = `sidebar-${user.id}`
        
        sidebar.appendChild(username)
        sidebar.appendChild(avatar)
        
        sidebar.addEventListener('click', function(e){
          if(e.target.dataset.id == user.id){
          renderUserProfile(e)}
        })
    }

    static renderUserSegment(userJson) {
        
        console.log("render user segment here")
        const main = document.querySelector("main")

        const user = userJson.data
        const userAttr = user.attributes

        const avatar = document.createElement('img')
        avatar.src = userAttr.avatar
        avatar.id = "avatar"
        const username = document.createElement('p')
        username.id = "username"
        username.innerText = userAttr.username
        const email = document.createElement('p')
        email.id = "email"
        email.innerText = userAttr.email
        const editBtn = document.createElement("button")
        editBtn.dataset.id = user.id
        editBtn.innerText = "Edit Account"
        editBtn.onclick = User.editUser
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = user.id
        deleteBtn.innerText = "Delete Account"
        deleteBtn.onclick = this.deleteUser

        const content = document.createElement("div")
        content.className = "content"
        const grid = document.createElement("div")
        grid.className = "grid-container"
        const userInfo = document.createElement("div")
        userInfo.className = `${user.id}-info`
        userInfo.id = "user-info"
        userInfo.appendChild(avatar)
        userInfo.appendChild(username)
        const otherInfo = document.createElement("div")
        otherInfo.className = `${user.id}-other-info`
        otherInfo.id = "user-email"
        otherInfo.appendChild(email)
        otherInfo.appendChild(editBtn)
        otherInfo.appendChild(deleteBtn)

        content.appendChild(grid)
        grid.append(userInfo, otherInfo)

        main.appendChild(content)
      }


    static editUser(event) {
        const id = event.currentTarget.dataset.id

        const content = (document.getElementsByClassName("content")[0])

        const currentUsername = document.getElementById('username').innerText
        const currentEmail = document.getElementById('email').innerText
        const currentPassword = this.password
        const currentAvatar = document.getElementById('avatar').src 

        const editUser = document.createElement("div")
        content.appendChild(editUser)
        editUser.className = "form-style"
        editUser.innerHTML = `
        <form id="edit-user-form">
        <fieldset><legend>Edit Account</legend>
        <label for="username"><span>Username <span class="required">*</span></span><input type="text" id="edit-username" class="input-field" name="field1" value="" placeholder="${currentUsername}" /></label>
        <label for="email"><span>Email <span class="required">*</span></span><input type="email" id="edit-email" class="input-field" name="field2" value="" placeholder="${currentEmail}" /></label>
        <label for="password"><span>Password <span class="required">*</span></span><input type="password" id="edit-password" class="input-field" name="field3" value="" /></label>
        <label for="avatar"><span>Avatar</span><input type="text" id="edit-avatar" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="edit-submit-button" value="Edit Account" /></label>
        </fieldset>
        `
  
            const editSubmit = document.getElementById('edit-submit-button')
            editSubmit.dataset.id = id
            
            editSubmit.addEventListener('click', function(e){
                e.preventDefault();
                App.editUser(e, currentUsername, currentEmail, currentPassword, currentAvatar)
            })
    }

    static deleteUser(event) {
        let id = event.currentTarget.dataset.id
         fetch(`http://localhost:3000/api/v1/users/${id}`, {
         method: "DELETE"
       })
       .then(response => response.json())
       .then(json => {
         let userInfo = document.getElementById('twelve')
         let sideInfo = document.getElementById('invertedMenu')
         userInfo.innerHTML = ""
         let sideUser = document.querySelector(`#sidebar-${id}`)
         sideInfo.removeChild(sideUser)
         })
    }
}
