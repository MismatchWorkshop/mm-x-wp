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
                >
                    {icon.type === 'svg' && icon.svg ? (
                        <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
                    ) : icon.src ? (
                        <img 
                            src={icon.src} 
                            alt=""
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