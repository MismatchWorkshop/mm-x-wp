let lastScrollY = window.scrollY;
let headerOffsetTop = 0;
let menuVisibleAt = 0; // Track where the menu became visible
let ticking = false;

// Get the header's initial position after page load
window.addEventListener('load', () => {
    const header = document.querySelector('.site-header');
    headerOffsetTop = header.offsetTop;
});

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const header = document.querySelector('.site-header');
            
            // Toggle background class based on scroll position
            if (currentScrollY > 170) {
                header.classList.add('nav-background');
            } else {
                header.classList.remove('nav-background');
            }
            
            // Scrolling down - move naturally with scroll
            if (currentScrollY > lastScrollY) {
                const translateY = Math.max(-(currentScrollY - menuVisibleAt), -header.offsetHeight);
                header.style.transform = `translateY(${translateY}px)`;
                header.classList.remove('is-pinned');
            } 
            // Scrolling up - snap back to view and record position
            else if (currentScrollY < lastScrollY) {
                header.style.transform = 'translateY(0)';
                header.classList.add('is-pinned');
                menuVisibleAt = currentScrollY; // Reset the baseline for natural scrolling
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
});