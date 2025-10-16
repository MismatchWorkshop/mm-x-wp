import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, level, size, textColor, textAlignment } = attributes;

    // Determine actual size to use
    const effectiveSize = size === 'inherit' ? level.toString() : size;

    const blockProps = useBlockProps.save({
        className: [
            'wp-block-wagepoint-heading',
            `text-${effectiveSize}`,  // Changed from size-* to text-*
            textColor !== 'inherit' ? `text-${textColor}` : '',
            textAlignment !== 'inherit' ? `has-text-align-${textAlignment}` : ''
        ].filter(Boolean).join(' ')
    });

    return (
        <RichText.Content
            tagName={`h${level}`}
            {...blockProps}
            value={content}
        />
    );
}