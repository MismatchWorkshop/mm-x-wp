import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { borderColor, containerBackground, className } = attributes;
    
    // Determine if using fill style
    const isFillStyle = className?.includes('is-style-fill');
    
    // For fill style, we need to set the background color from borderColor
    // and calculate text color. We'll use CSS custom properties.
    const fillColor = isFillStyle ? `var(--color-${borderColor})` : null;
    
    const blockProps = useBlockProps.save({
        className: `box bg-${containerBackground} border-${borderColor}`,
        style: isFillStyle ? {
            '--box-fill-color': fillColor
        } : null
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
