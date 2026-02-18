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
document.querySelectorAll(".section img").forEach(img => {
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

/* ================= INTRO ANIMATION ================= */

const introLoader = document.getElementById("introLoader");
const introText = document.getElementById("introText");
const finalText = "KENT";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";
let revealIndex = 0;

function hackerReveal() {

    let iterations = 0;

    const interval = setInterval(() => {

        introText.textContent = finalText
            .split("")
            .map((letter, index) => {

                if (index < revealIndex) {
                    return finalText[index];
                }

                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        iterations++;

        if (iterations > 10) {
            revealIndex++;
            iterations = 0;
        }

        if (revealIndex >= finalText.length) {
            introText.textContent = finalText;
            clearInterval(interval);

            setTimeout(() => {
                startBreakExit();   // NEW EXIT EFFECT
            }, 400);
         }
    }, 60);
}

function createMatrix(box){
    setInterval(()=>{
        let text="";
        for(let i=0;i<60;i++){
            text += Math.random()>0.5 ? "1":"0";
            if(i%10===0) text+="<br>";
        }
        box.innerHTML=text;
    },80);
}

// start intro after page loads
window.addEventListener("load", () => {
    setTimeout(hackerReveal, 600);
});

const breakGrid = document.getElementById("breakGrid");

function startBreakExit(){

    const cols = 8;
    const rows = 6;
    const total = cols * rows;

    // create boxes
    for(let i=0;i<total;i++){
        const box = document.createElement("div");
        box.classList.add("break-box");
        breakGrid.appendChild(box);
    }

    const boxes = document.querySelectorAll(".break-box");

    // random order
    const shuffled = [...boxes].sort(()=>Math.random()-0.5);

    shuffled.forEach((box,index)=>{

        // appear one by one
        setTimeout(()=>{
            box.classList.add("break-show");

            // destroy after appear
            setTimeout(()=>{
                createMatrix(box);
                box.classList.add("break-destroy");
            },120);

        }, index * 35); // speed of destruction
    });

    // remove intro after all broken
    setTimeout(()=>{
        introLoader.style.display="none";
        document.body.classList.add("page-reveal");
    }, total * 35 + 800);
}

/* ===== IMAGE SLIDER ===== */
const slides = document.querySelectorAll(".slide-img");
const dots = document.querySelectorAll(".dot");
const slider = document.getElementById("imageSlider");

let currentSlide = 0;

function updateSlider(){
    slides.forEach((img,i)=>{
        img.classList.toggle("active", i===currentSlide);
    });

    dots.forEach((d,i)=>{
        d.classList.toggle("active", i===currentSlide);
    });

    const offset = (currentSlide * 245);
    slider.style.transform = `translateX(${-offset}px)`;
}

document.getElementById("slideRight").onclick=()=>{
    currentSlide=(currentSlide+1)%slides.length;
    updateSlider();
};

document.getElementById("slideLeft").onclick=()=>{
    currentSlide=(currentSlide-1+slides.length)%slides.length;
    updateSlider();
};

/* scroll wheel control */
slider.addEventListener("wheel",(e)=>{
    e.preventDefault();
    if(e.deltaY>0){
        currentSlide=(currentSlide+1)%slides.length;
    }else{
        currentSlide=(currentSlide-1+slides.length)%slides.length;
    }
    updateSlider();
});

/* open modal when clicked */
slides.forEach(img=>{
    img.addEventListener("click",()=>{
        modal.classList.add("active");
        modalImg.src = img.src;
    });
});
