window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

const hamburger = document.getElementById("hamburger");
const sidePanel = document.getElementById("sidePanel");
const overlay = document.getElementById("overlay");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ===== ABOUT ICT DROPDOWN ===== */
const aboutToggle = document.getElementById("aboutToggle");
const aboutSub = document.getElementById("aboutSub");

if(aboutToggle && aboutSub){
    aboutToggle.addEventListener("click", () => {
        aboutSub.classList.toggle("open");
    });
}

// Open panel
hamburger.addEventListener("click", () => {
    sidePanel.classList.add("active");
    overlay.classList.add("active");
});

// Close panel when clicking overlay
overlay.addEventListener("click", () => {
    sidePanel.classList.remove("active");
    overlay.classList.remove("active");
});

// Close panel when clicking menu link
document.querySelectorAll(".side-panel a").forEach(link => {
    link.addEventListener("click", () => {
        sidePanel.classList.remove("active");
        overlay.classList.remove("active");
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

// Open modal
document.querySelectorAll("img:not(.school-logo):not(.footer-hacker-icon)").forEach(img => {
    img.addEventListener("click", function() {
        modalImg.src = this.src;
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scroll
    });
});

// Close function
function closeImageModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Enable scroll
}

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
document.body.style.overflow = "hidden";

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
        document.body.classList.add("page-reveal");
        introLoader.style.display="none";

        document.body.style.overflow = "auto"; // ⭐ ADD THIS

    },900);
}

/* START EFFECTS */
createMatrixBits();
setTimeout(hackerReveal,600);

/* ===== 3D COVERFLOW ===== */

const coverItems = document.querySelectorAll(".cover-item");
const coverflow = document.getElementById("coverflow");
const leftArrow = document.getElementById("coverLeft");
const rightArrow = document.getElementById("coverRight");

let coverIndex = 0;

function updateCoverflow() {
    const total = coverItems.length;

    coverItems.forEach(item => {
        item.className = "cover-item";
    });

    coverItems[coverIndex].classList.add("active");
    coverItems[(coverIndex - 1 + total) % total].classList.add("left1");
    coverItems[(coverIndex - 2 + total) % total].classList.add("left2");
    coverItems[(coverIndex + 1) % total].classList.add("right1");
    coverItems[(coverIndex + 2) % total].classList.add("right2");
}

updateCoverflow();

/* ✅ ARROW CLICK */
leftArrow.addEventListener("click", () => {
    coverIndex =
        (coverIndex - 1 + coverItems.length) % coverItems.length;
    updateCoverflow();
});

rightArrow.addEventListener("click", () => {
    coverIndex =
        (coverIndex + 1) % coverItems.length;
    updateCoverflow();
});

/* ✅ MOUSE WHEEL */
if (coverflow) {
    coverflow.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (e.deltaY > 0) {
            coverIndex =
                (coverIndex + 1) % coverItems.length;
        } else {
            coverIndex =
                (coverIndex - 1 + coverItems.length) %
                coverItems.length;
        }

        updateCoverflow();
    }, { passive: false });
}   

/* USING ICT FOR GOOD animation */
const goodSection = document.querySelector(".ict-good");
const goodTitle = document.querySelector(".good-left h1");
const goodText = document.querySelector(".good-right p");

window.addEventListener("scroll", ()=>{
    if(!goodSection) return;

    const rect = goodSection.getBoundingClientRect();

    if(rect.top < window.innerHeight - 100){
        goodTitle.style.opacity = "1";
        goodTitle.style.transform = "translateY(0)";
    }

    const glow = Math.min(1, (window.innerHeight - rect.top)/400);
    goodText.style.textShadow =
        `0 0 ${20*glow}px rgba(0,247,255,.8)`;
});

document.querySelectorAll(".dc-header").forEach(item=>{
    item.addEventListener("click",()=>{
        item.parentElement.classList.toggle("active");
    });
});
