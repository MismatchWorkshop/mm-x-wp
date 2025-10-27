import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { categoryHeader, columns, backgroundColor } = attributes;

    const blockProps = useBlockProps.save({ 
        className: `mega-menu-panel bg-${backgroundColor || 'white'}`,
        style: {
            '--mega-menu-columns': String(columns) 
        }
    });

    return (
        <div {...blockProps}>
            {categoryHeader && (
                <RichText.Content
                    tagName="div"
                    value={categoryHeader}
                    className="mega-menu-panel__header"
                />
            )}
            <div className="mega-menu-panel__items">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}