import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ColorPalette, RangeControl } from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const { imageId, imageUrl, imageAlt, name, title, linkedInUrl, backgroundColor, headingLevel } = attributes;
    
    const blockProps = useBlockProps();
    const colors = useSetting('color.palette');
    
    const HeadingTag = `h${headingLevel}`;

    const onSelectImage = (media) => {
        setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt || ''
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            imageId: 0,
            imageUrl: '',
            imageAlt: ''
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Person Details', 'wagepoint')} initialOpen={true}>
                    <TextControl
                        label={__('Name', 'wagepoint')}
                        value={name}
                        onChange={(value) => setAttributes({ name: value })}
                    />
                    <TextControl
                        label={__('Job Title', 'wagepoint')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <RangeControl
                        label={__('Heading Level', 'wagepoint')}
                        value={headingLevel}
                        onChange={(value) => setAttributes({ headingLevel: value })}
                        min={1}
                        max={6}
                        help={__('Choose the appropriate heading level for page context', 'wagepoint')}
                    />
                    <TextControl
                        label={__('LinkedIn URL', 'wagepoint')}
                        value={linkedInUrl}
                        onChange={(value) => setAttributes({ linkedInUrl: value })}
                        help={__('Full LinkedIn profile URL (optional)', 'wagepoint')}
                    />
                </PanelBody>

                <PanelBody title={__('Image', 'wagepoint')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (
                                <div>
                                    {imageUrl ? (
                                        <>
                                            <img 
                                                src={imageUrl} 
                                                alt={imageAlt}
                                                style={{ 
                                                    maxWidth: '100%', 
                                                    height: 'auto',
                                                    marginBottom: '10px'
                                                }} 
                                            />
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Button onClick={open} variant="secondary">
                                                    {__('Replace Image', 'wagepoint')}
                                                </Button>
                                                <Button onClick={onRemoveImage} variant="link" isDestructive>
                                                    {__('Remove Image', 'wagepoint')}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <Button onClick={open} variant="primary">
                                            {__('Add Image', 'wagepoint')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    <p style={{ fontSize: '12px', color: '#757575', marginTop: '8px' }}>
                        {__('Ideal dimensions: 500 x 750 pixels', 'wagepoint')}
                    </p>
                </PanelBody>

                <PanelBody title={__('Background Color', 'wagepoint')} initialOpen={false}>
                    <ColorPalette
                        colors={colors}
                        value={backgroundColor}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                        clearable={true}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="wagepoint-person-card" style={{ '--person-card-bg-color': backgroundColor }}>
                    <div className="wagepoint-person-card__image-wrapper">
                        <div className="wagepoint-person-card__background"></div>
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={imageAlt || name}
                                className="wagepoint-person-card__image"
                            />
                        ) : (
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <div className="wagepoint-person-card__placeholder">
                                            <button 
                                                onClick={open}
                                                className="wagepoint-person-card__add-button"
                                            >
                                                {__('Add Image', 'wagepoint')}
                                            </button>
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        )}
                        {linkedInUrl && (
                            <a 
                                href={linkedInUrl}
                                className="wagepoint-person-card__linkedin"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={__('LinkedIn Profile', 'wagepoint')}
                            >
                                <span className="wagepoint-person-card__linkedin-icon"></span>
                            </a>
                        )}
                    </div>
                <div className="wagepoint-person-card__content">
                    <HeadingTag className="wagepoint-person-card__name">{name}</HeadingTag>
                    <p className="wagepoint-person-card__title">{title}</p>
                </div>
            </div>
            </div>
        </>
    );
}