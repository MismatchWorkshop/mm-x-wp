import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { label, icon } = attributes;

    const blockProps = useBlockProps.save({
        className: 'wagepoint-panel',
        'data-label': label,
    });

    return (
        <div {...blockProps}>
            {/* Icon section */}
            {icon && (
                <div className="wagepoint-panel__icon-wrapper">
                    <div className="wagepoint-panel__icon">
                        <img src={icon} alt="" />
                    </div>
                </div>
            )}
            
            {/* InnerBlocks Content */}
            <InnerBlocks.Content />
        </div>
    );
}