import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InnerBlocks,
    InspectorControls,
    BlockControls,
    AlignmentToolbar
} from '@wordpress/block-editor';
import { 
    PanelBody,
    SelectControl
} from '@wordpress/components';

const CONTENT_WIDTH_OPTIONS = [
    { label: 'Full Width', value: 'full' },
    { label: 'Wide', value: 'wide' },
    { label: 'Medium', value: 'medium' },
    { label: 'Narrow', value: 'narrow' }
];

const ALIGNMENT_OPTIONS = [
    { label: 'Inherit from Container', value: 'inherit' },
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' }
];

// Template for InnerBlocks
const INNER_BLOCKS_TEMPLATE = [
    ['wagepoint/meta-heading', { 
        content: 'Meta Heading',
        level: 6,
        backgroundColor: 'primary'
    }],
    ['wagepoint/heading', {
        level: 2,
        size: 'inherit',
        content: '',
        placeholder: 'Main heading...'  // Custom placeholder!
    }],
    ['core/paragraph', { 
        placeholder: 'Body text...'
    }],
    ['wagepoint/buttons', {}, [
        ['wagepoint/button', { text: 'Get Started' }]
    ]]
];


const ALLOWED_BLOCKS = [
    'wagepoint/meta-heading',
    'wagepoint/heading',  
    'core/paragraph',
    'wagepoint/buttons'
];

export default function Edit({ attributes, setAttributes }) {
    const { contentWidth, textAlignment } = attributes;

    const blockProps = useBlockProps({
        className: [
            'copy-block',
            `width-${contentWidth}`,
            textAlignment !== 'inherit' ? `align-${textAlignment}` : ''
        ].filter(Boolean).join(' ')
    });

    return (
        <>
            <BlockControls>
                <AlignmentToolbar
                    value={textAlignment === 'inherit' ? undefined : textAlignment}
                    onChange={(value) => setAttributes({ textAlignment: value || 'inherit' })}
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Layout', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Content Width', 'wagepoint')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        options={CONTENT_WIDTH_OPTIONS}
                    />
                    
                    <SelectControl
                        label={__('Text Alignment', 'wagepoint')}
                        value={textAlignment}
                        onChange={(value) => setAttributes({ textAlignment: value })}
                        options={ALIGNMENT_OPTIONS}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={INNER_BLOCKS_TEMPLATE}
                    templateLock={false}
                />
            </div>
        </>
    );
}