import { COLOR_SYSTEM, getAutoTextColor } from '../color-system';

const Icon = ({ 
    type = 'image',
    src = '',
    svg = '',
    alt = '',
    size = 64,
    backgroundColor,  // This should now be the resolved color key, not 'auto'
    iconColor = '', 
    borderRadius = '16px',
    className = ''
}) => {
    const bgColor = COLOR_SYSTEM.backgrounds[backgroundColor]?.value || 'transparent';
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
        color: calculatedIconColor,
    };

    if (type === 'svg' && svg) {
        return (
            <div 
                className={`wp-block-icon ${className}`}
                style={iconStyle}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        );
    }

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