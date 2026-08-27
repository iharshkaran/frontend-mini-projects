let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let newFact = document.querySelector("#newFact");
let digImg = document.querySelector("#dogImg");
const url = "https://catfact.ninja/fact";
const url2 = "https://dog.ceo/api/breeds/image/random";

async function getFacts() {
    try {
    let data = await axios(url);
    return data.data.fact;
}
catch(e){
    console.log("error");
}}

button1.addEventListener("click",async ()=>{
    fact = getFacts();
    newFact.textContent = await fact;
    
}) 


async function getDogImage() {
    let res2 = await axios.get(url2);
    let data = res2.data;
    return data.message;
}

button2.addEventListener("click",async ()=>{
    fact = getDogImage();
    dogImg.innerHTML = `<img style="height: 400px ; border-radius: 10px; margin-top : 10px " src = "${await fact}" >`
    // we can also use img.setAttributes(src,link);
    
})




// const url3 = "https://icanhazdadjoke.com/";

// async function getJoke() {
//     let config = {headers : { Accept : "text/plain"}}
//     let res = await axios.get(url3,config);
//     console.log(res.data);
// }

