class Region {

    static renderRegionSegment(regionJson){

        const regionData = regionJson.data
        const regionAttr = regionData.attributes
        const world = regionAttr.world
        const terrain = regionAttr.terrain
        console.log(terrain)



        console.log("renderRegion here")
        const content = (document.getElementsByClassName("content")[0])
        content.innerHTML = " "

        const image = document.createElement('img')
        image.src = regionAttr.image
        image.id = "region-image"
        const name = document.createElement('h1')
        name.id = "region-name"
        name.dataset.id = regionData.id
        name.innerText = regionAttr.name
        const editBtn = document.createElement("button")
        editBtn.dataset.id = regionData.id
        editBtn.innerText = "Edit Region"
        editBtn.onclick = Region.toggleEditRegionVisibility
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = regionData.id
        deleteBtn.id = "delete-btn"
        deleteBtn.innerText = "Delete Region"
        deleteBtn.onclick = this.deleteRegion
        const terrainBtn = document.createElement("button")
        terrainBtn.dataset.id = regionData.id
        terrainBtn.id = "new-terrain"
        terrainBtn.innerText = "Create Terrain"
        terrainBtn.onclick = Region.toggleCreateTerrainVisibility

        const grid = document.createElement("div")
        grid.className = "grid-container"
        grid.id = world.id
        const regionInfo = document.createElement("div")
        regionInfo.className = `${regionData.id}-info`
        regionInfo.id = "region-info"
        regionInfo.appendChild(image)
        regionInfo.appendChild(name)
        const otherInfo = document.createElement("div")
        otherInfo.className = `${regionData.id}-other-info`
        otherInfo.id = "region-edit-delete"
        otherInfo.appendChild(editBtn)
        otherInfo.appendChild(deleteBtn)
        const regionDetails = document.createElement("div")
        regionDetails.className = `${regionData.id}-regions`
        regionDetails.id = "region-details"
        regionDetails.appendChild(terrainBtn)

        grid.appendChild(regionInfo)
        grid.appendChild(otherInfo)
        grid.appendChild(regionDetails)

        content.appendChild(grid)
        if ((terrain) && (terrain != null)){
            this.appendTerrain(terrain)
        }
        

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
        const grid = (document.getElementsByClassName("grid-container")[0])
        const id = event.currentTarget.dataset.id
        const worldId = grid.id
        

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
            App.editRegion(e, id, worldId, currentName, currentImage)
        })
    }



    static toggleEditRegionVisibility(event){
        const form = document.getElementById("edit-region-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            Region.editRegion(event)
            return;
        }
    }



    static deleteRegion() {
        const grid = (document.getElementsByClassName("grid-container")[0])
        const region = document.getElementById("delete-btn")
        let id = region.dataset.id
        let worldId = grid.id

        let sidebar = (document.getElementsByClassName("sidebar")[0])
        let userId = sidebar.id


        const result = confirm("Delete this region?");
        if (result) {
            fetch(`http://localhost:3000/api/v1/worlds/${worldId}/regions/${id}`, {
            method: "DELETE"
            })
            
            const main = document.getElementById("main")
            main.innerHTML = " "
        
            App.fetchOneUser(userId).then(userJson => {
                User.renderUserSegment(userJson)
                User.renderSidebar(userJson)
            })
            
        }
    }



    static toggleCreateTerrainVisibility(event){
        const form = document.getElementById("new-terrain-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            Terrain.createTerrainForm(event)
            return;
        }
    }



    static appendTerrain(info){
        const area = document.getElementById("region-details")
        area.innerText = " "

        const head = document.createElement("h3")
        head.innerText = "Terrain"


        const terrainDesc = document.createElement("p")
        terrainDesc.id = "region-terrain-desc"
        terrainDesc.innerText = info.description

        const terrainImg = document.createElement("img")
        terrainImg.id = "region-terrain-img"
        terrainImg.src = info.image

        const editBtn = document.createElement("button")
        editBtn.dataset.id = info.id
        editBtn.innerText = "Edit Terrain"
        editBtn.onclick = Region.toggleEditTerrainVisibility

        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = info.id
        deleteBtn.innerText = "Delete Terrain"
        deleteBtn.onclick = Terrain.deleteTerrain

        const infoGrid = document.createElement("div")
        infoGrid.className = "subgrid-container"
        
        
        const terrain = document.createElement("div")
        terrain.id = "terrain-container"

                
        terrain.append(head, terrainDesc, terrainImg, editBtn, deleteBtn)
        infoGrid.appendChild(terrain)
        area.appendChild(infoGrid)
    }




    static appendTerrainFromJson(json){
        const area = document.getElementById("region-details")
        area.innerText = " "

        const terrainData = json.data
        const terrainAttr = terrainData.attributes

        const head = document.createElement("h3")
        head.innerText = "Terrain"


        const terrainDesc = document.createElement("p")
        terrainDesc.id = "region-terrain-desc"
        terrainDesc.innerText = terrainAttr.description

        const terrainImg = document.createElement("img")
        terrainImg.id = "region-terrain-img"
        terrainImg.src = terrainAttr.image

        const editBtn = document.createElement("button")
        editBtn.dataset.id = terrainData.id
        editBtn.innerText = "Edit Terrain"
        editBtn.onclick = Region.toggleEditTerrainVisibility

        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = terrainData.id
        deleteBtn.innerText = "Delete Terrain"
        deleteBtn.onclick = Terrain.deleteTerrain

        const infoGrid = document.createElement("div")
        infoGrid.className = "subgrid-container"
        
        
        const terrain = document.createElement("div")
        terrain.id = "terrain-container"

                
        terrain.append(head, terrainDesc, terrainImg, editBtn, deleteBtn)
        infoGrid.appendChild(terrain)
        area.appendChild(infoGrid)
    }



    static toggleEditTerrainVisibility(event){
        const form = document.getElementById("edit-terrain-form");
        console.log("toggleHere")
        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            Terrain.editTerrain(event)
            return;
        }
    }

}