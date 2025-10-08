// Define your color system
export const COLOR_SYSTEM = {
    backgrounds: {
        'transparent': {
            value: 'transparent',
            label: 'Transparent',
            autoText: '#1a1a1a' // Dark text on transparent
        },
        'white': {
            value: '#ffffff',
            label: 'White',
            autoText: '#1a1a1a'
        },
        'blue': {
            value: '#3b82f6',
            label: 'Blue',
            autoText: '#ffffff'
        },
        'dark-blue': {
            value: '#1e3a8a',
            label: 'Dark Blue',
            autoText: '#ffffff'
        },
        'gray': {
            value: '#6b7280',
            label: 'Gray',
            autoText: '#ffffff'
        }
    },
    textColors: {
        'auto': {
            value: 'auto',
            label: 'Auto'
        },
        'white': {
            value: '#ffffff',
            label: 'White'
        },
        'black': {
            value: '#1a1a1a',
            label: 'Black'
        },
        'blue': {
            value: '#3b82f6',
            label: 'Blue'
        },
        'yellow': {
            value: '#fbbf24',
            label: 'Yellow'
        }
    }
};

// Helper function to get auto text color for a background
export function getAutoTextColor(backgroundKey) {
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
    return bgConfig ? bgConfig.autoText : '#1a1a1a';
}