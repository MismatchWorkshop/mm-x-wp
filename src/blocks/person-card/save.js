import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imageUrl, imageAlt, name, title, linkedInUrl, backgroundColor, headingLevel } = attributes;
    
    const blockProps = useBlockProps.save();
    const HeadingTag = `h${headingLevel}`;

    return (
        <div {...blockProps}>
            <div className="wagepoint-person-card" style={{ '--person-card-bg-color': backgroundColor }}>
                <div className="wagepoint-person-card__image-wrapper">
                    <div className="wagepoint-person-card__background"></div>
                    {imageUrl && (
                        <img 
                            src={imageUrl} 
                            alt={imageAlt || name}
                            className="wagepoint-person-card__image"
                        />
                    )}
                    {linkedInUrl && (
                        <a 
                            href={linkedInUrl}
                            className="wagepoint-person-card__linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
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
    );
}