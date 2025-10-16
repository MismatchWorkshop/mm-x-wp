import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    RichText,
    InspectorControls,
    BlockControls,
    HeadingLevelDropdown,
    AlignmentToolbar
} from '@wordpress/block-editor';
import { 
    PanelBody,
    SelectControl,
    ToolbarGroup,
    DropdownMenu,
    MenuGroup,
    MenuItem
} from '@wordpress/components';
import { check, color as colorIcon } from '@wordpress/icons';
import CustomColorSelect from '../../components/CustomColorSelect';
import { COLOR_SYSTEM } from '../../color-system';

const SIZE_OPTIONS = [
    { label: 'Inherit from Level', value: 'inherit' },
    { label: 'Size 1 (Largest)', value: '1' },
    { label: 'Size 2', value: '2' },
    { label: 'Size 3', value: '3' },
    { label: 'Size 4', value: '4' },
    { label: 'Size 5', value: '5' },
    { label: 'Size 6', value: '6' },
    { label: 'Size 7', value: '7' },
    { label: 'Size 8 (Smallest)', value: '8' }
];

export default function Edit({ attributes, setAttributes }) {
    const { content, level, size, textColor, textAlignment, placeholder } = attributes;

    // Determine actual size to use
    const effectiveSize = size === 'inherit' ? level.toString() : size;

    const blockProps = useBlockProps({
        className: [
            'wp-block-wagepoint-heading',
            `text-${effectiveSize}`,  // Changed from size-* to text-*
            textColor !== 'inherit' ? `text-${textColor}` : '',
            textAlignment !== 'inherit' ? `has-text-align-${textAlignment}` : ''
        ].filter(Boolean).join(' ')
    });

    // Text color options
    const textColorOptions = [
        { value: 'inherit', label: 'Inherit', color: null },
        ...Object.entries(COLOR_SYSTEM.textColors)
            .filter(([key]) => key !== 'auto')
            .map(([key, color]) => ({
                value: key,
                label: color.label,
                color: color.value
            }))
    ];

    // Color swatch component
    const ColorSwatch = ({ color }) => (
        <span
            style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                borderRadius: '2px',
                backgroundColor: color === 'transparent' ? 'transparent' : color,
                border: color === 'transparent' || color === '#FFFFFF' || color === '#F9FAFB' ? '1px solid #ddd' : 'none',
                marginRight: '8px',
                verticalAlign: 'middle'
            }}
        />
    );

    const currentTextColorLabel = textColorOptions.find(opt => opt.value === textColor)?.label || 'Inherit';

    return (
        <>
            <BlockControls group="block">
                <HeadingLevelDropdown
                    value={level}
                    onChange={(newLevel) => setAttributes({ level: newLevel })}
                />
                
                <AlignmentToolbar
                    value={textAlignment === 'inherit' ? undefined : textAlignment}
                    onChange={(value) => setAttributes({ textAlignment: value || 'inherit' })}
                />
                
                <ToolbarGroup>
                    <DropdownMenu
                        icon={colorIcon}
                        label={__('Text Color', 'wagepoint')}
                        text={currentTextColorLabel}
                        className="heading-text-color-dropdown"
                    >
                        {({ onClose }) => (
                            <MenuGroup label={__('Text Color', 'wagepoint')}>
                                {textColorOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        icon={textColor === option.value ? check : null}
                                        isSelected={textColor === option.value}
                                        onClick={() => {
                                            setAttributes({ textColor: option.value });
                                            onClose();
                                        }}
                                    >
                                        {option.color && <ColorSwatch color={option.color} />}
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </MenuGroup>
                        )}
                    </DropdownMenu>
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Typography', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Visual Size', 'wagepoint')}
                        value={size}
                        onChange={(value) => setAttributes({ size: value })}
                        options={SIZE_OPTIONS}
                        help={size === 'inherit' 
                            ? __(`Currently using Size ${level} (matches heading level)`, 'wagepoint')
                            : __('Custom size override', 'wagepoint')
                        }
                    />
                </PanelBody>

                <PanelBody title={__('Style', 'wagepoint')} initialOpen={true}>
                    <CustomColorSelect
                        label={__('Text Color', 'wagepoint')}
                        value={textColor}
                        onChange={(value) => setAttributes({ textColor: value })}
                        colors={{
                            'inherit': { value: 'inherit', label: 'Inherit' },
                            ...COLOR_SYSTEM.textColors
                        }}
                    />
                </PanelBody>
            </InspectorControls>

            <RichText
                tagName={`h${level}`}
                {...blockProps}
                value={content}
                onChange={(value) => setAttributes({ content: value })}
                placeholder={placeholder}
                allowedFormats={['core/bold', 'core/italic']}
            />
        </>
    );
}