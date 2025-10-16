// Define your color system
export const COLOR_SYSTEM = {
    backgrounds: {
        'transparent': {
            value: 'transparent',
            label: 'Transparent',
            autoText: '#1F2937' // Dark text on transparent
        },
        'white': {
            value: '#FFFFFF',
            label: 'White',
            autoText: '#1F2937'
        },
        'light': {
            value: '#F9FAFB',
            label: 'Light Gray',
            autoText: '#1F2937'
        },
        'primary': {
            value: '#FDB022',
            label: 'Primary (Yellow)',
            autoText: '#1F2937'
        },
        'dark': {
            value: '#1F2937',
            label: 'Dark',
            autoText: '#FFFFFF'
        },
        'blue': {
            value: '#3B82F6',
            label: 'Blue',
            autoText: '#FFFFFF'
        },
        'dark-blue': {
            value: '#1e3a8a',
            label: 'Dark Blue',
            autoText: '#FFFFFF'
        },
        'gray': {
            value: '#6B7280',
            label: 'Gray',
            autoText: '#FFFFFF'
        }
    },
    textColors: {
        'auto': {
            value: 'auto',
            label: 'Auto'
        },
        'white': {
            value: '#FFFFFF',
            label: 'White'
        },
        'black': {
            value: '#1a1a1a',
            label: 'Black'
        },
        'dark': {
            value: '#1F2937',
            label: 'Dark Gray'
        },
        'blue': {
            value: '#3B82F6',
            label: 'Blue'
        },
        'primary': {
            value: '#FDB022',
            label: 'Primary (Yellow)'
        },
        'yellow': {
            value: '#fbbf24',
            label: 'Yellow'
        },
        'gray': {
            value: '#6B7280',
            label: 'Text Gray'
        }
    }
};

// Helper function to get auto text color for a background
export function getAutoTextColor(backgroundKey) {
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
    return bgConfig ? bgConfig.autoText : '#1F2937';
}