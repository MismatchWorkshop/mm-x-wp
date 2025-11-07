import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    InnerBlocks,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    RangeControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['wagepoint/buttons', 'wagepoint/button'];

const TEMPLATE = [
    ['wagepoint/buttons', {}, [
        ['wagepoint/button', { text: 'Learn more' }]
    ]]
];

export default function Edit({ attributes, setAttributes }) {
    const {
        imageUrl,
        imageId,
        imageAlt,
        imageBorderRadius,
        title,
        description,
    } = attributes;

    const blockProps = useBlockProps();

    const onSelectImage = (media) => {
        setAttributes({
            imageUrl: media.url,
            imageId: media.id,
            imageAlt: media.alt,
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            imageUrl: '',
            imageId: undefined,
            imageAlt: '',
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Image Settings', 'wagepoint')}>
                    <RangeControl
                        label={__('Image Border Radius', 'wagepoint')}
                        value={imageBorderRadius}
                        onChange={(value) => setAttributes({ imageBorderRadius: value })}
                        min={0}
                        max={50}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="wagepoint-card">
                    <MediaUploadCheck>
                        <div className="wagepoint-card__image">
                            {imageUrl ? (
                                <div className="wagepoint-card__image-wrapper">
                                    <img
                                        src={imageUrl}
                                        alt={imageAlt}
                                        className="wagepoint-card__img"
                                        style={{ borderRadius: `${imageBorderRadius}px` }}
                                    />
                                    <Button
                                        onClick={onRemoveImage}
                                        isDestructive
                                        className="wagepoint-card__remove-image"
                                    >
                                        {__('Remove Image', 'wagepoint')}
                                    </Button>
                                </div>
                            ) : (
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            className="wagepoint-card__upload-button"
                                            variant="secondary"
                                        >
                                            {__('Upload Image', 'wagepoint')}
                                        </Button>
                                    )}
                                />
                            )}
                        </div>
                    </MediaUploadCheck>

                    <div className="wagepoint-card__content">
                        <RichText
                            tagName="h3"
                            className="wagepoint-card__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Card Title', 'wagepoint')}
                        />

                        <RichText
                            tagName="p"
                            className="wagepoint-card__description"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Card description...', 'wagepoint')}
                        />

                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            templateLock={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}