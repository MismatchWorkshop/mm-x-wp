// Wait for fonts AND DOM to be ready
async function initMarquees() {
    console.log('🎬 Marquee script starting...');
    
    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
        console.log('✅ Fonts loaded');
    }
    
    // Wait for next paint to ensure layout is updated
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    const marquees = document.querySelectorAll('.wp-block-wagepoint-marquee');
    console.log('📍 Found marquees:', marquees.length);
    
    marquees.forEach((marquee, index) => {
        console.log(`\n🎯 Processing marquee #${index + 1}`);
        
        const track = marquee.querySelector('.wagepoint-marquee-track');
        const content = marquee.querySelector('.wagepoint-marquee-content');
        
        if (!track || !content) {
            console.error('❌ Missing track or content');
            return;
        }
        
        // Get direction from parent element
        const isRightDirection = marquee.classList.contains('marquee-direction-right');
        
        // Use getBoundingClientRect for PRECISE sub-pixel measurements
        const contentRect = content.getBoundingClientRect();
        const contentWidth = contentRect.width;
        const viewportWidth = marquee.getBoundingClientRect().width;
        
        console.log('📏 Precise measurements (after fonts):', {
            contentWidth: contentWidth + 'px',
            viewportWidth: viewportWidth + 'px',
            direction: isRightDirection ? 'right' : 'left'
        });
        
        // Calculate how many copies we need
        const copiesNeeded = Math.ceil((viewportWidth * 2) / contentWidth) + 1;
        console.log('📋 Copies needed:', copiesNeeded);
        
        // Create copies
        for (let i = 0; i < copiesNeeded; i++) {
            const clone = content.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        }
        
        console.log('✅ Clones created:', track.children.length, 'total items in track');
        
        // Force track styles
        track.style.display = 'flex';
        track.style.width = 'fit-content';
        track.style.willChange = 'transform';
        track.style.transform = 'translateZ(0)';
        track.style.backfaceVisibility = 'hidden';
        
        // Force layout calculation
        void track.offsetWidth;
        
        // Wait a frame for clones to render
        requestAnimationFrame(() => {
            // Measure the ACTUAL distance between first and second content after cloning
            const allContents = track.querySelectorAll('.wagepoint-marquee-content');
            const firstContentRect = allContents[0].getBoundingClientRect();
            const secondContentRect = allContents[1].getBoundingClientRect();
            
            // The animation distance is the distance between the start of first and second content
            const animationDistance = secondContentRect.left - firstContentRect.left;
            
            console.log('📐 Animation distance calculated:', {
                animationDistance: animationDistance + 'px'
            });
            
            // Create unique animation
            const animationName = `marquee-${Math.random().toString(36).substr(2, 9)}`;
            console.log('🎭 Animation name:', animationName);
            
            // Direction: left = move to left (negative), right = move to right (positive)
            const startPos = isRightDirection ? `-${animationDistance}px` : '0';
            const endPos = isRightDirection ? '0' : `-${animationDistance}px`;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes ${animationName} {
                    from { transform: translateX(${startPos}); }
                    to { transform: translateX(${endPos}); }
                }
            `;
            document.head.appendChild(styleSheet);
            
            // Calculate duration for consistent speed
            const pixelsPerSecond = 150;
            const duration = animationDistance / pixelsPerSecond;
            
            console.log('⏱️ Animation settings:', {
                duration: duration.toFixed(2) + 's',
                speed: pixelsPerSecond + 'px/s',
                startPos: startPos,
                endPos: endPos
            });
            
            // Apply animation
            track.style.removeProperty('animation');
            void track.offsetWidth;
            track.style.setProperty('animation', `${animationName} ${duration}s linear infinite`, 'important');
            
            console.log('✨ Final animation applied');
            console.log('---');
        });
    });
    
    console.log('🏁 Marquee script complete\n');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarquees);
} else {
    initMarquees();
}