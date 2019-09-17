class Region {
    static renderRegionSegment(regionJson){
        
        const regionData = regionJson.data 
        const regionAttr = regionData.attributes 
        const regionRels = regionData.relationships




        console.log("renderRegion here")
        const content = (document.getElementsByClassName("content")[0])
        content.innerHTML = " "
        
        const image = document.createElement('img')
        image.src = regionAttr.image
        image.id = "region-image"
        const name = document.createElement('h1')
        name.id = "region-name"
        name.innerText = regionAttr.name
        const editBtn = document.createElement("button")
        editBtn.dataset.id = regionData.id
        editBtn.innerText = "Edit Region"
        editBtn.onclick = Region.toggleVisibility
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = regionData.id
        deleteBtn.innerText = "Delete Region"
        deleteBtn.onclick = this.deleteRegion
       

        const grid = document.createElement("div")
        grid.className = "grid-container"
        const regionInfo = document.createElement("div")
        regionInfo.className = `${regionData.id}-info`
        regionInfo.id = "region-info"
        regionInfo.appendChild(image)
        regionInfo.appendChild(name)
        const otherInfo = document.createElement("div")
        otherInfo.className = `${regionData.id}-other-info`
        otherInfo.id = "region-edit-delete"
        otherInfo.appendChild(editBtn)
        otherInfo.appendChild(deleteBtn)


        grid.appendChild(regionInfo)
        grid.appendChild(otherInfo)

        content.appendChild(grid)

    }

    static createRegionForm(event){
        let id = event.target.dataset.id

        let newRegionForm = document.createElement("div")
        newRegionForm.className = "form-style"
        newRegionForm.id = "new-region-form"
        newRegionForm.innerHTML = ""
        newRegionForm.innerHTML =
        `
        <form id="create-region-form">
        <fieldset><legend>Create a New Region</legend>
        <label for= "name"><span>Name: <span class="required">*</span></span><input type="text" id="new-region-name" class="input-field" name="field1" value="" /></label>
        <label for="image"><span>Image:</span><input type="text" id="new-region-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="new-region-submit-button" value="Create Region" /></label>
        </fieldset>
        `

        const container = document.getElementById("world-regions")
        container.appendChild(newRegionForm)


        document.getElementById('new-region-submit-button').addEventListener("click", () => {
        Region.createNewRegion(event, id);
        });
        
    }

    static createNewRegion(event, id){
        const worldId = id
        const name = document.getElementById('new-region-name').value
        const image = document.getElementById('new-region-image').value
        App.fetchNewRegion(worldId, name, image)
    }
    

    static editRegion(event){

        const id = event.currentTarget.dataset.id

        const sidebar = (document.getElementsByClassName("sidebar")[0])
        const userId = sidebar.id

        const content = (document.getElementsByClassName("grid-container")[0])

        const currentName = document.getElementById('region-name').innerText
        const currentImage = document.getElementById('region-image').src
     

        const editRegion = document.createElement("div")
        content.appendChild(editRegion)
        editRegion.className = "form-style"
        editRegion.innerHTML = `
        <form id="edit-region-form">
        <fieldset><legend>Edit Region</legend>
        <label for="username"><span>Name<span class="required">*</span></span><input type="text" id="edit-region-name" class="input-field" name="field1" value="" placeholder="${currentName}" /></label>
        <label for="avatar"><span>Image</span><input type="text" id="edit-region-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="edit-region-submit-button" value="Edit Region" /></label>
        </fieldset>
        `

  
        const editSubmit = document.getElementById('edit-region-submit-button')
        editSubmit.dataset.id = id
        
        editSubmit.addEventListener('click', function(e){
            e.preventDefault();
            App.editRegion(e, id, userId, currentName, currentImage)
        })
    }

    static toggleVisibility(event){
        const form = document.getElementById("edit-region-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            Region.editRegion(event)
            return;
        }
    }

    static deleteRegion(event) {
        const sidebar = (document.getElementsByClassName("sidebar")[0])
        const userId = sidebar.id


        const result = confirm("Delete this region?");
        if (result) {
            let id = event.currentTarget.dataset.id
            fetch(`http://localhost:3000/api/v1/users/${userId}/regions/${id}`, {
            method: "DELETE"
            })
            
            const main = document.getElementById("main")
            main.innerHTML = " "
        
            App.fetchOneUser(id).then(userJson => {
                User.renderUserSegment(userJson)
                User.renderSidebar(userJson)
            })
            
        }
    }
}