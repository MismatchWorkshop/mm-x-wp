import { useBlockProps, RichText } from '@wordpress/block-editor';
import Icon from '../../components/Icon';

export default function Save({ attributes }) {
    const { icon, title, description } = attributes;
    const blockProps = useBlockProps.save({
        className: 'metric'
    });

    return (
        <div {...blockProps}>
            <div className="metric__wrapper">
                <div className="metric__icon">
                    <Icon 
                        type={icon.type}
                        src={icon.src}
                        svg={icon.svg}
                        size={icon.size || 64}
                        backgroundColor={icon.backgroundColor}
                    />
                </div>
                <div className="metric__content">
                    <RichText.Content
                        tagName="div"
                        className="metric__title"
                        value={title}
                    />
                    <RichText.Content
                        tagName="div"
                        className="metric__description"
                        value={description}
                    />
                </div>
            </div>
        </div>
    );
}