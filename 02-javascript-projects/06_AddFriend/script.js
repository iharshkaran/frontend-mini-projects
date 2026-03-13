var btn = document.querySelector("#add");
var Status = document.querySelector("h5");

var flag =1;
btn.addEventListener("click",function(){
    if(flag ==1){
        Status.textContent = "Friend";
        Status.style.color = "green";
        btn.innerHTML = "Remove Friend";
        btn.style.background = "#BDE038";
        flag=0;
    } else{
        Status.textContent = "Stranger";
        Status.style.color = "red";
        btn.innerHTML = "Add Friend";
        btn.style.background = "cadetblue";
        flag=1;
    }
})
