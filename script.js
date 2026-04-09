/* =============================================
   TALHA NAEEM — PORTFOLIO SCRIPT
   ============================================= */

// ===== AOS (Animate on Scroll) =====
AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
});

// ===== NAVBAR — scroll behaviour =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== TYPED TEXT EFFECT =====
const roles = [
    'Computer Science Graduate',
    'Administrative Professional',
    'Backend Developer',
    'Team Leader',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typedText');

function typeEffect() {
    const current = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === current.length) {
        speed = 2200;           // pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        speed = 450;
    }

    setTimeout(typeEffect, speed);
}

// Start after hero animations settle
setTimeout(typeEffect, 1200);

// ===== PROFILE IMAGE FALLBACK =====
// If the photo hasn't been added yet, show the "TN" initials placeholder
const profileImg      = document.getElementById('profileImg');
const profileFallback = document.getElementById('profileFallback');

if (profileImg) {
    profileImg.addEventListener('error', () => {
        profileImg.style.display      = 'none';
        profileFallback.style.display = 'flex';
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections     = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinkItems.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = '#fff';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL PROGRESS BAR =====
// Creates a thin gradient bar at the very top showing read progress
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(135deg, #7b2ff7, #00d4ff);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});
