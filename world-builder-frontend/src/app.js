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

  static fetchWorld(id){
    return fetch(`http://localhost:3000/api/v1/worlds/${id}`)
    .then(response => response.json())
  }

  static fetchRegion(id){
    return fetch(`http://localhost:3000/api/v1/regions/${id}`)
    .then(response => response.json())
  }

  static fetchTerrain(id){
    return fetch(`http://localhost:3000/api/v1/terrains/${id}`)
    .then(response => response.json())
  }


    
}