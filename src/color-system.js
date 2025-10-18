import colorsData from './colors.json';

// Build the COLOR_SYSTEM from colors.json
const backgrounds = {};
const textColors = {
    'auto': {
        value: 'auto',
        label: 'Auto'
    }
};

// Convert JSON structure to COLOR_SYSTEM.backgrounds
Object.entries(colorsData).forEach(([key, data]) => {
    backgrounds[key] = {
        value: data.value,
        label: data.label,
        autoText: data.autoText,
        groups: data.groups || []
    };
    
    // Also add to textColors (except transparent)
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

// Helper function to get auto text color for a background
export function getAutoTextColor(backgroundKey) {
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
    return bgConfig ? bgConfig.autoText : '#1E293B';
}

// Helper function to get colors by group
export function getColorsByGroup(group) {
    return Object.entries(COLOR_SYSTEM.backgrounds)
        .filter(([key, data]) => data.groups.includes(group))
        .reduce((acc, [key, data]) => {
            acc[key] = data;
            return acc;
        }, {});
}