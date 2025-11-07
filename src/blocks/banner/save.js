import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { backgroundColor } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `bg-${backgroundColor}`
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}