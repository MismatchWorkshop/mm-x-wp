import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { image1, image2, image3, image4 } = attributes;
    const blockProps = useBlockProps.save({
        className: 'wagepoint-image-grid',
    });

    return (
        <div {...blockProps}>
            {image1 && (
                <div className="wagepoint-image-grid__item wagepoint-image-grid__item-1">
                    <img src={image1.url} alt={image1.alt} loading="lazy" />
                </div>
            )}
            <div className="wagepoint-image-grid__small-images">
                {image2 && (
                    <div className="wagepoint-image-grid__item wagepoint-image-grid__item-2">
                        <img src={image2.url} alt={image2.alt} loading="lazy" />
                    </div>
                )}
                {image3 && (
                    <div className="wagepoint-image-grid__item wagepoint-image-grid__item-3">
                        <img src={image3.url} alt={image3.alt} loading="lazy" />
                    </div>
                )}
                {image4 && (
                    <div className="wagepoint-image-grid__item wagepoint-image-grid__item-4">
                        <img src={image4.url} alt={image4.alt} loading="lazy" />
                    </div>
                )}
            </div>
        </div>
    );
}