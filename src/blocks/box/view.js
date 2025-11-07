// Box block frontend functionality
document.addEventListener('DOMContentLoaded', function() {
    const fillBoxes = document.querySelectorAll('.box.is-style-fill');
    
    fillBoxes.forEach(box => {
        // Get the border color class
        const classes = Array.from(box.classList);
        const borderClass = classes.find(c => c.startsWith('border-'));
        
        if (borderClass) {
            // The fill color is set via CSS variable --box-fill-color
            // which is already handled in the inline style from save.js
            // This script is just a placeholder for any future interactivity
        }
    });
});
