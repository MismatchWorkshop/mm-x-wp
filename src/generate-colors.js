const fs = require('fs');
const path = require('path');

// Read colors.json
const colorsPath = path.join(__dirname, 'colors.json');
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

// Generate SCSS content
let scssContent = `// THIS FILE IS AUTO-GENERATED FROM colors.json
// DO NOT EDIT MANUALLY - Run 'npm run generate:colors' instead

$colors: (
`;

Object.entries(colors).forEach(([key, data]) => {
    scssContent += `    '${key}': ${data.value},\n`;
});

scssContent += `);\n\n`;

// Generate CSS custom properties
scssContent += `:root {
    @each $name, $value in $colors {
        --color-#{$name}: #{$value};
    }
}\n\n`;

// Add utility class generators using CSS custom properties
scssContent += `// Auto-generate utility classes
@each $name, $value in $colors {
    .bg-#{$name} {
        background-color: var(--color-#{$name}, $value);
    }
    .text-#{$name} {
        color: var(--color-#{$name}, $value);
    }
    .border-#{$name} {
        border-color: var(--color-#{$name}, $value);
    }
}
`;

// Write to _color-utilities.scss
const outputPath = path.join(__dirname, '_color-utilities.scss');
fs.writeFileSync(outputPath, scssContent);

console.log('✅ Generated _color-utilities.scss from colors.json');