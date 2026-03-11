const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask(){
    if(inputBox.value === ""){
        alert("You must write Something!");
    }
    else{
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        // for delete buttton
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputBox.value ="";
    saveData();
}

listContainer.addEventListener("click",function(dets){
    if(dets.target.tagName === "LI"){
        dets.target.classList.toggle("checked"); //checked and unchecked
    }
    else if(dets.target.tagName === "SPAN"){
        dets.target.parentElement.remove(); //remove tasks
        saveData();
    }
},false);

function saveData(){  //data store
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

