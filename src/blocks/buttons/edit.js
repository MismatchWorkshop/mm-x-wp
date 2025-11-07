import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['wagepoint/button'];

const TEMPLATE = [
    ['wagepoint/button', { text: 'Button' }]
];

export default function Edit({ attributes, setAttributes }) {
    const { alignment } = attributes;

    const blockProps = useBlockProps({
        className: `wp-block-buttons is-content-justification-${alignment}`,
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        orientation: 'horizontal',
    });

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment || 'left' })}
                    alignmentControls={[
                        {
                            icon: 'align-left',
                            title: __('Align buttons left', 'wagepoint'),
                            align: 'left',
                        },
                        {
                            icon: 'align-center',
                            title: __('Align buttons center', 'wagepoint'),
                            align: 'center',
                        },
                        {
                            icon: 'align-right',
                            title: __('Align buttons right', 'wagepoint'),
                            align: 'right',
                        },
                    ]}
                />
            </BlockControls>
            <div {...innerBlocksProps} />
        </>
    );
}