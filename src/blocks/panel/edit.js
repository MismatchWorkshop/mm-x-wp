import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { COLOR_SYSTEM, getContextualColorValue } from '../../color-system';

export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
    const { label, icon, template } = attributes;

    // Check if we're inside a Tabs block - only to get background color
    const parentBgColor = useSelect(select => {
        const parents = select('core/block-editor').getBlockParents(clientId);
        if (parents && parents.length > 0) {
            const parentBlock = select('core/block-editor').getBlock(parents[0]);
            if (parentBlock && parentBlock.name === 'wagepoint/tabs') {
                return parentBlock.attributes.contentBackgroundColor || 'white';
            }
        }
        return 'white';
    }, [clientId]);

    // Use parent background from attribute (set by Tabs) or from direct parent query
    const parentBgColorKey = attributes['data-parent-bg-color'] || parentBgColor;

    // Get colors using safe access
    const contentTextColor = COLOR_SYSTEM.backgrounds[parentBgColorKey]?.autoText || '#1E293B';
    const iconBgColor = getContextualColorValue(parentBgColorKey, 'iconDefault');

    // Simple block props - no visibility awareness needed
    const blockProps = useBlockProps({
        className: 'wagepoint-panel'
    });
    
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Panel Settings', 'wagepoint')}>
                    <TextControl
                        label={__('Panel Label', 'wagepoint')}
                        help={__('This label will appear in the tab navigation', 'wagepoint')}
                        value={label}
                        onChange={(value) => setAttributes({ label: value })}
                    />
                    
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ icon: media.url })}
                            allowedTypes={['image']}
                            value={icon}
                            render={({ open }) => (
                                <>
                                    {icon ? (
                                        <div style={{ marginTop: '12px' }}>
                                            <img 
                                                src={icon} 
                                                alt={label} 
                                                style={{ 
                                                    width: '60px', 
                                                    height: '60px', 
                                                    objectFit: 'contain', 
                                                    marginBottom: '10px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    padding: '8px'
                                                }} 
                                            />
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Button onClick={open} variant="secondary" isSmall>
                                                    {__('Change Icon', 'wagepoint')}
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ icon: '' })} 
                                                    variant="secondary" 
                                                    isDestructive 
                                                    isSmall
                                                >
                                                    {__('Remove', 'wagepoint')}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button onClick={open} variant="secondary" style={{ marginTop: '12px' }}>
                                            {__('Add Icon', 'wagepoint')}
                                        </Button>
                                    )}
                                </>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Icon section */}
                {icon && (
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: iconBgColor,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <img 
                            src={icon} 
                            alt={label} 
                            style={{ 
                                width: '32px', 
                                height: '32px', 
                                objectFit: 'contain' 
                            }} 
                        />
                    </div>
                )}

                {/* InnerBlocks area for fully customizable content */}
                <InnerBlocks 
                    template={template} 
                    templateLock={false}
                />
            </div>
        </>
    );
}