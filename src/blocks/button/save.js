import { useBlockProps, RichText } from '@wordpress/block-editor';

const ICON_SYMBOLS = {
    'arrow-right': '→',
    'arrow-left': '←',
    'check': '✓',
    'plus': '+',
    'external': '↗',
    'download': '↓',
    'none': ''
};

export default function save({ attributes }) {
    const { text, url, linkTarget, buttonStyle, fontSize, icon, iconPosition } = attributes;

    const blockProps = useBlockProps.save({
        className: `wp-block-button button-${buttonStyle} button-size-${fontSize}`,
    });

    const iconSymbol = ICON_SYMBOLS[icon] || '';

    return (
        <div {...blockProps}>
            <a 
                className="wp-block-button__link" 
                href={url || '#'}
                target={linkTarget}
                rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
            >
                {icon !== 'none' && iconPosition === 'before' && (
                    <span className="button-icon button-icon--before">
                        {iconSymbol}
                    </span>
                )}
                
                <RichText.Content
                    tagName="span"
                    className="button-text"
                    value={text}
                />
                
                {icon !== 'none' && iconPosition === 'after' && (
                    <span className="button-icon button-icon--after">
                        {iconSymbol}
                    </span>
                )}
            </a>
        </div>
    );
}