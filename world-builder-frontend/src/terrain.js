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
}