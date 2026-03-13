let elem1 = document.querySelector(".elem1");
let img1 = document.querySelector(".img1");
let elem2 = document.querySelector(".elem2");
let img2 = document.querySelector(".img2");
let elem3 = document.querySelector(".elem3");
let img3 = document.querySelector(".img3");
let elem4 = document.querySelector(".elem4");
let img4 = document.querySelector(".img4");
let elem5 = document.querySelector(".elem5");
let img5 = document.querySelector(".img5");

elem1.addEventListener("mousemove",function(dets){
    img1.style.left = dets.x + "px";
});
elem1.addEventListener("mouseenter",function(){
    img1.style.opacity =1;
});
elem1.addEventListener("mouseleave",function(){
    img1.style.opacity =0;
});

elem2.addEventListener("mousemove",function(dts){
    img2.style.left = dts.x + "px";
});
elem2.addEventListener("mouseenter",function(){
    img2.style.opacity =1;
});
elem2.addEventListener("mouseleave",function(){
    img2.style.opacity =0;
});


elem3.addEventListener("mousemove",function(dets){
    img3.style.left = dets.x + "px";
});
elem3.addEventListener("mouseenter",function(){
    img3.style.opacity =1;
});
elem3.addEventListener("mouseleave",function(){
    img3.style.opacity =0;
});


elem4.addEventListener("mousemove",function(dets){
    img4.style.left = dets.x + "px";
});
elem4.addEventListener("mouseenter",function(){
    img4.style.opacity =1;
});
elem4.addEventListener("mouseleave",function(){
    img4.style.opacity =0;
});


elem5.addEventListener("mousemove",function(dets){
    img5.style.left = dets.x + "px";
});
elem5.addEventListener("mouseenter",function(){
    img5.style.opacity =1;
});
elem5.addEventListener("mouseleave",function(){
    img5.style.opacity =0;
});

