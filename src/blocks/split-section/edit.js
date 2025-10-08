import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { pullLeft, pullRight } from '@wordpress/icons';
import { COLOR_SYSTEM } from '../../color-system';

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons', 'core/list', 'core/image', 'core/video'];

// Generate background options from color system
const BACKGROUND_OPTIONS = Object.keys(COLOR_SYSTEM.backgrounds).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' '),
    value: key
}));

export default function Edit({ attributes, setAttributes }) {
    const { backgroundColor, mediaPosition } = attributes;
    
    const blockProps = useBlockProps({
        className: `split-section split-section--bg-${backgroundColor} split-section--media-${mediaPosition}`
    });

    const TEMPLATE = [
        ['core/group', { className: 'split-section__content', lock: { move: true, remove: true } }, [
            ['core/heading', { 
                level: 2, 
                placeholder: __('Add heading...', 'wagepoint')
            }],
            ['core/paragraph', { 
                placeholder: __('Add description...', 'wagepoint')
            }],
            ['core/buttons', {}, [
                ['core/button', { text: __('Learn More', 'wagepoint') }]
            ]]
        ]],
        ['core/group', { className: 'split-section__media', lock: { move: true, remove: true } }, [
            ['core/image', { 
                placeholder: __('Upload or select image', 'wagepoint')
            }]
        ]]
    ];

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={pullLeft}
                        label={__('Media on left', 'wagepoint')}
                        isActive={mediaPosition === 'left'}
                        onClick={() => setAttributes({ mediaPosition: 'left' })}
                    />
                    <ToolbarButton
                        icon={pullRight}
                        label={__('Media on right', 'wagepoint')}
                        isActive={mediaPosition === 'right'}
                        onClick={() => setAttributes({ mediaPosition: 'right' })}
                    />
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Section Settings', 'wagepoint')}>
                    <RadioControl
                        label={__('Background Color', 'wagepoint')}
                        selected={backgroundColor}
                        options={BACKGROUND_OPTIONS}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="split-section__container">
                    <InnerBlocks
                        template={TEMPLATE}
                        templateLock="all"
                        allowedBlocks={ALLOWED_BLOCKS}
                    />
                </div>
            </div>
        </>
    );
}