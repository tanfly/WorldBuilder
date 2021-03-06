class World {
    static renderWorldSegment(worldJson){
        const worldData = worldJson.data 
        const worldAttr = worldData.attributes 
        const regions = worldAttr.regions



        console.log("renderWorld here")
        const content = (document.getElementsByClassName("content")[0])
        content.innerHTML = " "
        
        const image = document.createElement('img')
        image.src = worldAttr.image
        image.id = "world-image"
        const name = document.createElement('h1')
        name.id = "world-name"
        name.innerText = worldAttr.name
        const editBtn = document.createElement("button")
        editBtn.dataset.id = worldData.id
        editBtn.innerText = "Edit World"
        editBtn.onclick = World.toggleVisibility
        const deleteBtn = document.createElement("button")
        deleteBtn.dataset.id = worldData.id
        deleteBtn.innerText = "Delete World"
        deleteBtn.onclick = this.deleteWorld
        const regionBtn = document.createElement("button")
        regionBtn.dataset.id = worldData.id
        regionBtn.id = "new-region"
        regionBtn.innerText = "Create a New Region"
        regionBtn.onclick = this.toggleCreateRegion
       

        const grid = document.createElement("div")
        grid.className = "grid-container"
        const worldInfo = document.createElement("div")
        worldInfo.className = `${worldData.id}-info`
        worldInfo.id = "world-info"
        worldInfo.appendChild(image)
        worldInfo.appendChild(name)
        const otherInfo = document.createElement("div")
        otherInfo.className = `${worldData.id}-other-info`
        otherInfo.id = "world-edit-delete"
        otherInfo.appendChild(editBtn)
        otherInfo.appendChild(deleteBtn)
        const worldRegions = document.createElement("div")
        worldRegions.className = `${worldData.id}-regions`
        worldRegions.id = "world-regions"
        worldRegions.appendChild(regionBtn)


        grid.appendChild(worldInfo)
        grid.appendChild(otherInfo)
        grid.appendChild(worldRegions)

        content.appendChild(grid)


        if (regions.length > 0){
            World.getWorldRegions(regions)
        }

    }

    static createWorldForm(event){
        let id = event.target.dataset.id

        let newWorldForm = document.createElement("div")
        newWorldForm.className = "form-style"
        newWorldForm.id = "new-world-form"
        newWorldForm.innerHTML = ""
        newWorldForm.innerHTML =
        `
        <form id="create-world-form">
        <fieldset><legend>Create a New World</legend>
        <label for= "name"><span>Name: <span class="required">*</span></span><input type="text" id="new-world-name" class="input-field" name="field1" value="" /></label>
        <label for="image"><span>Image:</span><input type="text" id="new-world-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="new-world-submit-button" value="Create World" /></label>
        </fieldset>
        `

        const container = document.getElementById("user-worlds")
        container.appendChild(newWorldForm)


        document.getElementById('new-world-submit-button').addEventListener("click", () => {
        World.createNewWorld(id);
        });
        
    }

    static createNewWorld(id){
        const userId = id
        const name = document.getElementById('new-world-name').value
        const image = document.getElementById('new-world-image').value
        App.fetchNewWorld(userId, name, image)
    }
    

    static editWorld(event){

        const id = event.currentTarget.dataset.id

        const sidebar = (document.getElementsByClassName("sidebar")[0])
        const userId = sidebar.id

        const content = (document.getElementsByClassName("grid-container")[0])

        const currentName = document.getElementById('world-name').innerText
        const currentImage = document.getElementById('world-image').src
     

        const editWorld = document.createElement("div")
        content.appendChild(editWorld)
        editWorld.className = "form-style"
        editWorld.innerHTML = `
        <form id="edit-world-form">
        <fieldset><legend>Edit World</legend>
        <label for="username"><span>Name<span class="required">*</span></span><input type="text" id="edit-world-name" class="input-field" name="field1" value="" placeholder="${currentName}" /></label>
        <label for="avatar"><span>Image</span><input type="text" id="edit-world-image" class="input-field" name="field4" value="" placeholder="Enter an image URL" /></label>
        </select></label>
        <label><input type="button" id="edit-world-submit-button" value="Edit World" /></label>
        </fieldset>
        `

  
        const editSubmit = document.getElementById('edit-world-submit-button')
        editSubmit.dataset.id = id
        
        editSubmit.addEventListener('click', function(e){
            e.preventDefault();
            App.editWorld(e, id, userId, currentName, currentImage)
        })
    }

    static toggleVisibility(event){
        const form = document.getElementById("edit-world-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            World.editWorld(event)
            return;
        }
    }

    static toggleCreateRegion(event){
        const form = document.getElementById("new-region-form");

        if (form){
            (form.style.display === 'none') ? (form.style.display = 'block') : (form.style.display = 'none')
        }
        else {
            Region.createRegionForm(event)
            return;
        }
    }

    static getWorldRegions(regions){
        console.log("getWorldRegions here")
        let area = document.getElementById("world-regions")

            
        function eachSlice(myArray, chunk_size){
            var results = [];
                
            while (myArray.length) {
                results.push(myArray.splice(0, chunk_size));
            }
                
            return results;
        }

        let row = document.createElement("div")
        row.className = "row"
        area.appendChild(row)

        let regionDiv = document.createElement("div")
        regionDiv.className = "column"
        row.append(regionDiv)

        let header = document.createElement("h1")
        header.id = "regions"
        header.innerText = "Regions:"
        regionDiv.appendChild(header)

        let regionSet = eachSlice(regions, 4)

        regionSet.map(regionObjs => 
            regionObjs.map(function(region){

                let regionName = document.createElement("h2")
                regionName.dataset.id = region.id
                regionName.id = region.name
                regionName.innerText = region.name

                let regionPic = document.createElement("img")
                regionPic.dataset.id = region.id
                regionPic.id = "region-image"
                regionPic.src = region.image

                regionName.addEventListener("click", function(e){
                    e.preventDefault()
                    App.fetchRegion(region.id)
                })

                regionPic.addEventListener("click", function(e){
                    e.preventDefault();
                    App.fetchRegion(region.id)
                })
                
                regionDiv.append(regionName, regionPic)
            })
        )
    }


    static deleteWorld(event) {
        const sidebar = (document.getElementsByClassName("sidebar")[0])
        const userId = sidebar.id


        const result = confirm("Delete this world?");
        if (result) {
            let id = event.currentTarget.dataset.id
            fetch(`http://localhost:3000/api/v1/users/${userId}/worlds/${id}`, {
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