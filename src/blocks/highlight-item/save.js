import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Icon from '../../components/Icon';

export default function save({ attributes }) {
    const { icon, title, description } = attributes;
    const blockProps = useBlockProps.save({
        className: 'highlight-item'
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}