import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        imageUrl,
        imageAlt,
        imageBorderRadius,
        title,
        description,
    } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <div className="wagepoint-card">
                {imageUrl && (
                    <div className="wagepoint-card__image">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="wagepoint-card__img"
                            style={{ borderRadius: `${imageBorderRadius}px` }}
                        />
                    </div>
                )}

                <div className="wagepoint-card__content">
                    <RichText.Content
                        tagName="h3"
                        className="wagepoint-card__title"
                        value={title}
                    />

                    <RichText.Content
                        tagName="p"
                        className="wagepoint-card__description"
                        value={description}
                    />

                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}