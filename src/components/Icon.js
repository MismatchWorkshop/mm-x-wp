import { COLOR_SYSTEM, getAutoTextColor, getColorsByGroup } from '../color-system';

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
    backgroundColor = '', // Empty string means no background
    iconColor = '', // Auto-calculated if not provided
    borderRadius = '16px',
    className = ''
}) => {
    // Get icon colors (since IconPicker uses icon colors, not background colors)
    const iconColors = getColorsByGroup('icon');
    
    // Get background color value from the icon color system
    const bgColor = backgroundColor && iconColors[backgroundColor]
        ? iconColors[backgroundColor].value 
        : 'transparent';
    
    // Auto-calculate icon color if not provided and background exists
    const calculatedIconColor = iconColor || (backgroundColor ? getAutoTextColor(backgroundColor) : 'currentColor');

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
            {src && (
                <img 
                    src={src} 
                    alt={alt}
                    style={{ 
                        width: '60%', 
                        height: '60%',
                        objectFit: 'contain'
                    }}
                />
            )}
        </div>
    );
};

export default Icon;