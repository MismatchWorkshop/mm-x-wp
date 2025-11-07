import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['core/columns'];

const TEMPLATE = [
    ['core/columns', {
        className: 'wp-block-wagepoint-banner__columns'
    }, [
        ['core/column', {
            className: 'wp-block-wagepoint-banner__content',
            width: '50%'
        }, [
            ['core/heading', {
                level: 1,
                content: 'Ready to run payroll the easy way?',
                style: {
                    typography: {
                        fontSize: '3rem',
                        lineHeight: '1.2'
                    }
                }
            }],
            ['core/paragraph', {
                content: 'Join thousands of Canadian businesses already using Wagepoint.',
                style: {
                    typography: {
                        fontSize: '1.25rem'
                    },
                    spacing: {
                        margin: {
                            top: '1.5rem',
                            bottom: '2rem'
                        }
                    }
                }
            }],
            ['core/buttons', {}, [
                ['core/button', {
                    text: 'Book a Demo →',
                    style: {
                        border: {
                            radius: '9999px'
                        },
                        spacing: {
                            padding: {
                                top: '0.75rem',
                                bottom: '0.75rem',
                                left: '2rem',
                                right: '2rem'
                            }
                        }
                    }
                }],
                ['core/button', {
                    text: 'Free Trial →',
                    style: {
                        border: {
                            radius: '9999px'
                        },
                        spacing: {
                            padding: {
                                top: '0.75rem',
                                bottom: '0.75rem',
                                left: '2rem',
                                right: '2rem'
                            }
                        }
                    }
                }]
            ]]
        ]],
        ['core/column', {
            className: 'wp-block-wagepoint-banner__image',
            width: '50%'
        }, [
            ['core/image', {
                url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200',
                alt: 'Professional business person'
            }]
        ]]
    ]]
];

export default function Edit({ attributes, setAttributes }) {
    const { backgroundColor } = attributes;
    
    const blockProps = useBlockProps({
        className: `bg-${backgroundColor}`,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background', 'wagepoint')} initialOpen={true}>
                    <SelectControl
                        label={__('Background Color', 'wagepoint')}
                        value={backgroundColor}
                        options={[
                            { label: 'Ledger Blue', value: 'ledger-blue' },
                            { label: 'Payday Blue', value: 'payday-blue' },
                            { label: 'PTO Yellow', value: 'pto-yellow' },
                            { label: 'Ledger Blue Light', value: 'ledger-blue-tint-2' },
                            { label: 'Payday Blue Subtle', value: 'payday-blue-tint-2' },
                            { label: 'White', value: 'white' },
                        ]}
                        onChange={(value) => setAttributes({ backgroundColor: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    templateLock={false}
                />
            </div>
        </>
    );
}