document.addEventListener('DOMContentLoaded', () => {
    
    // Nav Toggle
    const navTrigger = document.querySelector('.nav-trigger');
    const navShade = document.querySelector('nav.main');

    if (typeof(navTrigger) != 'undefined' && navTrigger != null) {
        navTrigger.addEventListener('click', (e) => {
            if (navTrigger.classList.contains('active')) {
                navTrigger.innerHTML = "Menu"
                navTrigger.classList.remove('active');;
                navShade.classList.remove('visible');
            } else {
                navTrigger.innerHTML = "Close";
                navTrigger.classList.add('active');
                navShade.classList.add('visible');
            }
        });
    }

    // Nav Items
    const navLinks = document.querySelectorAll('nav.main li:not(.cta) a');

    if (typeof(navLinks) != 'undefined' && navLinks != null) {

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                let current = document.querySelector('nav.main .current');
                if (typeof(current) != 'undefined' && current != null) {
                    current.classList.remove('current');
                }
                link.classList.add('current');
            });
        });
    }

    const rellax = new Rellax('.rellax');

});

window.addEventListener('load', () => {
    
    const heroLines = document.querySelectorAll('.hero h1 span');
    heroLines.forEach((line) => {
        line.classList.add('loaded');
    });
    
});