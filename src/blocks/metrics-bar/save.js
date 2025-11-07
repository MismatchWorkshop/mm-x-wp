import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { heading, lineColor } = attributes;
    
    // Import COLOR_SYSTEM for getColor (this runs at build time)
    const colorValue = lineColor || 'payday-blue';
    
    const blockProps = useBlockProps.save({
        className: 'metrics-bar-block',
    });

    return (
        <div {...blockProps}>
            {heading && (
                <RichText.Content
                    tagName="div"
                    className="metrics-bar-heading"
                    value={heading}
                />
            )}
            
            <div className="metrics-bar-container">
                <svg 
                    className="metrics-bar-line-svg" 
                    data-dynamic-line="true"
                    data-line-color={colorValue}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                    <path 
                        className="metrics-line-path"
                        stroke="currentColor"
                        strokeWidth="2" 
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="metrics-bar-items">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}