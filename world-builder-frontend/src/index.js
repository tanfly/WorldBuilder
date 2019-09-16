function renderUserProfile(event) {
    let id = event.currentTarget.dataset.id
      App.fetchOneUser(id).then(userJson => {
        User.renderUserSegment(userJson)
        User.renderSidebar(userJson)
    })
  }

