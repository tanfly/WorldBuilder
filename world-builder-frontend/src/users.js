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

        const sidebar = document.createElement("div")
        sidebar.classList.add("sidebar")
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

    static renderUserProfile(event) {
        let id = event.currentTarget.dataset.id
        let app = new App()
            App.fetchOneUser(id).then(userJson => {
            renderNewUserProfile(userJson)
        })
    }

    static renderUserSegment(userJson) {
        const user = userJson.data
        const userAttr = user.attributes

        const avatar = document.createElement('img')
        avatar.src = userAttr.avatar
        const username = document.createElement('p')
        username.innerText = userAttr.username
        const email = document.createElement('p')
        email.innerText = userAttr.email
        const editBtn = document.createElement("button")
        editBtn.dataset.id = user.id
        editBtn.onclick = User.editUser
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = user.id
        deleteBtn.onclick = this.deleteUser

        const content = document.createElement("div")
        content.className = "content"
        const grid = document.createElement("div")
        grid.className = "grid-container"
        const userInfo = document.createElement("div")
        userInfo.className = `${user.id}-info`
        userInfo.id = "user-info"
        userInfo.innerHTML = avatar + username
        const otherInfo = document.createElement("div")
        otherInfo.className = `${user.id}-other-info`
        otherInfo.id = "user-email"
        otherInfo.innerHTML = email + editBtn + deleteBtn

        content.append(grid)
        grid.append(userInfo, otherInfo)
      }


    static editUser(event) {
        let id = event.currentTarget.dataset.id
        let editUser = document.getElementById('edit-user-form')
        editUser.innerHTML = `<form class="ui form">
        <h4 class="ui dividing header">Edit Info</h4>
        <div class="field">
          <label>Username *</label>
          <div class="one field">
            <div class="field">
              <input type="text" id="edit-username" placeholder="Username">
            </div>
            <label>Email *</label>
            <div class="field">
              <input type="email" id="edit-email" placeholder="email@email.com">
            </div>
            <label>Password *</label>
            <div class="field">
              <input type="password" id="edit-password" placeholder="Password">
            </div>
            <label>Avatar *</label>
            <div class="field">
              <input type="text" id="edit-avatar" placeholder="Avatar Image URL">
            </div>
            <div class="ui button" id="edit-user-button" tabindex="0">Edit User</div>
            </form>`
            let currentUsername = document.getElementById('username').innerText
            let currentEmail = document.getElementById('email').innerText
            let currentPassword = document.getElementById('password').innerText
            let currentAvatar = document.getElementById('avatar').src 
            document.getElementById('edit-username').value = currentUserName
            document.getElementById('edit-email').value = currentEmail
            document.getElementById('edit-password').value = currentPassword
            document.getElementById('edit-avatar').value = currentAvatar
            let editUserForm = document.getElementById('edit-user-button')
            editUserForm.dataset.id = id
            editUserForm.addEventListener('click', App.userEditPatch)
       }

    static deleteTrip(event) {
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
