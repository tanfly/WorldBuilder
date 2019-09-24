class Terrain {
    static createTerrainForm(event){
        let id = event.target.dataset.id

        let newTerrainForm = document.createElement("div")
        newTerrainForm.className = "form-style"
        newTerrainForm.id = "new-terrain-form"
        newTerrainForm.innerHTML = ""
        newTerrainForm.innerHTML =
        `
        <form id="create-terrain-form">
        <fieldset><legend>Create Region's Terrain:</legend>
        <label for= "description"><span>Description: <span class="required">*</span></span><input type="text" size="600" id="new-terrain-description" class="input-field" name="field1" value="" /></label>
        <label for="image"><span>Image:</span><input type="text" id="new-terrain-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="new-terrain-submit-button" value="Create Terrain" /></label>
        </fieldset>
        `

        const container = document.getElementById("region-details")
        container.appendChild(newTerrainForm)


        document.getElementById('new-terrain-submit-button').addEventListener("click", () => {
        Terrain.createNewTerrain(event, id);
        });
        
    }

    static createNewTerrain(event, id){
        const regionId = id
        const description = document.getElementById('new-terrain-description').value
        const image = document.getElementById('new-terrain-image').value
        App.fetchNewTerrain(regionId, description, image)
    }

    static editTerrain(event){

        const id = event.currentTarget.dataset.id

        const sidebar = (document.getElementsByClassName("sidebar")[0])
        const userId = sidebar.id

        const content = (document.getElementsByClassName("grid-container")[0])

        const currentDesc = document.getElementById('region-terrain-desc').innerText
        const currentImage = document.getElementById('region-terrain-img').src
     

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
            App.editRegion(e, id, userId, currentDesc, currentImage)
        })
    }
}