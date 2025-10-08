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
import { COLOR_SYSTEM, getAutoTextColor } from '../../color-system';

const SPACING_OPTIONS = [
    { label: 'Auto', value: "auto" },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }
];

export default function Edit({ attributes, setAttributes }) {
    const { containerBackground, verticalSpacing, topSpacing, bottomSpacing } = attributes;

    const onBackgroundChange = (newBackground) => {
        setAttributes({ containerBackground: newBackground });
    };

    const onTopSpacingChange = (newSpacing) => {
        setAttributes({ topSpacing: newSpacing });
    };

    const onBottomSpacingChange = (newSpacing) => {
        setAttributes({ bottomSpacing: newSpacing });
    };

    const getBlockClass = () => { 
        return [
            "container",
            topSpacing !=="auto" ? `top-${topSpacing}` : "",
            bottomSpacing !=="auto" ? `bottom-${bottomSpacing}` : ""
        ].join(" ");
    }

    const containerStyles = {
        backgroundColor: COLOR_SYSTEM.backgrounds[containerBackground]?.value || 'transparent'
    };

    const blockProps = useBlockProps({
        className: getBlockClass()
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Container Settings', 'custom-blocks')}>
                    <CustomColorSelect
                        label={__('Background Color', 'custom-blocks')}
                        value={containerBackground}
                        onChange={onBackgroundChange}
                        colors={COLOR_SYSTEM.backgrounds}
                    />

                    <SelectControl 
                        label={__('Top Spacing', 'custom-blocks')}
                        value={topSpacing}
                        onChange={onTopSpacingChange}
                        options={SPACING_OPTIONS}
                    />

                    <SelectControl 
                        label={__('Bottom Spacing', 'custom-blocks')}
                        value={bottomSpacing}
                        onChange={onBottomSpacingChange}
                        options={SPACING_OPTIONS}
                    />

                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="container__content" style={containerStyles}>
                    <InnerBlocks />
                </div>
            </div>
        </>
    );
}