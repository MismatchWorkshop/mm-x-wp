import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { alignment } = attributes;

    const blockProps = useBlockProps.save({
        className: `wp-block-buttons is-content-justification-${alignment}`,
    });

    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;
}