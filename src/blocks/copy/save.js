import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { contentWidth, textAlignment } = attributes;

    const blockProps = useBlockProps.save({
        className: [
            'copy-block',
            `width-${contentWidth}`,
            textAlignment !== 'inherit' ? `align-${textAlignment}` : ''
        ].filter(Boolean).join(' ')
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}