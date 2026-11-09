// ==============================
// SENTINEL SECURITY V5
// ==============================

// EmailJS Initialization
(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// ==============================
// Smooth Active Navigation
// ==============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==============================
// Reveal Animation
// ==============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(sec => {

    sec.style.opacity = "0";

    sec.style.transform = "translateY(60px)";

    sec.style.transition = "all .8s ease";

    observer.observe(sec);

});

// ==============================
// Animated Counter
// ==============================

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter => {

    const text = counter.innerText;

    const number = parseInt(text);

    if (isNaN(number)) return;

    let count = 0;

    const update = () => {

        count += Math.ceil(number / 50);

        if (count >= number) {

            counter.innerText = text;

            return;

        }

        counter.innerText = count + (text.includes("%") ? "%" : text.includes("+") ? "+" : "");

        requestAnimationFrame(update);

    };

    update();

});
// ==============================
// CONTACT FORM (EmailJS)
// ==============================

const form = document.getElementById("contact-form");

if (form) {

form.addEventListener("submit", function(e){

e.preventDefault();

const params = {

name:document.getElementById("name").value,

email:document.getElementById("email").value,

subject:document.getElementById("subject").value,

message:document.getElementById("message").value

};

emailjs.send(

"YOUR_SERVICE_ID",

"YOUR_TEMPLATE_ID",

params

)

.then(function(){

alert("✅ Message sent successfully!");

form.reset();

})

.catch(function(error){

console.error(error);

alert("❌ Failed to send message.");

});

});

}

// ==============================
// NAVBAR EFFECT
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.style.background="rgba(5,8,13,.95)";

header.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

}else{

header.style.background="rgba(5,8,13,.72)";

header.style.boxShadow="none";

}

});

// ==============================
// HERO IMAGE FLOAT
// ==============================

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

let angle=0;

setInterval(()=>{

angle+=0.02;

heroImage.style.transform=`translateY(${Math.sin(angle)*10}px)`;

},30);

}

// ==============================
// CURRENT YEAR
// ==============================

const yearElement=document.getElementById("year");

if(yearElement){

yearElement.textContent=new Date().getFullYear();

}

console.log("Sentinel Security V5 Loaded Successfully");
