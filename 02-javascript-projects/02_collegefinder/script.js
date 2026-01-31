const url = "http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");
let inp = document.querySelector("input");
let list = document.querySelector("#list");

let country = "";

btn.addEventListener("click" , async() =>{
    country = inp.value;
    let collegesData = await getColleges(country);
    show(collegesData);
});

function show(collegesData){
    list.innerHTML = "";
    for(col of collegesData){
        let li = document.createElement("li");
        li.textContent = col.name;
        list.append(li); 
    }
};

// function show(collegesData){
//     list.innerHTML = "";
//     for(col of collegesData){
//         list.innerHTML += `<li>${col.name}</li>`
//     }
// };



async function getColleges(country){
    try {
        let res = await axios.get(url + country);
        return res.data;
    } catch (error) {
        console.log("ERROR Damn...",error);
    }
}