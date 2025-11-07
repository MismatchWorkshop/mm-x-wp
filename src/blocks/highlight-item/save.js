import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Icon from '../../components/Icon';

export default function save({ attributes }) {
    const { icon } = attributes;
    const blockProps = useBlockProps.save({
        className: 'highlight-item'
    });

    return (
        <div {...blockProps}>
            {icon && icon.svg && (
                <Icon
                    type={icon.type || 'svg'}
                    src={icon.src}
                    svg={icon.svg}
                    backgroundColor={icon.backgroundColor}
                    size={icon.size}
                />
            )}
            <InnerBlocks.Content />
        </div>
    );
}