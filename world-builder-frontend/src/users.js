class User{

    constructor(username, email, password, avatar){
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }

    static renderSideBar(userJson) {
        let user = userJson.data
        let userAttr = user.attributes
        let sideBar = document.getElementById('invertedMenu')
        let a = document.createElement('a')
        a.addEventListener('click', function(e){
         renderUserProfile(e)})
        a.classList.add("active", "item")
        sideBar.appendChild(a)
        a.innerText = userAttr.username
        a.dataset.id = user.id
        a.id = `sidebar-${user.id}`
    }

    static renderUserProfile(event) {
        let id = event.currentTarget.dataset.id
        let app = new App()
            App.fetchOneUser(id).then(userJson => {
            renderNewUserProfile(userJson)
        })
    }

    static renderUserSegment(userJson) {
        let user = userJson.data
        let userAttr = user.attributes
        let container = document.getElementById('twelve')
        container.innerHTML = ""
        this.createUserSegment(user.id)
        let user_info = document.getElementById('user-info')
        let userDetails = document.createElement('div')
        let imgDiv = document.createElement('div')
        let img = document.createElement('img')
        let b = document.createElement('b')
        let b2 = document.createElement('b')
        let p = document.createElement('p')
        let p2 = document.createElement('p')
        img.className = 'avatar'
        userDetails.classList.add("four", "wide", "column")
        imgDiv.classList.add("ten", "wide", "column")
        user_info.append(userDetails, imgDiv)
        userDetails.append(b, p, b2, p2)
        imgDiv.appendChild(img)
        b.innerText = 'Userame:'
        b2.innerText = 'Email:'
        p.innerText = userAttr.username
        p2.innerText = userAttr.email
        img.src = userAttr.avatar
        p.id = 'username'
        p2.id = 'email'
        img.id = 'avatar'
      }
      

    static createUserSegment(id) {
        let segmentsDiv = document.querySelector('.twelve')
        let div = document.createElement('div')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let div4 = document.createElement('div')
        let div5 = document.createElement('div')
        let div6 = document.createElement('div')
      
        segmentsDiv.appendChild(div)
        div.append(div1, div2, div3,)
        div2.appendChild(div6)
        div3.append(div4, div5)
        div.classList.add("ui", "segment")
        div1.classList.add("ui", "top", "attached", "label")
        div2.classList.add("ui", "grid", "user-info") //trip-description
        div3.classList.add("ui", "two", "buttons")
        div4.classList.add("ui", "basic", "blue", "button")
        div5.classList.add("ui", "basic", "red", "button")
      
        div2.id = "user-info" //trip-description
        div4.id = "edit-user"
        div5.id = "delete-user"
        div6.id = "edit-user-form"
        div1.innerText = "User Info"
        div4.innerText = "Edit"
        div5.innerText = "Delete"
      
        let eButton = document.getElementById('edit-user')
        eButton.dataset.id = id
        eButton.onclick = User.editUser
        let dButton = document.getElementById('delete-user')
        dButton.dataset.id = id
        dButton.onclick = this.deleteUser
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
