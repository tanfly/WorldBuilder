class App{
    static fetchUser(id){
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
  }

  static fetchNewUser(username, email, password, avatar){
      return fetch( `http://localhost:3000/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "avatar": avatar,
        })
    })
    .then(response => response.json())
    .then(json => {
        User.renderHome(json)
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