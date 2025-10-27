import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import ContextualColorPicker from '../../components/ContextualColorPicker';

const ALLOWED_BLOCKS = ['wagepoint/mega-menu-item'];

const TEMPLATE = [
    ['wagepoint/mega-menu-item', {}],
    ['wagepoint/mega-menu-item', {}],
    ['wagepoint/mega-menu-item', {}],
];

export default function Edit({ attributes, setAttributes }) {
    const { categoryHeader, columns, backgroundColor } = attributes;

    const blockProps = useBlockProps({ 
        className: `mega-menu-panel bg-${backgroundColor || 'white'}`,
        style: {
            '--mega-menu-columns': String(columns)
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Panel Settings">
                    <RangeControl
                        label="Columns"
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={3}
                    />
                    <ContextualColorPicker
                        label="Background Color"
                        value={backgroundColor}
                        onChange={(color) => setAttributes({ backgroundColor: color })}
                        containerBackground="white"
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {categoryHeader !== undefined && (
                    <RichText
                        tagName="div"
                        value={categoryHeader}
                        onChange={(value) => setAttributes({ categoryHeader: value })}
                        placeholder="CATEGORY HEADER (optional)"
                        className="mega-menu-panel__header"
                    />
                )}
                <div 
                    className="mega-menu-panel__items"
                    key={columns}
                >
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                    />
                </div>
            </div>
        </>
    );
}