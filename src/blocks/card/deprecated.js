import { useBlockProps, RichText } from '@wordpress/block-editor';

const deprecated = [
    // Version 1: Original card with hardcoded button
    {
        attributes: {
            imageUrl: {
                type: 'string',
                default: ''
            },
            imageId: {
                type: 'number'
            },
            imageAlt: {
                type: 'string',
                default: ''
            },
            title: {
                type: 'string',
                default: 'Card Title'
            },
            description: {
                type: 'string',
                default: 'Card description text goes here.'
            },
            buttonText: {
                type: 'string',
                default: 'Learn more'
            },
            buttonUrl: {
                type: 'string',
                default: ''
            },
            backgroundColor: {
                type: 'string',
                default: 'white'
            }
        },
        save({ attributes }) {
            const {
                imageUrl,
                imageAlt,
                title,
                description,
                buttonText,
                buttonUrl,
                backgroundColor,
            } = attributes;

            const blockProps = useBlockProps.save({
                style: {
                    backgroundColor: backgroundColor.startsWith('#') ? backgroundColor : 'transparent',
                },
            });

            return (
                <div {...blockProps}>
                    <div className="wagepoint-card">
                        {imageUrl && (
                            <div className="wagepoint-card__image">
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    className="wagepoint-card__img"
                                />
                            </div>
                        )}

                        <div className="wagepoint-card__content">
                            <RichText.Content
                                tagName="h3"
                                className="wagepoint-card__title"
                                value={title}
                                style={{ color: '#1F2937' }}
                            />

                            <RichText.Content
                                tagName="p"
                                className="wagepoint-card__description"
                                value={description}
                                style={{ color: '#1F2937' }}
                            />

                            {buttonUrl ? (
                                <a
                                    href={buttonUrl}
                                    className="wagepoint-card__button"
                                    style={{ color: '#1F2937', borderColor: '#1F2937' }}
                                >
                                    {buttonText} →
                                </a>
                            ) : (
                                <span
                                    className="wagepoint-card__button"
                                    style={{ color: '#1F2937', borderColor: '#1F2937' }}
                                >
                                    {buttonText} →
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
];

export default deprecated;