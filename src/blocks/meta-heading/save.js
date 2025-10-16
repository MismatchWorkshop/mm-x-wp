import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, level, textColor, backgroundColor } = attributes;

    const blockProps = useBlockProps.save({
        className: [
            'meta-heading',
            textColor !== 'inherit' ? `text-${textColor}` : '',
            backgroundColor !== 'transparent' ? `bg-${backgroundColor}` : ''
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