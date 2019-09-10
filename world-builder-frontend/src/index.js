function renderUserProfile(event) {
    let id = event.currentTarget.dataset.id
    let app = new App()
      App.fetchOneUser(id).then(userJson => {
      renderNewUserProfile(userJson)
    })
  }
  
  function createSegment(name) {
    let columnDiv = document.querySelector('.twelve')
    let segmentDiv = document.createElement('div')
    let labelDiv = document.createElement('div')
    let addButtonDiv = document.createElement('div')
    let cardsDiv = document.createElement('div')
    let formDiv = document.createElement('div')
  
    segmentDiv.classList.add("ui", "segment")
    labelDiv.classList.add("ui", "top", "attached", "label")
    addButtonDiv.classList.add("ui", "blue", "button")
    cardsDiv.classList.add("ui", "cards")
    formDiv.id = "form"
  
    addButtonDiv.innerText = "Add New"
    labelDiv.innerText = name
  
    columnDiv.appendChild(segmentDiv)
    segmentDiv.append(labelDiv, addButtonDiv, formDiv, cardsDiv)
  
    return segmentDiv
  }


function renderNewUserProfile(userJson) {
    User.renderUserSegment(userJson)
}