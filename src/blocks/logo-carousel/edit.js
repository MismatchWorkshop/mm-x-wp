import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    PanelColorSettings,
    HeadingLevelDropdown,
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl,
    Button,
    ToolbarGroup, 
    ToolbarDropdownMenu,
    __experimentalHStack as HStack
} from '@wordpress/components';
import { COLOR_SYSTEM, getAutoTextColor } from '../../color-system';
import CustomColorSelect from '../../components/CustomColorSelect';
import LogosGrid from '../../components/LogosGrid';
import SortableLogoItem from '../../components/SortableLogoItem';

export default function Edit({ attributes, setAttributes }) {
    const { logos, heading, containerBackground, headingTextColor, headingLevel } = attributes;

    const blockProps = useBlockProps();

    // Calculate actual text color (auto or manual)
    const actualTextColor = headingTextColor === 'auto' 
        ? getAutoTextColor(containerBackground)
        : COLOR_SYSTEM.textColors[headingTextColor]?.value || '#1a1a1a';

    const onBackgroundChange = (newBackground) => {
        setAttributes({ containerBackground: newBackground });
        
        // If heading is on auto, it will automatically update via actualTextColor calculation
        // No need to manually change headingTextColor if it's set to 'auto'
    };

    const onHeadingColorChange = (newColor) => {
        setAttributes({ headingTextColor: newColor });
    };

    const addLogo = (media) => {
        const newLogos = [...logos, {
            id: media.id,
            url: media.url,
            alt: media.alt || ''
        }];
        setAttributes({ logos: newLogos });
    };

    const removeLogo = (index) => {
        const newLogos = logos.filter((_, i) => i !== index);
        setAttributes({ logos: newLogos });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background Settings', 'custom-blocks')}>
                    <SelectControl
                        label={__('Container Background', 'custom-blocks')}
                        value={containerBackground}
                        options={Object.entries(COLOR_SYSTEM.backgrounds).map(([key, config]) => ({
                            value: key,
                            label: config.label
                        }))}
                        onChange={onBackgroundChange}
                    />
                </PanelBody>
                <PanelBody title={__('Text Colors', 'custom-blocks')}>
                    
                    <CustomColorSelect
                        label={__('Heading Color', 'custom-blocks')}
                        value={headingTextColor}
                        onChange={onHeadingColorChange}
                        colors={COLOR_SYSTEM.textColors}
                        showAutoOption={true}
                        autoColor={actualTextColor}
                    />

                </PanelBody>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        text={`H${headingLevel}`}
                        label={`Heading ${headingLevel}`}
                        controls={[
                            { title: 'H1', onClick: () => setAttributes({ headingLevel: 1 }) },
                            { title: 'H2', onClick: () => setAttributes({ headingLevel: 2 }) },
                            { title: 'H3', onClick: () => setAttributes({ headingLevel: 3 }) },
                            { title: 'H4', onClick: () => setAttributes({ headingLevel: 4 }) },
                            { title: 'H5', onClick: () => setAttributes({ headingLevel: 5 }) },
                            { title: 'H6', onClick: () => setAttributes({ headingLevel: 6 }) },
                        ]}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div {...blockProps}>
                <div 
                    className="logo-carousel-container container"
                    style={{ 
                        backgroundColor: COLOR_SYSTEM.backgrounds[containerBackground]?.value,
                        padding: '2rem'
                    }}
                >
                    <RichText
                        tagName={'h' + headingLevel}
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter heading...', 'custom-blocks')}
                        style={{ color: actualTextColor }}
                        className={'logo-carousel__heading heading--primary'}
                    />
                    
                    <div className="logos-grid">
                        <LogosGrid 
                            logos={logos} 
                            setAttributes={setAttributes}
                            addLogo={addLogo}
                            removeLogo={removeLogo}
                        />
                        
                        {1==2 && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={addLogo}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button 
                                        onClick={open}
                                        variant="secondary"
                                    >
                                        Add Logo
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}