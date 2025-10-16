/**
 * Frontend JavaScript for Logos Block
 * Handles carousel animation speed and pause on hover
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.logos-carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.logos-carousel-track');
        const speed = carousel.getAttribute('data-speed') || 30;
        const pauseOnHover = carousel.getAttribute('data-pause') === 'true';
        
        // Set animation duration
        track.style.animationDuration = `${speed}s`;
        
        // Handle pause on hover
        if (pauseOnHover) {
            carousel.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            carousel.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        }
    });
});