import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
} from '@wordpress/components';

const BUTTON_STYLES = [
    { label: 'Solid White', value: 'solid-white' },
    { label: 'Solid Blue', value: 'solid-blue' },
    { label: 'Solid Yellow', value: 'solid-yellow' },
    { label: 'Solid Dark', value: 'solid-dark' },
    { label: 'Outline White', value: 'outline-white' },
    { label: 'Outline Blue', value: 'outline-blue' },
    { label: 'Outline Dark', value: 'outline-dark' },
    { label: 'Text Link', value: 'link' },
];

const FONT_SIZES = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
];

const ICONS = [
    { label: 'Arrow Right →', value: 'arrow-right' },
    { label: 'Arrow Left ←', value: 'arrow-left' },
    { label: 'Check ✓', value: 'check' },
    { label: 'Plus +', value: 'plus' },
    { label: 'External ↗', value: 'external' },
    { label: 'Download ↓', value: 'download' },
    { label: 'None', value: 'none' },
];

const ICON_SYMBOLS = {
    'arrow-right': '→',
    'arrow-left': '←',
    'check': '✓',
    'plus': '+',
    'external': '↗',
    'download': '↓',
    'none': ''
};

export default function Edit({ attributes, setAttributes }) {
    const { text, url, linkTarget, buttonStyle, fontSize, icon, iconPosition } = attributes;

    const blockProps = useBlockProps({
        className: `wp-block-button button-${buttonStyle} button-size-${fontSize}`,
    });

    const iconSymbol = ICON_SYMBOLS[icon] || '';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Button Style', 'wagepoint')}
                        value={buttonStyle}
                        options={BUTTON_STYLES}
                        onChange={(value) => setAttributes({ buttonStyle: value })}
                    />
                    
                    <SelectControl
                        label={__('Font Size', 'wagepoint')}
                        value={fontSize}
                        options={FONT_SIZES}
                        onChange={(value) => setAttributes({ fontSize: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Link Settings', 'wagepoint')}>
                    <TextControl
                        label={__('URL', 'wagepoint')}
                        value={url}
                        onChange={(value) => setAttributes({ url: value })}
                        type="url"
                        placeholder="https://"
                    />
                    
                    <ToggleControl
                        label={__('Open in new tab', 'wagepoint')}
                        checked={linkTarget === '_blank'}
                        onChange={(value) => 
                            setAttributes({ linkTarget: value ? '_blank' : '_self' })
                        }
                    />
                </PanelBody>

                <PanelBody title={__('Icon Settings', 'wagepoint')}>
                    <SelectControl
                        label={__('Icon', 'wagepoint')}
                        value={icon}
                        options={ICONS}
                        onChange={(value) => setAttributes({ icon: value })}
                    />
                    
                    {icon !== 'none' && (
                        <SelectControl
                            label={__('Icon Position', 'wagepoint')}
                            value={iconPosition}
                            options={[
                                { label: 'After Text', value: 'after' },
                                { label: 'Before Text', value: 'before' },
                            ]}
                            onChange={(value) => setAttributes({ iconPosition: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div 
                    className="wp-block-button__link"
                    role="textbox"
                    aria-label={__('Button text', 'wagepoint')}
                >
                    {icon !== 'none' && iconPosition === 'before' && (
                        <span className="button-icon button-icon--before">
                            {iconSymbol}
                        </span>
                    )}
                    
                    <RichText
                        tagName="span"
                        className="button-text"
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                        placeholder={__('Button text...', 'wagepoint')}
                        allowedFormats={[]}
                        withoutInteractiveFormatting
                    />
                    
                    {icon !== 'none' && iconPosition === 'after' && (
                        <span className="button-icon button-icon--after">
                            {iconSymbol}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}