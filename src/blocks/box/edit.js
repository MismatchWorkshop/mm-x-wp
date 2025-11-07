import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { COLOR_SYSTEM, getAutoTextColor } from '../../color-system';
import metadata from './block.json';

export default function Edit({ attributes, setAttributes }) {
    const { className, borderColor, containerBackground } = attributes;

    // Get default style from block.json
    const defaultStyle = metadata.styles.find(s => s.isDefault)?.name;

    // Set default style if no style is selected
    useEffect(() => {
        if (defaultStyle && (!className || !className.includes('is-style-'))) {
            setAttributes({ className: `is-style-${defaultStyle}` });
        }
    }, []);

    const onBorderColorChange = (newColor) => {
        setAttributes({ borderColor: newColor });
    };

    const onBackgroundChange = (newBackground) => {
        setAttributes({ containerBackground: newBackground });
    };

    // Get the actual color value for preview
    const borderColorValue = COLOR_SYSTEM.backgrounds[borderColor]?.value || '#FDB022';
    const backgroundColorValue = COLOR_SYSTEM.backgrounds[containerBackground]?.value || '#FFFFFF';
    const textColor = getAutoTextColor(containerBackground);
    
    // For fill style, use borderColor as background
    const isFillStyle = className?.includes('is-style-fill');
    const displayBackground = isFillStyle ? borderColorValue : backgroundColorValue;
    const displayTextColor = isFillStyle ? getAutoTextColor(borderColor) : textColor;

    const blockProps = useBlockProps({
        className: `box bg-${containerBackground}`,
        style: {
            '--box-border-color': borderColorValue,
            '--box-bg-color': displayBackground,
            '--box-fill-color': borderColorValue,
            color: displayTextColor
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Box Settings', 'wagepoint')}>
                    <SelectControl
                        label={__('Border/Fill Color', 'wagepoint')}
                        value={borderColor}
                        options={Object.entries(COLOR_SYSTEM.backgrounds)
                            .filter(([key]) => key !== 'transparent')
                            .map(([key, config]) => ({
                                value: key,
                                label: config.label
                            }))}
                        onChange={onBorderColorChange}
                        help={__('This color is used for the border (Border style) or fill (Fill style)', 'wagepoint')}
                    />

                    <SelectControl
                        label={__('Background Color', 'wagepoint')}
                        value={containerBackground}
                        options={Object.entries(COLOR_SYSTEM.backgrounds).map(([key, config]) => ({
                            value: key,
                            label: config.label
                        }))}
                        onChange={onBackgroundChange}
                        help={__('Background color of the box (applies to Border style only)', 'wagepoint')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks />
            </div>
        </>
    );
}
