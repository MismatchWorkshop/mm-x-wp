import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    RichText,
    InspectorControls,
    BlockControls,
    HeadingLevelDropdown
} from '@wordpress/block-editor';
import { 
    PanelBody,
    ToolbarGroup,
    DropdownMenu,
    MenuGroup,
    MenuItem
} from '@wordpress/components';
import { check, color as colorIcon, background as backgroundIcon } from '@wordpress/icons';
import CustomColorSelect from '../../components/CustomColorSelect';
import { COLOR_SYSTEM } from '../../color-system';

export default function Edit({ attributes, setAttributes }) {
    const { content, level, textColor, backgroundColor } = attributes;

    const blockProps = useBlockProps({
        className: [
            'meta-heading',
            textColor !== 'inherit' ? `text-${textColor}` : '',
            backgroundColor !== 'transparent' ? `bg-${backgroundColor}` : ''
        ].filter(Boolean).join(' ')
    });

    // Text color options with inherit
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

    // Background color options
    const backgroundColorOptions = [
        { value: 'transparent', label: 'None', color: 'transparent' },
        ...Object.entries(COLOR_SYSTEM.backgrounds)
            .filter(([key]) => key !== 'transparent')
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
    const currentBgColorLabel = backgroundColorOptions.find(opt => opt.value === backgroundColor)?.label || 'None';

    return (
        <>
            <BlockControls group="block">
                <HeadingLevelDropdown
                    value={level}
                    onChange={(newLevel) => setAttributes({ level: newLevel })}
                />
                
                <ToolbarGroup>
                    <DropdownMenu
                        icon={colorIcon}
                        label={__('Text Color', 'wagepoint')}
                        text={currentTextColorLabel}
                        className="meta-heading-text-color-dropdown"
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

                    <DropdownMenu
                        icon={backgroundIcon}
                        label={__('Background Color', 'wagepoint')}
                        text={currentBgColorLabel}
                        className="meta-heading-bg-color-dropdown"
                    >
                        {({ onClose }) => (
                            <MenuGroup label={__('Background Color', 'wagepoint')}>
                                {backgroundColorOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        icon={backgroundColor === option.value ? check : null}
                                        isSelected={backgroundColor === option.value}
                                        onClick={() => {
                                            setAttributes({ backgroundColor: option.value });
                                            onClose();
                                        }}
                                    >
                                        <ColorSwatch color={option.color} />
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </MenuGroup>
                        )}
                    </DropdownMenu>
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
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
                    
                    <CustomColorSelect
                        label={__('Background Color', 'wagepoint')}
                        value={backgroundColor}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                        colors={{
                            'transparent': { value: 'transparent', label: 'None' },
                            ...COLOR_SYSTEM.backgrounds
                        }}
                    />
                </PanelBody>
            </InspectorControls>

            <RichText
                tagName={`h${level}`}
                {...blockProps}
                value={content}
                onChange={(value) => setAttributes({ content: value })}
                placeholder={__('Meta heading...', 'wagepoint')}
                allowedFormats={['core/bold', 'core/italic']}
            />
        </>
    );
}