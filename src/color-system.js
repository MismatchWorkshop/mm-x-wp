import colorsData from './colors.json';

// Build the COLOR_SYSTEM from colors.json
const backgrounds = {};
const textColors = {
    'auto': {
        value: 'auto',
        label: 'Auto'
    }
};

Object.entries(colorsData).forEach(([key, data]) => {
    backgrounds[key] = {
        value: data.value,
        label: data.label,
        autoText: data.autoText,
        groups: data.groups || [],
        contextPalette: data.contextPalette || {}
    };
    
    // Add to textColors (except transparent)
    if (key !== 'transparent') {
        textColors[key] = {
            value: data.value,
            label: data.label
        };
    }
});

export const COLOR_SYSTEM = {
    backgrounds,
    textColors
};

// Helper: Get auto text color for a background
export function getAutoTextColor(backgroundKey) {
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
    return bgConfig ? bgConfig.autoText : '#1E293B';
}

// Helper: Get contextual color for a specific role
export function getContextualColor(containerBackground, role = 'iconDefault') {
    const bgConfig = COLOR_SYSTEM.backgrounds[containerBackground];
    
    if (!bgConfig || !bgConfig.contextPalette || !bgConfig.contextPalette[role]) {
        // Fallback defaults based on role
        const fallbacks = {
            'iconDefault': 'payday-blue',
            'iconHighlight': 'pto-yellow',
            'buttonPrimary': 'payday-blue',
            'buttonSecondary': 'ledger-blue'
        };
        return fallbacks[role] || 'payday-blue';
    }
    
    return bgConfig.contextPalette[role];
}

// Helper: Get the actual color value for a contextual role
export function getContextualColorValue(containerBackground, role = 'iconDefault') {
    const colorKey = getContextualColor(containerBackground, role);
    const colorConfig = COLOR_SYSTEM.backgrounds[colorKey];
    return colorConfig?.value || '#4A90E2';
}

// Helper: Get colors by group
export function getColorsByGroup(group) {
    return Object.entries(COLOR_SYSTEM.backgrounds)
        .filter(([key, data]) => data.groups.includes(group))
        .reduce((acc, [key, data]) => {
            acc[key] = data;
            return acc;
        }, {});
}

// Helper: Check if background is dark (for text color calc)
export function isDarkBackground(backgroundKey) {
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
    if (!bgConfig) return false;
    return bgConfig.autoText === '#FFFFFF';
}