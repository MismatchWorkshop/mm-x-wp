import { __ } from '@wordpress/i18n';
import { 
    InspectorControls, 
    InnerBlocks,
    RichText,
    BlockControls,
    useBlockProps 
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import Icon from '../../components/Icon';
import IconPicker from '../../components/IconPicker';
import ContextualColorPicker from '../../components/ContextualColorPicker';
import { getContextualColor } from '../../color-system';

export default function Edit({ attributes, setAttributes, context }) {
    const { icon, title, description } = attributes;
    const blockProps = useBlockProps({
        className: 'highlight-item'
    });

    let containerBackground = context['wagepoint/containerBackground'] || 'white';

    const INNER_BLOCKS_TEMPLATE = [
        ['wagepoint/heading', {
            level: 3,
            size: 'inherit',
            content: '',
            placeholder: 'Heading...'
        }],
        ['core/paragraph', { 
            placeholder: 'Description...'
        }]
    ];

    const ALLOWED_BLOCKS = [
        'wagepoint/meta-heading',
        'wagepoint/heading',  
        'core/paragraph',
        'wagepoint/buttons'
    ];

    const updateIcon = (newIcon) => {
        setAttributes({ icon: newIcon });
    };

    const resolvedIconBg = icon.backgroundColor === 'auto' 
        ? getContextualColor(containerBackground, 'iconHighlight')
        : icon.backgroundColor;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Icon Settings', 'wagepoint')} initialOpen={true}>
                    <IconPicker
                        value={icon}
                        onChange={updateIcon}
                    />
                    
                    <div style={{ marginTop: '16px' }}>
                        <ContextualColorPicker
                            label={__('Icon Background', 'wagepoint')}
                            value={icon.backgroundColor}
                            onChange={(newBackground) => updateIcon({ ...icon, backgroundColor: newBackground })}
                            role="iconHighlight"
                            containerBackground={containerBackground}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={INNER_BLOCKS_TEMPLATE}
                    templateLock={false}
                />
            </div>
        </>
    );
}