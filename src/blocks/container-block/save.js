import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        outerBackground,
        spacing,
        width,
        containerBackground,
        padding,
        contentWidth,
        textAlignment
    } = attributes;

    const outerClassName = [
        'wp-block-wagepoint-container',
        `outer-bg-${outerBackground}`,
        `spacing-${spacing}`
    ].filter(Boolean).join(' ');

    const blockProps = useBlockProps.save({
        className: outerClassName
    });

    const innerClassName = [
        'container__inner',
        `width-${width}`,
        `bg-${containerBackground}`,
        `padding-${padding}`
    ].filter(Boolean).join(' ');

    const contentClassName = [
        'container__content',
        `content-width-${contentWidth}`,
        `align-${textAlignment}`
    ].filter(Boolean).join(' ');

    return (
        <div {...blockProps}>
            <div className={innerClassName} data-bg={containerBackground}>
                <div className={contentClassName}>
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}