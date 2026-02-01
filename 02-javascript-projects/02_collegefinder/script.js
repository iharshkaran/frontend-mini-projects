const url = "http://universities.hipolabs.com/search?country=india&name=";
let btn = document.querySelector("button");
let inp = document.querySelector("input");
let list = document.querySelector("#list");

let state = "";

async function getColleges(state) {
    let res = await axios.get(url + state);
    return res.data;
}

btn.addEventListener("click", async () => {
    let state = inp.value;
    let collegesData = await getColleges(state);
    show(collegesData);
})

function show(collegesData) {
    list.innerHTML = "";
    for (data of collegesData) {
        let li = document.createElement("li");
        li.textContent = data.name;
        list.appendChild(li);
    }
}





// let country = "";

// btn.addEventListener("click" , async() =>{
//     country = inp.value;
//     let collegesData = await getColleges(country);
//     show(collegesData);
// });

// function show(collegesData){
//     list.innerHTML = "";
//     for(col of collegesData){
//         let li = document.createElement("li");
//         li.textContent = col.name;
//         list.append(li);
//     }
// };

// // function show(collegesData){
// //     list.innerHTML = "";
// //     for(col of collegesData){
// //         list.innerHTML += `<li>${col.name}</li>`
// //     }
// // };



// async function getColleges(country){
//     try {
//         let res = await axios.get(url + country);
//         return res.data;
//     } catch (error) {
//         console.log("ERROR Damn...",error);
//     }
// }




// // ------------------------------
// // STATE → KEYWORDS MAPPING
// // ------------------------------
// const STATE_KEYWORDS = {
//     delhi: ["Delhi", "New Delhi", "Jamia", "JNU", "DTU", "NSUT"],

//     maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad" , "bombay"],

//     karnataka: ["Bangalore", "Bengaluru", "Mysuru", "IISc"]
// };

// // ------------------------------
// // DOM ELEMENTS
// // ------------------------------
// const url = "http://universities.hipolabs.com/search?country=india";
// const btn = document.querySelector("button");
// const inp = document.querySelector("input");
// const list = document.querySelector("#list");

// // ------------------------------
// // FETCH ALL COLLEGES (ONCE)
// // ------------------------------
// async function getAllColleges() {
//     const res = await axios.get(url);
//     return res.data;
// }

// // ------------------------------
// // FILTER BY STATE KEYWORDS
// // ------------------------------
// function filterByState(colleges, state) {
//     const keywords = STATE_KEYWORDS[state] || [];

//     // agar state mapping nahi mili
//     if (keywords.length === 0) {
//         return colleges.filter(college =>
//             college.name.toLowerCase().includes(state)
//         );
//     }

//     return colleges.filter(college =>
//         keywords.some(keyword =>
//             college.name.toLowerCase().includes(keyword.toLowerCase())
//         )
//     );
// }

// // ------------------------------
// // SHOW RESULT
// // ------------------------------
// function show(collegesData) {
//     list.innerHTML = "";

//     if (collegesData.length === 0) {
//         list.innerHTML = "<li>No colleges found</li>";
//         return;
//     }

//     for (let data of collegesData) {
//         let li = document.createElement("li");
//         li.textContent = data.name;
//         list.appendChild(li);
//     }
// }

// // ------------------------------
// // BUTTON CLICK EVENT
// // ------------------------------
// btn.addEventListener("click", async () => {
//     const state = inp.value.trim().toLowerCase();

//     if (!state) {
//         alert("Please enter a state name");
//         return;
//     }

//     const allColleges = await getAllColleges();
//     const filtered = filterByState(allColleges, state);

//     show(filtered);
// });
