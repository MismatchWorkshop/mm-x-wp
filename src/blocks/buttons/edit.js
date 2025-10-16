import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['wagepoint/button'];

const TEMPLATE = [
    ['wagepoint/button', { text: 'Button' }]
];

export default function Edit() {
    const blockProps = useBlockProps({
        className: 'wp-block-buttons',
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        orientation: 'horizontal',
    });

    return <div {...innerBlocksProps} />;
}