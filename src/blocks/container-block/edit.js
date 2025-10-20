import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InnerBlocks,
    InspectorControls
} from '@wordpress/block-editor';
import { 
    PanelBody,
    SelectControl
} from '@wordpress/components';
import CustomColorSelect from '../../components/CustomColorSelect';
import { COLOR_SYSTEM } from '../../color-system';
import { ContainerProvider } from '../../components/ContainerContext'; // ADD THIS

const OUTER_BG_OPTIONS = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
];

const SPACING_OPTIONS = [
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' }
];

const WIDTH_OPTIONS = [
    { label: 'Normal', value: 'normal' },
    { label: 'Narrow', value: 'narrow' },
    { label: 'Wide', value: 'wide' }
];

const CONTENT_WIDTH_OPTIONS = [
    { label: 'Full', value: 'full' },
    { label: 'Wide', value: 'wide' },
    { label: 'Medium', value: 'medium' },
    { label: 'Narrow', value: 'narrow' }
];

const PADDING_OPTIONS = [
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
];

const ALIGNMENT_OPTIONS = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' }
];

export default function Edit({ attributes, setAttributes }) {
    const { 
        outerBackground,
        spacing,
        width,
        containerBackground,
        padding,
        contentWidth,
        textAlignment
    } = attributes;

    const outerClassName = [
        'wp-block-wagepoint-container',
        `outer-bg-${outerBackground}`,
        `spacing-${spacing}`
    ].filter(Boolean).join(' ');

    const blockProps = useBlockProps({
        className: outerClassName
    });

    const innerClassName = [
        'container__inner',
        `width-${width}`,
        `bg-${containerBackground}`,
        `padding-${padding}`
    ].filter(Boolean).join(' ');

    const contentClassName = [
        'container__content',
        `content-width-${contentWidth}`,
        `align-${textAlignment}`
    ].filter(Boolean).join(' ');

    console.log('=== Container Block ===');
console.log('Container Background:', containerBackground);
console.log('======================');

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Settings', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Section Background', 'wagepoint')}
                        value={outerBackground}
                        onChange={(value) => setAttributes({ outerBackground: value })}
                        options={OUTER_BG_OPTIONS}
                        help={__('Full-width background color (Light or Dark)', 'wagepoint')}
                    />
                    
                    <SelectControl
                        label={__('Section Spacing', 'wagepoint')}
                        value={spacing}
                        onChange={(value) => setAttributes({ spacing: value })}
                        options={SPACING_OPTIONS}
                        help={__('Vertical margin between sections', 'wagepoint')}
                    />
                </PanelBody>

                <PanelBody title={__('Container Settings', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Container Width', 'wagepoint')}
                        value={width}
                        onChange={(value) => setAttributes({ width: value })}
                        options={WIDTH_OPTIONS}
                    />

                    <CustomColorSelect
                        label={__('Container Background', 'wagepoint')}
                        value={containerBackground}
                        onChange={(value) => setAttributes({ containerBackground: value })}
                        colors={COLOR_SYSTEM.backgrounds}
                    />

                    <SelectControl
                        label={__('Container Padding', 'wagepoint')}
                        value={padding}
                        onChange={(value) => setAttributes({ padding: value })}
                        options={PADDING_OPTIONS}
                        help={__('Vertical padding inside container', 'wagepoint')}
                    />
                </PanelBody>

                <PanelBody title={__('Content Settings', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Content Width', 'wagepoint')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        options={CONTENT_WIDTH_OPTIONS}
                        help={__('Max width of content for readability', 'wagepoint')}
                    />

                    <SelectControl
                        label={__('Text Alignment', 'wagepoint')}
                        value={textAlignment}
                        onChange={(value) => setAttributes({ textAlignment: value })}
                        options={ALIGNMENT_OPTIONS}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className={innerClassName} data-bg={containerBackground}>
                    <div className={contentClassName}>
                        {/* WRAP InnerBlocks with ContainerProvider */}
                        <ContainerProvider value={containerBackground}>
                            <InnerBlocks />
                        </ContainerProvider>
                    </div>
                </div>
            </div>
        </>
    );
}