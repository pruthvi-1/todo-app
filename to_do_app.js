const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
console.log(itemsArray)
document.querySelector("#enter").addEventListener("click", ()=>{
    const item = document.querySelector("#item")
    createItem(item);
})

document.querySelector("#item").addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
      const item = document.querySelector("#item")
      createItem(item)
    }
  })

function displayItems(){
    let items = ""
    for (let i = 0; i < itemsArray.length ; i++){
        items += `<div class="item">
                    <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                    </div>
                    <div class="edit-controller">
                        <i class="fa-solid fa-check deleteBtn"></i>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db,i) =>{
        db.addEventListener("click", ()=> {deleteItems(i)} )
    } )
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i)=>{
        eb.addEventListener("click", ()=>{
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        }) 
    })  
}

function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i)=>{
        sb.addEventListener("click", ()=>{
            updateItems(inputs[i].value, i)
        })
    })
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i)=>{
        cb.addEventListener("click", ()=>{
            updateController[i].style.display = "none"
            inputs[i].disabled = true;
            inputs[i].style.border = "none"
        })
    })
}

function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function updateItems(text, i){
    itemsArray[i] = text
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function deleteItems(i){
    itemsArray.splice(i,1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

function displayDate(){
    let date = new Date();
    date = date.toString().split(" ")
    date = date[1] + " " + date[2] + " " + date[3] 
    document.querySelector("#date").innerHTML = date;
}

window.onload = function(){
    displayDate();
    displayItems();
}