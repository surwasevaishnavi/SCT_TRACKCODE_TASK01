// Array of premium, vibrant colors
const premiumColors = [
    { h: 238, s: '60%', l: '50%' }, // Indigo
    { h: 262, s: '70%', l: '60%' }, // Purple
    { h: 316, s: '70%', l: '50%' }, // Pink
    { h: 199, s: '89%', l: '48%' }, // Blue
    { h: 160, s: '84%', l: '39%' }, // Teal
    { h: 14,  s: '80%', l: '55%' }, // Orange
    { h: 340, s: '82%', l: '52%' }  // Rose
];

let lastColorIndex = -1;

function updateNavbarColor() {
    let newIndex;
    // Ensure we pick a DIFFERENT color than the current one
    do {
        newIndex = Math.floor(Math.random() * premiumColors.length);
    } while (newIndex === lastColorIndex);
    
    lastColorIndex = newIndex;
    const color = premiumColors[newIndex];
    
    document.documentElement.style.setProperty('--dynamic-h', color.h);
    document.documentElement.style.setProperty('--dynamic-s', color.s);
    document.documentElement.style.setProperty('--dynamic-l', color.l);
}

// 1. REFRESH: New color on load
window.addEventListener('load', updateNavbarColor);

// 2. SCROLL: Change color when crossing 50px threshold
let isScrolled = false;
let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                if (!isScrolled) {
                    updateNavbarColor();
                    isScrolled = true;
                }
                navbar.classList.add('scrolled');
            } else {
                if (isScrolled) {
                    updateNavbarColor();
                    isScrolled = false;
                }
                navbar.classList.remove('scrolled');
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// 3. CLICK: Change color on button click
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Initial active state detection
    if (linkPath === currentPath) {
        link.classList.add('active');
    }

    link.addEventListener('click', (e) => {
        updateNavbarColor();
        // Feedback animation
        link.style.transform = 'scale(0.9)';
        setTimeout(() => link.style.transform = 'scale(1)', 150);
        
        // Handle active class for hash links or during navigation
        if (linkPath === '#') {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});
