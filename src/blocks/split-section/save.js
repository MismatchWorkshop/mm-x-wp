import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { backgroundColor, mediaPosition } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `split-section split-section--bg-${backgroundColor} split-section--media-${mediaPosition}`
    });

    return (
        <div {...blockProps}>
            <div className="split-section__container">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}