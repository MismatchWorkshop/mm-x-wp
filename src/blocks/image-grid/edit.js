import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { image as imageIcon } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes }) {
    const { image1, image2, image3, image4 } = attributes;
    const blockProps = useBlockProps({
        className: 'wagepoint-image-grid',
    });

    const onSelectImage = (imageNumber) => (media) => {
        setAttributes({
            [`image${imageNumber}`]: {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
            },
        });
    };

    const onRemoveImage = (imageNumber) => () => {
        setAttributes({
            [`image${imageNumber}`]: null,
        });
    };

    const ImageUploader = ({ imageNumber, imageData, label }) => (
        <div className={`wagepoint-image-grid__item wagepoint-image-grid__item-${imageNumber}`}>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectImage(imageNumber)}
                    allowedTypes={['image']}
                    value={imageData?.id}
                    render={({ open }) => (
                        <>
                            {imageData ? (
                                <div className="wagepoint-image-grid__preview">
                                    <img src={imageData.url} alt={imageData.alt} />
                                    <div className="wagepoint-image-grid__actions">
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            size="small"
                                        >
                                            {__('Replace', 'wagepoint')}
                                        </Button>
                                        <Button
                                            onClick={onRemoveImage(imageNumber)}
                                            variant="secondary"
                                            size="small"
                                            isDestructive
                                        >
                                            {__('Remove', 'wagepoint')}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Placeholder
                                    icon={imageIcon}
                                    label={label}
                                    instructions={__('Upload an image or pick one from your media library.', 'wagepoint')}
                                >
                                    <Button onClick={open} variant="primary">
                                        {__('Select Image', 'wagepoint')}
                                    </Button>
                                </Placeholder>
                            )}
                        </>
                    )}
                />
            </MediaUploadCheck>
        </div>
    );

    return (
        <div {...blockProps}>
            <ImageUploader
                imageNumber={1}
                imageData={image1}
                label={__('Large Image (Left)', 'wagepoint')}
            />
            <div className="wagepoint-image-grid__small-images">
                <ImageUploader
                    imageNumber={2}
                    imageData={image2}
                    label={__('Small Image 1', 'wagepoint')}
                />
                <ImageUploader
                    imageNumber={3}
                    imageData={image3}
                    label={__('Small Image 2', 'wagepoint')}
                />
                <ImageUploader
                    imageNumber={4}
                    imageData={image4}
                    label={__('Small Image 3', 'wagepoint')}
                />
            </div>
        </div>
    );
}