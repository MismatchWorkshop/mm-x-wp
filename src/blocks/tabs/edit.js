import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import ContextualColorPicker from '../../components/ContextualColorPicker';
import { getContextualColor } from '../../color-system';

const ALLOWED_BLOCKS = ['wagepoint/panel'];

export default function Edit({ attributes, setAttributes, clientId, context }) {
    const { contentBackgroundColor } = attributes;
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const containerBackground = context['wagepoint/containerBackground'] || 'white';

    const panelBlocks = useSelect(
        (select) => {
            const { getBlock } = select('core/block-editor');
            const block = getBlock(clientId);
            return block ? block.innerBlocks : [];
        },
        [clientId]
    );

    const { updateBlockAttributes } = useDispatch('core/block-editor');

    // USE PANELBACKGROUND ROLE - Returns color key like "white"
    const resolvedBgColor = contentBackgroundColor === 'auto' 
        ? getContextualColor(containerBackground, 'panelBackground')
        : contentBackgroundColor;

    useEffect(() => {
        panelBlocks.forEach((panel) => {
            if (panel && panel.clientId) {
                updateBlockAttributes(panel.clientId, {
                    'data-parent-bg-color': resolvedBgColor
                });
            }
        });
    }, [resolvedBgColor, panelBlocks, updateBlockAttributes]);

    const blockProps = useBlockProps({
        className: 'wagepoint-tabs-editor',
    });

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
        
        setTimeout(() => {
            const panelBlock = panelBlocks[index];
            if (panelBlock) {
                const panelElement = document.querySelector(`[data-block="${panelBlock.clientId}"]`);
                if (panelElement) {
                    panelElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }, 100);
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Tabs Settings', 'wagepoint')}>
                    <ContextualColorPicker
                        label={__('Content Background Color', 'wagepoint')}
                        value={contentBackgroundColor}
                        onChange={(value) => setAttributes({ contentBackgroundColor: value })}
                        role="panelBackground"
                        containerBackground={containerBackground}
                    />
                    <p style={{ 
                        fontSize: '12px', 
                        color: '#666', 
                        marginTop: '8px',
                        fontStyle: 'italic' 
                    }}>
                        {contentBackgroundColor === 'auto' 
                            ? __('Auto adapts based on the parent Container background.', 'wagepoint')
                            : __('Sets the background color for tab content panels.', 'wagepoint')
                        }
                    </p>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div 
                    className="wagepoint-tabs__nav-editor" 
                    role="tablist"
                    style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '20px',
                        borderBottom: '2px solid #e0e0e0',
                        paddingBottom: '0'
                    }}
                >
                    {panelBlocks.map((panel, index) => {
                        const label = panel.attributes.label || `Panel ${index + 1}`;
                        const isActive = index === activeTabIndex;
                        
                        return (
                            <button
                                key={panel.clientId}
                                className={`wagepoint-tabs__tab ${isActive ? 'is-active' : ''}`}
                                onClick={() => handleTabClick(index)}
                                role="tab"
                                aria-selected={isActive}
                                style={{
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderBottom: isActive ? '3px solid #2271b1' : '3px solid transparent',
                                    background: isActive ? '#f0f0f0' : 'transparent',
                                    color: isActive ? '#1e1e1e' : '#666',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: isActive ? '600' : '400',
                                    transition: 'all 0.2s',
                                    marginBottom: '-2px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.target.style.background = '#f9f9f9';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.target.style.background = 'transparent';
                                    }
                                }}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {panelBlocks.length === 0 && (
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        background: '#f0f0f0',
                        border: '2px dashed #ccc',
                        borderRadius: '4px',
                        margin: '20px 0'
                    }}>
                        <p style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '600' }}>
                            {__('Add Panel blocks to create tabs', 'wagepoint')}
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                            {__('Click the + button below to add your first panel', 'wagepoint')}
                        </p>
                    </div>
                )}

                <div 
                    className={`wagepoint-tabs__panels-container-editor bg-${resolvedBgColor}`}
                    style={{
                        minHeight: '200px',
                        position: 'relative',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '2px dashed #ddd'
                    }}
                >
                    <style>
                        {`
                            .wagepoint-tabs-editor .wagepoint-panel {
                                display: none;
                            }
                            
                            .wagepoint-tabs-editor .wagepoint-panel:nth-child(${activeTabIndex + 1}) {
                                display: block;
                            }
                        `}
                    </style>
                    
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={[
                            ['wagepoint/panel', { label: 'Tab 1' }],
                            ['wagepoint/panel', { label: 'Tab 2' }],
                        ]}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>

                {panelBlocks.length > 0 && (
                    <div style={{
                        marginTop: '10px',
                        padding: '8px 12px',
                        background: '#e7f5ff',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#0066a2',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>
                            Editing: <strong>{panelBlocks[activeTabIndex]?.attributes.label || `Panel ${activeTabIndex + 1}`}</strong>
                            {' '}({activeTabIndex + 1} of {panelBlocks.length})
                        </span>
                        <span style={{ fontSize: '11px', color: '#666' }}>
                            💡 Click tabs above to switch between panels
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}