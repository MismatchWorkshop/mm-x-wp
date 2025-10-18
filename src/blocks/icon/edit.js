import { InspectorControls, BlockControls, AlignmentToolbar, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import IconPicker from '../../components/IconPicker';
import Icon from '../../components/Icon';

export default function Edit({ attributes, setAttributes, isSelected }) {
    const { 
        iconType, 
        iconSrc, 
        iconSvg, 
        iconBackgroundColor, 
        iconSize,
        alignment
    } = attributes;

    const blockProps = useBlockProps({
        className: alignment ? `has-text-align-${alignment}` : '',
    });

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title="Icon Settings" initialOpen={true}>
                    <IconPicker
                        value={{
                            type: iconType,
                            src: iconSrc,
                            svg: iconSvg,
                            backgroundColor: iconBackgroundColor,
                            size: iconSize,
                        }}
                        onChange={(newIcon) => {
                            setAttributes({
                                iconType: newIcon.type,
                                iconSrc: newIcon.src,
                                iconSvg: newIcon.svg,
                                iconBackgroundColor: newIcon.backgroundColor,
                                iconSize: newIcon.size,
                            });
                        }}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {(iconSvg || iconSrc) ? (
                    <div 
                        style={{ 
                            cursor: 'pointer',
                            outline: isSelected ? '2px solid #007cba' : 'none',
                            outlineOffset: '2px',
                            borderRadius: '20px',
                            display: 'inline-block'
                        }}
                    >
                        <Icon 
                            type={iconType}
                            src={iconSrc}
                            svg={iconSvg}
                            backgroundColor={iconBackgroundColor}
                            size={iconSize}
                            borderRadius="20px"
                        />
                    </div>
                ) : (
                    <div style={{
                        width: `${iconSize}px`,
                        height: `${iconSize}px`,
                        border: '2px dashed #E5E7EB',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9CA3AF',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}>
                        Select Icon
                    </div>
                )}
            </div>
        </>
    );
}