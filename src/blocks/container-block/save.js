import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { COLOR_SYSTEM } from '../../color-system';

const SPACING_OPTIONS = [
    { label: 'Auto', value: "auto" },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }
];

export default function save({ attributes }) {
    const { containerBackground, topSpacing, bottomSpacing } = attributes;

    const getBlockClass = () => { 
        return [
            "container",
            topSpacing !=="auto" ? `top-${topSpacing}` : "",
            bottomSpacing !=="auto" ? `bottom-${bottomSpacing}` : ""
        ].join(" ");
    }
    
    const blockProps = useBlockProps.save({
        className: getBlockClass()
    });

    const containerStyles = {
        backgroundColor: COLOR_SYSTEM.backgrounds[containerBackground]?.value || 'transparent'
    };

    return (
        <div {...blockProps}>
            <div className="container__content" style={containerStyles}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}