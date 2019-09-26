class Terrain {
    static createTerrainForm(event){
        let id = event.target.dataset.id

        let newTerrainForm = document.createElement("div")
        newTerrainForm.className = "form-style"
        newTerrainForm.id = "new-terrain-form"
        newTerrainForm.innerHTML = ""
        newTerrainForm.innerHTML =
        `
        <form>
        <fieldset><legend>Create Region's Terrain:</legend>
        <label for= "description"><span>Description: <span class="required">*</span></span><textarea rows = "3" cols = "80" id="new-terrain-description" class="input-field" name="field1" value="" placeholder="Island, Desert, Mountains, Forest, etc."></textarea></label>
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
        const terrain = document.getElementById("terrain-container")
        const id = event.currentTarget.dataset.id
        const region = document.getElementById("region-name")
        const regionId = region.dataset.id

        let currentDesc = document.getElementById("region-terrain-desc")
        let currentImage = document.getElementById("region-terrain-image")

        let editTerrainForm = document.createElement("div")
        terrain.appendChild(editTerrainForm)
        editTerrainForm.className = "form-style"
        editTerrainForm.id = "edit-terrain-form"
        editTerrainForm.innerHTML = ""
        editTerrainForm.innerHTML =
        `
        <form>
        <fieldset><legend>Edit Terrain:</legend>
        <label for= "description"><span>Description: <span class="required">*</span></span><textarea rows = "3" cols = "80" id="edit-terrain-description" class="input-field" name="field1" value="" placeholder="Island, Desert, Mountains, Forest, etc."></textarea></label>
        <label for="image"><span>Image:</span><input type="text" id="edit-terrain-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="edit-terrain-submit-button" value="Edit Terrain" /></label>
        </fieldset>
        `

        document.getElementById("edit-terrain-description").value = currentDesc.innerText
        document.getElementById("edit-terrain-image").value = currentImage


        const editSubmit = document.getElementById('edit-terrain-submit-button')
        editSubmit.dataset.id = id
        
        editSubmit.addEventListener('click', function(e){
            e.preventDefault();
            App.editTerrain(e, id, regionId, currentDesc, currentImage)
        })
    }


    static deleteTerrain(event){
        
        const id = event.currentTarget.dataset.id
        const region = document.getElementById("region-name")
        const regionId = region.dataset.id
      
        


        const result = confirm("Delete terrain?");
        if (result) {

            fetch(`http://localhost:3000/api/v1/regions/${regionId}/terrains/${id}`, {
            method: "DELETE"
            })
            App.fetchRegion(regionId)
        }
    }
}