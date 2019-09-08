class App{
    static fetchUser(id){
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
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