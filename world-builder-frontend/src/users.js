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
        sidebar.id = user.id

        const avatar = document.createElement('img')
        const username = document.createElement('p')

        const logoutBtn = document.createElement("button")
        logoutBtn.dataset.id = user.id
        logoutBtn.id = "logout-btn"
        logoutBtn.innerText = "Logout"
        logoutBtn.onclick = this.userLogout

        avatar.src = userAttr.avatar
        username.innerText = userAttr.username

        avatar.dataset.id = user.id
        username.dataset.id = user.id

        username.id = `sidebar-${user.id}`
        
        sidebar.appendChild(username)
        sidebar.appendChild(avatar)
        sidebar.appendChild(logoutBtn)

        let sidebarArray = [username, avatar]
        
        sidebarArray.forEach(el => el.addEventListener('click', function(e){
            main.innerHTML = " "
            let id = e.currentTarget.dataset.id
                App.fetchOneUser(id).then(userJson => {
                User.renderUserSegment(userJson)
                User.renderSidebar(userJson)
                console.log("rerender user here")
                })
            })
        )
    }

    static renderUserSegment(userJson) {
        
        console.log("render user segment here")
        
        const main = document.querySelector("main")

        const user = userJson.data
        const userAttr = user.attributes
        const worlds = userAttr.worlds

        const avatar = document.createElement('img')
        avatar.src = userAttr.avatar
        avatar.id = "avatar"
        const username = document.createElement('h1')
        username.id = "username"
        username.innerText = userAttr.username
        const email = document.createElement('p')
        email.id = "email"
        email.innerText = userAttr.email
        const editBtn = document.createElement("button")
        editBtn.dataset.id = user.id
        editBtn.innerText = "Edit Account"
        editBtn.onclick = User.toggleVisibility
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = user.id
        deleteBtn.innerText = "Delete Account"
        deleteBtn.onclick = this.deleteUser
        const worldBtn = document.createElement("button")
        worldBtn.dataset.id = user.id
        worldBtn.id = "new-world"
        worldBtn.innerText = "Create a New World"
        worldBtn.onclick = World.createWorldForm
       

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
        const userWorlds = document.createElement("div")
        userWorlds.className = `${user.id}-worlds`
        userWorlds.id = "user-worlds"
        userWorlds.appendChild(worldBtn)


        grid.append(userInfo, otherInfo, userWorlds)
        content.appendChild(grid)

        main.appendChild(content)

        if (worlds.length > 0){
            User.getUserWorlds(worlds)
        }
      }


    static editUser(event){

        const id = event.currentTarget.dataset.id

        const content = (document.getElementsByClassName("grid-container")[0])

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

    static toggleVisibility(event){
        const form = document.getElementById("edit-user-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            User.editUser(event)
            return;
        }
    }

    static getUserWorlds(worlds){
        let area = document.getElementById("user-worlds")

            
        function eachSlice(myArray, chunk_size){
            var results = [];
                
            while (myArray.length) {
                results.push(myArray.splice(0, chunk_size));
            }
                
            return results;
        }

        let row = document.createElement("div")
        row.className = "row"
        area.appendChild(row)

        let worldDiv = document.createElement("div")
        worldDiv.className = "column"
        row.append(worldDiv)

        let worldSet = eachSlice(worlds, 4)

        worldSet.map(worldObjs => 
            worldObjs.map(function(world){

                let worldName = document.createElement("p")
                worldName.id = world.name
                worldName.innerText = world.name
                console.log(world.name)

                let worldPic = document.createElement("img")
                worldPic.id = "world-image"
                worldPic.src = world.image
                console.log(world.image)
                
                worldDiv.append(worldName, worldPic)
            })
        )
    }


    static deleteUser(event) {
        const result = confirm("Are you sure you want to delete your account?");
        if (result) {
        let id = event.currentTarget.dataset.id
         fetch(`http://localhost:3000/api/v1/users/${id}`, {
         method: "DELETE"
       })
       const main = document.getElementById("main")
       main.innerHTML = " "
       menu();
    }
    }

    static userLogout(event){

        const current = event.currentTarget
    
        const id = current.dataset.id

        const main = document.getElementById("main")
        main.innerHTML = " "
        addDiv();
    
        return fetch(`http://localhost:3000/api/v1/sessions/${id}`, {
          method: "DELETE",
        })
    
      }
}
