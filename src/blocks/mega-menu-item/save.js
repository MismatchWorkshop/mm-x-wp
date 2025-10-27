import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { icon, iconColor, textColor, title, description, url } = attributes;
    
    // Build class names
    const itemClasses = [
        'mega-menu-item',
        textColor && textColor !== 'auto' ? `text-${textColor}` : ''
    ].filter(Boolean).join(' ');

    const iconClasses = [
        'mega-menu-item__icon',
        iconColor ? `color-${iconColor}` : 'color-auto'
    ].filter(Boolean).join(' ');

    return (
        <a 
            {...useBlockProps.save({ 
                className: itemClasses,
                href: url 
            })}
        >
            {icon && (
                <div 
                    className={iconClasses}
                    dangerouslySetInnerHTML={{ __html: icon }}
                />
            )}
            <div className="mega-menu-item__content">
                <RichText.Content
                    tagName="h3"
                    value={title}
                    className="mega-menu-item__title"
                />
                <RichText.Content
                    tagName="p"
                    value={description}
                    className="mega-menu-item__description"
                />
            </div>
        </a>
    );
}