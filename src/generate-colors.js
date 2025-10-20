const fs = require('fs');
const path = require('path');

// Read colors.json
const colorsData = require('./colors.json');

// Generate color utility classes
let scssContent = '// Auto-generated color utilities from colors.json\n\n';
scssContent += ':root {\n';

Object.entries(colorsData).forEach(([key, data]) => {
    scssContent += `  --color-${key}: ${data.value};\n`;
});

scssContent += '}\n\n';

// Background classes
Object.entries(colorsData).forEach(([key, data]) => {
    scssContent += `.bg-${key} {\n`;
    scssContent += `  background-color: var(--color-${key}, ${data.value});\n`;
    scssContent += `}\n\n`;
});

// Text classes
Object.entries(colorsData).forEach(([key, data]) => {
    if (key !== 'transparent') {
        scssContent += `.text-${key} {\n`;
        scssContent += `  color: var(--color-${key}, ${data.value});\n`;
        scssContent += `}\n\n`;
    }
});

// Border classes
Object.entries(colorsData).forEach(([key, data]) => {
    if (key !== 'transparent') {
        scssContent += `.border-${key} {\n`;
        scssContent += `  border-color: var(--color-${key}, ${data.value});\n`;
        scssContent += `}\n\n`;
    }
});

// CONTEXTUAL AUTO COLORS
scssContent += '// Contextual auto colors for container backgrounds\n';
scssContent += '// These define what "auto" means for child elements\n\n';

Object.entries(colorsData).forEach(([bgKey, bgData]) => {
    if (bgData.contextPalette) {
        scssContent += `.container__inner.bg-${bgKey} {\n`;
        
        // Icon highlight (for metrics, icons, etc)
        if (bgData.contextPalette.iconHighlight) {
            const highlightColor = bgData.contextPalette.iconHighlight;
            const highlightValue = colorsData[highlightColor]?.value || '#F9B234';
            scssContent += `  --auto-icon-bg: var(--color-${highlightColor}, ${highlightValue});\n`;
        }
        
        // Button primary
        if (bgData.contextPalette.buttonPrimary) {
            const buttonColor = bgData.contextPalette.buttonPrimary;
            const buttonValue = colorsData[buttonColor]?.value || '#4A90E2';
            scssContent += `  --auto-button-bg: var(--color-${buttonColor}, ${buttonValue});\n`;
        }
        
        // Button secondary (if needed later)
        if (bgData.contextPalette.buttonSecondary) {
            const secondaryColor = bgData.contextPalette.buttonSecondary;
            const secondaryValue = colorsData[secondaryColor]?.value || '#1E293B';
            scssContent += `  --auto-button-secondary-bg: var(--color-${secondaryColor}, ${secondaryValue});\n`;
        }
        
        // Icon default (if needed later)
        if (bgData.contextPalette.iconDefault) {
            const defaultColor = bgData.contextPalette.iconDefault;
            const defaultValue = colorsData[defaultColor]?.value || '#4A90E2';
            scssContent += `  --auto-icon-default-bg: var(--color-${defaultColor}, ${defaultValue});\n`;
        }
        
        scssContent += `}\n\n`;
    }
});

// Write the single utilities file
fs.writeFileSync(
    path.join(__dirname, '_color-utilities.scss'),
    scssContent
);

console.log('✅ Generated _color-utilities.scss from colors.json');