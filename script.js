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
    const text = marqueeTrack.innerHTML;
    while (marqueeTrack.offsetWidth < window.innerWidth * 2) {
        marqueeTrack.innerHTML += " " + text;
    }
}

fillMarquee();
window.addEventListener("resize", fillMarquee);
