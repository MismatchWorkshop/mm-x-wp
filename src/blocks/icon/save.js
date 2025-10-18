import Icon from '../../components/Icon';

export default function save({ attributes }) {
    const { 
        iconType, 
        iconSrc, 
        iconSvg, 
        iconBackgroundColor, 
        iconSize,
        alignment
    } = attributes;

    const alignmentClass = alignment ? `has-text-align-${alignment}` : '';

    return (
        <div className={`wp-block-wagepoint-icon ${alignmentClass}`}>
            <Icon 
                type={iconType}
                src={iconSrc}
                svg={iconSvg}
                backgroundColor={iconBackgroundColor}
                size={iconSize}
                borderRadius="20px"
            />
        </div>
    );
}