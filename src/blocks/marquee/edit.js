import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { direction } = attributes;
    const blockProps = useBlockProps({
        className: `marquee-direction-${direction}`,
    });

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="arrow-left-alt2"
                        label={__('Scroll Left', 'wagepoint')}
                        isPressed={direction === 'left'}
                        onClick={() => setAttributes({ direction: 'left' })}
                    />
                    <ToolbarButton
                        icon="arrow-right-alt2"
                        label={__('Scroll Right', 'wagepoint')}
                        isPressed={direction === 'right'}
                        onClick={() => setAttributes({ direction: 'right' })}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div {...blockProps}>
                <div className="wagepoint-marquee-editor-label">
                    {__('Marquee Container (scrolls on frontend)', 'wagepoint')}
                </div>
                <div className="wagepoint-marquee-content">
                    <InnerBlocks
                        orientation="horizontal"
                    />
                </div>
            </div>
        </>
    );
}