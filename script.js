const hamburger = document.getElementById("hamburger");
const sidePanel = document.getElementById("sidePanel");
const overlay = document.getElementById("overlay");
const backToTop = document.getElementById("backToTop");

// Open panel
hamburger.addEventListener("click", () => {
    sidePanel.style.right = "0";
    overlay.style.display = "block";
});

// Close panel when clicking overlay
overlay.addEventListener("click", () => {
    sidePanel.style.right = "-250px";
    overlay.style.display = "none";
});

// Close panel when clicking menu link
document.querySelectorAll(".side-panel a").forEach(link => {
    link.addEventListener("click", () => {
        sidePanel.style.right = "-250px";
        overlay.style.display = "none";
    });
});

// Back to top show/hide
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Back to top click
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const marqueeTrack = document.getElementById("marqueeTrack");

// Duplicate content until it fills screen
function fillMarquee() {
    const baseText = "Develop • Design • Deploy • ";
    marqueeTrack.innerHTML = baseText;

    while (marqueeTrack.offsetWidth < window.innerWidth * 2) {
        marqueeTrack.innerHTML += baseText;
    }
}

fillMarquee();
window.addEventListener("resize", fillMarquee);

document.addEventListener("DOMContentLoaded", function() {
    
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

// Open modal
document.querySelectorAll(".section img, .cover-item").forEach(img => {
    img.addEventListener("click", function() {
        modal.classList.add("active");
        modalImg.src = this.src;
        document.body.style.overflow = "hidden"; // Disable scroll
    });
});

// Close function
function closeImageModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Enable scroll
}

// Close when clicking X
closeModal.addEventListener("click", closeImageModal);

// Close when clicking outside image
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeImageModal();
    }
});

// ESC key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeImageModal();
    }
});

});

/* ================= START AFTER PAGE LOAD ================= */
window.addEventListener("load", () => {

const introLoader = document.getElementById("introLoader");
const introText = document.getElementById("introText");

/* ===== MATRIX RANDOM 0/1 ===== */
function createMatrixBits(){

    setInterval(()=>{

        const bit = document.createElement("span");
        bit.textContent = Math.random() > 0.5 ? "1" : "0";

        bit.style.position="absolute";
        bit.style.left=Math.random()*100+"%";
        bit.style.top=Math.random()*100+"%";
        bit.style.color="#00f7ff";
        bit.style.fontFamily="monospace";
        bit.style.fontSize=(10+Math.random()*18)+"px";
        bit.style.opacity=Math.random();
        bit.style.pointerEvents="none";
        bit.style.transition="opacity 1s linear";

        introLoader.appendChild(bit);

        setTimeout(()=> bit.style.opacity="0",700);
        setTimeout(()=> bit.remove(),1700);

    },80);
}

/* ===== HACKER TEXT ===== */
const finalText="KENT";
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";
let revealIndex=0;

function hackerReveal(){

    let iterations=0;

    const interval=setInterval(()=>{

        introText.textContent=finalText
        .split("")
        .map((letter,index)=>{
            if(index<revealIndex) return finalText[index];
            return chars[Math.floor(Math.random()*chars.length)];
        }).join("");

        iterations++;

        if(iterations>10){
            revealIndex++;
            iterations=0;
        }

        if(revealIndex>=finalText.length){
            clearInterval(interval);
            introText.textContent=finalText;
            setTimeout(closeIntro,500);
        }

    },60);
}

/* ===== CLOSE INTRO ===== */
function closeIntro(){
    introLoader.style.transition="1.5s ease";
    introLoader.style.filter="blur(25px)";
    introLoader.style.opacity="0";

    setTimeout(()=>{
        introLoader.style.display="none";
        document.body.classList.add("page-reveal");
    },1500);
}

/* START EFFECTS */
createMatrixBits();
setTimeout(hackerReveal,600);


/* ===== 3D COVERFLOW ===== */
const coverItems=document.querySelectorAll(".cover-item");
let coverIndex=0;

function updateCoverflow(){
    coverItems.forEach(item=>item.className="cover-item");

    const total=coverItems.length;

    coverItems[coverIndex].classList.add("active");
    coverItems[(coverIndex-1+total)%total].classList.add("left1");
    coverItems[(coverIndex-2+total)%total].classList.add("left2");
    coverItems[(coverIndex+1)%total].classList.add("right1");
    coverItems[(coverIndex+2)%total].classList.add("right2");
}
updateCoverflow();

/* wheel rotate */
const coverflow=document.getElementById("coverflow");
if(coverflow){
coverflow.addEventListener("wheel",(e)=>{
    e.preventDefault();

    if(e.deltaY>0){
        coverIndex=(coverIndex+1)%coverItems.length;
    }else{
        coverIndex=(coverIndex-1+coverItems.length)%coverItems.length;
    }

    updateCoverflow();
},{passive:false});
}

});
