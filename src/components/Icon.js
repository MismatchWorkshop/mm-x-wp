import { COLOR_SYSTEM, getAutoTextColor } from '../color-system';

/**
 * Icon Component
 * Renders an icon with consistent styling across the theme
 * Supports inline SVG or image sources
 */

const Icon = ({ 
    type = 'image', // 'image' or 'svg'
    src = '', // Image URL for type='image'
    svg = '', // SVG markup for type='svg'
    alt = '',
    size = 64,
    backgroundColor = 'payday-blue', // Use color slug from COLOR_SYSTEM.backgrounds
    iconColor = '', // Auto-calculated if not provided
    borderRadius = '16px',
    className = ''
}) => {
    // Get actual color value from backgrounds
    const bgConfig = COLOR_SYSTEM.backgrounds[backgroundColor];
    const bgColor = bgConfig ? bgConfig.value : COLOR_SYSTEM.backgrounds['payday-blue'].value;
    
    // Auto-calculate icon color if not provided
    const calculatedIconColor = iconColor || getAutoTextColor(backgroundColor);

    const iconStyle = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: calculatedIconColor, // For SVG currentColor
    };

    if (type === 'svg' && svg) {
        // For inline SVG (like your lightning bolt icon)
        return (
            <div 
                className={`wp-block-icon ${className}`}
                style={iconStyle}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        );
    }

    // For image-based icons
    return (
        <div 
            className={`wp-block-icon ${className}`}
            style={iconStyle}
        >
            <img 
                src={src} 
                alt={alt}
                style={{ 
                    width: '60%', 
                    height: '60%',
                    objectFit: 'contain'
                }}
            />
        </div>
    );
};

export default Icon;