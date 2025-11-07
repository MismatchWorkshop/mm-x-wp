import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Icon from '../../components/Icon';
import IconPicker from '../../components/IconPicker';
import ContextualColorPicker from '../../components/ContextualColorPicker';
import { getContextualColor } from '../../color-system';

export default function Edit({ attributes, setAttributes, context, clientId }) {
    const { icon, value, label } = attributes;
    
    // Get container background from context with fallback
    let containerBackground = context['wagepoint/containerBackground'] || 'white';
    
    // Fallback: If context seems stale, traverse up to find parent container
    const parentContainerBg = useSelect((select) => {
        const { getBlockParents, getBlock } = select('core/block-editor');
        const parents = getBlockParents(clientId);
        
        for (const parentId of parents) {
            const parentBlock = getBlock(parentId);
            if (parentBlock?.name === 'wagepoint/container') {
                return parentBlock.attributes.containerBackground;
            }
        }
        return null;
    }, [clientId]);
    
    if (parentContainerBg) {
        containerBackground = parentContainerBg;
    }
    
    const blockProps = useBlockProps({
        className: 'metric-block'
    });

    const updateIcon = (newIcon) => {
        setAttributes({ icon: newIcon });
    };
    
    // Resolve the actual color for display
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
                <Icon 
                    type={icon.type}
                    src={icon.src}
                    svg={icon.svg}
                    backgroundColor={resolvedIconBg}
                    size={icon.size || 100}
                />
                <div className="metric-content">
                    <RichText
                        tagName="div"
                        className="metric-value"
                        value={value}
                        onChange={(newValue) => setAttributes({ value: newValue })}
                        placeholder="99%"
                    />
                    <RichText
                        tagName="div"
                        className="metric-label"
                        value={label}
                        onChange={(newLabel) => setAttributes({ label: newLabel })}
                        placeholder="Accuracy Rate"
                    />
                </div>
            </div>
        </>
    );
}