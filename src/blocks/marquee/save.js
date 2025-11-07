import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { direction } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `marquee-direction-${direction}`,
    });

    return (
        <div {...blockProps}>
            <div className="wagepoint-marquee-track">
                <div className="wagepoint-marquee-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}