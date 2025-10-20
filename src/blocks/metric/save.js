import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { icon, value, label } = attributes;
    
    const blockProps = useBlockProps.save({
        className: 'metric-block'
    });

    // Determine the background class
    let iconBgClass = '';
    if (icon.backgroundColor === 'auto') {
        iconBgClass = 'bg-auto';
    } else if (icon.backgroundColor) {
        iconBgClass = `bg-${icon.backgroundColor}`;
    }

    return (
        <div {...blockProps}>
            {(icon.src || icon.svg) && (
                <div 
                    className={`wp-block-icon ${iconBgClass}`.trim()}
                    style={{
                        width: `${icon.size || 64}px`,
                        height: `${icon.size || 64}px`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}
                >
                    {icon.type === 'svg' && icon.svg ? (
                        <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
                    ) : icon.src ? (
                        <img 
                            src={icon.src} 
                            alt=""
                            style={{ 
                                width: '60%', 
                                height: '60%',
                                objectFit: 'contain'
                            }}
                        />
                    ) : null}
                </div>
            )}
            
            <div className="metric-content">
                <RichText.Content
                    tagName="div"
                    className="metric-value"
                    value={value}
                />
                <RichText.Content
                    tagName="div"
                    className="metric-label"
                    value={label}
                />
            </div>
        </div>
    );
}