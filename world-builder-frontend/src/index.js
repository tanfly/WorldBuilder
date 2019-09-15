function renderUserProfile(event) {
    let id = event.currentTarget.dataset.id
    let app = new App()
      App.fetchOneUser(id).then(userJson => {
      renderNewUserProfile(userJson)
    })
  }


function renderNewUserProfile(userJson) {
    User.renderUserSegment(userJson)
    World.renderWorldSegment(userJson)
}
