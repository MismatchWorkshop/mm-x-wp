import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

// Template: Box with quote icon, quote text, author info, and company logo
const TEMPLATE = [
    ['wagepoint/box', { 
        borderColor: 'primary', 
        containerBackground: 'white',
        className: 'is-style-border' 
    }, [
        // Quote icon (large quotation mark)
        ['core/paragraph', { 
            content: '&#8220;',
            className: 'testimonial__quote-icon',
            fontSize: 'xx-large'
        }],
        // Testimonial quote
        ['core/paragraph', { 
            placeholder: 'Enter testimonial quote...',
            className: 'testimonial__quote',
            fontSize: 'large'
        }],
        // Author info group
        ['core/group', { 
            className: 'testimonial__author',
            layout: { type: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }
        }, [
            // Left side: Author name and title
            ['core/group', { 
                className: 'author-info',
                layout: { type: 'flex', orientation: 'vertical' }
            }, [
                ['core/paragraph', { 
                    placeholder: 'Author Name',
                    className: 'author__name'
                }],
                ['core/paragraph', { 
                    placeholder: 'Job Title',
                    className: 'author__title'
                }]
            ]],
            // Right side: Company logo
            ['core/image', { 
                className: 'testimonial__company-logo',
                alt: 'Company Logo'
            }]
        ]]
    ]]
];

export default function Edit({ clientId, attributes, setAttributes }) {
    const { showCompanyLogo = true } = attributes;

    const blockProps = useBlockProps();

    // Get all descendant blocks
    const { allInnerBlocks } = useSelect((select) => {
        const { getBlock } = select('core/block-editor');
        const block = getBlock(clientId);
        
        // Flatten all nested blocks
        const flattenBlocks = (blocks) => {
            let flat = [];
            blocks.forEach(b => {
                flat.push(b);
                if (b.innerBlocks) {
                    flat = flat.concat(flattenBlocks(b.innerBlocks));
                }
            });
            return flat;
        };
        
        return {
            allInnerBlocks: block?.innerBlocks ? flattenBlocks(block.innerBlocks) : []
        };
    }, [clientId]);

    const { updateBlockAttributes } = useDispatch('core/block-editor');

    // Update company logo visibility when toggle changes
    useEffect(() => {
        if (allInnerBlocks.length === 0) return;

        // Find company logo
        const companyLogo = allInnerBlocks.find(block =>
            block.name === 'core/image' && 
            block.attributes.className?.includes('testimonial__company-logo')
        );

        if (companyLogo) {
            const currentClass = companyLogo.attributes.className || '';
            const hasHidden = currentClass.includes('is-hidden');
            
            if (showCompanyLogo && hasHidden) {
                // Remove is-hidden
                const newClass = currentClass.replace(/\s*is-hidden\s*/g, ' ').trim();
                updateBlockAttributes(companyLogo.clientId, { className: newClass });
            } else if (!showCompanyLogo && !hasHidden) {
                // Add is-hidden
                const newClass = `${currentClass} is-hidden`.trim();
                updateBlockAttributes(companyLogo.clientId, { className: newClass });
            }
        }

    }, [showCompanyLogo, allInnerBlocks.length, updateBlockAttributes]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Testimonial Options', 'wagepoint')}>
                    <ToggleControl
                        label={__('Show Company Logo', 'wagepoint')}
                        help={__('Display company logo in the bottom right', 'wagepoint')}
                        checked={showCompanyLogo}
                        onChange={(value) => setAttributes({ showCompanyLogo: value })}
                        __nextHasNoMarginBottom
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks 
                    template={TEMPLATE}
                    templateLock="all"
                />
            </div>
        </>
    );
}
