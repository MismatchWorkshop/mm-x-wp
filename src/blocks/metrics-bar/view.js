document.addEventListener('DOMContentLoaded', function() {
    function updateMetricsLine() {
        console.log("!!! Updating metrics line");
        const metricsBars = document.querySelectorAll('.metrics-bar-block');
        
        metricsBars.forEach(metricsBar => {
            const svg = metricsBar.querySelector('[data-dynamic-line]');
            const path = svg?.querySelector('.metrics-line-path');
            
            if (!svg || !path) return;
            
            const container = metricsBar.closest('.wp-block-wagepoint-container');
            if (!container) return;
            
            const splitSection = container.querySelector('.wp-block-wagepoint-split-section');
            if (!splitSection) {
                // No split section, just draw horizontal line
                const metricsRect = metricsBar.getBoundingClientRect();
                path.setAttribute('d', `M 0 28 L ${metricsRect.width} 28`);
                return;
            }
            
            const splitRect = splitSection.getBoundingClientRect();
            const metricsRect = metricsBar.getBoundingClientRect();
            
            // Calculate relative positions
            const startX = splitRect.right - metricsRect.left;
            const startY = splitRect.bottom - metricsRect.top;
            const endY = 28; // Center of 56px icon
            const cornerRadius = 60;
            
            // Ensure we have space for the curve
            if (startY - endY < cornerRadius) {
                // Not enough vertical space for curve, just do horizontal
                path.setAttribute('d', `M 0 ${endY} L ${metricsRect.width} ${endY}`);
                return;
            }
            
            // SVG path: Vertical down, curved corner, horizontal across
            const pathData = `M ${startX} ${startY} L ${startX} ${endY + cornerRadius} Q ${startX} ${endY} ${startX - cornerRadius} ${endY} L 0 ${endY}`;
            
            path.setAttribute('d', pathData);
        });
    }
    
    // Initial calculation
    updateMetricsLine();
    
    // Recalculate on resize
    window.addEventListener('resize', updateMetricsLine);
    
    // Recalculate when images load (can change layout)
    window.addEventListener('load', updateMetricsLine);
});