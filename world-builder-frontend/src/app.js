class App{
    static fetchOneUser(id){
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
  }

  static fetchNewUser(username, email, password, avatar){
    console.log("fetchNewUser here")
      return fetch( `http://localhost:3000/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          user:{
        username: username,
        email: email,
        password: password,
        avatar: (avatar? avatar: "https://i.ibb.co/yqw12FZ/planet-1.png"),
          }
        })
    })
    .then(response => response.json())
    .then(json => {
        User.renderSidebar(json)
        User.renderUserSegment(json)
    })
  }


  static editUser(event, currentUsername, currentEmail, currentPassword, currentAvatar) {
    console.log("editUSer here")
    const current = event.currentTarget

    const id = current.dataset.id

    const newUsername = (document.getElementById('edit-username').value) ? (document.getElementById('edit-username').value) : currentUsername;
    const newEmail = (document.getElementById('edit-email').value) ? (document.getElementById('edit-email').value) : currentEmail;
    const newPassword = (document.getElementById('edit-password').value) ? (document.getElementById('edit-password').value) : currentPassword;
    const newAvatar = (document.getElementById('edit-avatar').value) ? (document.getElementById('edit-avatar').value) : currentAvatar;
    

    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json",
                "Accept": "application/json"
            },
      body: JSON.stringify ({
        user: {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        avatar: newAvatar
        }
      })
    })
    .then(response => response.json())
    .then(json => {
        this.clearPage()
        User.renderSidebar(json)
        User.renderUserSegment(json)
        
    })
  }

  static clearPage(){
    let main = document.getElementById("main")
    main.innerHTML = " "
  }

  static clearContent(){
    let content = (document.getElementsByClassName("content")[0])
    content.innerHTML = " "
  }
 

  static fetchWorld(id){
    return fetch(`http://localhost:3000/api/v1/worlds/${id}`)
    .then(response => response.json())
  }

  static fetchNewWorld(userId, name, image){
    console.log("fetchNewWorld here")
      return fetch( `http://localhost:3000/api/v1/users/${userId}/worlds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          world:{
        user_id: userId,
        name: name,
        image: (image ? image : "https://i.ibb.co/rQPrCq6/planet-world.jpg"),
          }
        })
    })
    .then(response => response.json())
    .then(json => {
        World.renderWorldSegment(json)
    })
  }

  static editWorld(event, id, userId, currentName, currentImage) {
    console.log("editWorld here")

    const newName = (document.getElementById('edit-world-name').value) ? (document.getElementById('edit-world-name').value) : currentName;
    const newImage = (document.getElementById('edit-world-image').value) ? (document.getElementById('edit-world-image').value) : currentImage;
    

    fetch(`http://localhost:3000/api/v1/users/${userId}/worlds/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json",
                "Accept": "application/json"
            },
      body: JSON.stringify ({
        world: {
        name: newName,
        image: newImage,
        user_id: userId
        }
      })
    })
    .then(response => response.json())
    .then(json => {
        this.clearContent()
        World.renderWorldSegment(json)
        
    })
  }

  static fetchRegion(id){
    return fetch(`http://localhost:3000/api/v1/regions/${id}`)
    .then(response => response.json())
  }

  static fetchNewRegion(worldId, name, image){
    console.log("fetchNewRegion here")
      return fetch( `http://localhost:3000/api/v1/worlds/${worldId}/regions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          region:{
        world_id: worldId,
        name: name,
        image: (image ? image : "https://i.ibb.co/RBYnnFS/Regions.jpg"),
          }
        })
    })
    .then(response => response.json())
    .then(json => {
        Region.renderRegionSegment(json)
    })
  }

  static fetchTerrain(id){
    return fetch(`http://localhost:3000/api/v1/terrains/${id}`)
    .then(response => response.json())
  }


  static fetchNewTerrain(regionId, description, image){
    console.log("fetchNewTerrain here")
      return fetch( `http://localhost:3000/api/v1/regions/${regionId}/terrains`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          terrain:{
        region_id: regionId,
        description: description,
        image: (image ? image : "https://i.ibb.co/2kS3qrk/terrain-ex.jpg"),
          }
        })
    })
    .then(response => response.json())
    .then(json => {
        Region.appendTerrain(json)
    })
  }




    
}