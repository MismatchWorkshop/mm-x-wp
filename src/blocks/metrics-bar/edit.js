import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import ContextualColorPicker from '../../components/ContextualColorPicker';
import { getContextualColor } from '../../color-system';

export default function Edit({ attributes, setAttributes, context, clientId }) {
    const { heading, lineColor } = attributes;
    
    // Get container background from context with fallback
    let containerBackground = context['wagepoint/containerBackground'] || 'white';
    
    // Fallback: If context seems stale, traverse up to find parent container
    const parentContainerBg = useSelect((select) => {
        const { getBlockParents, getBlock } = select('core/block-editor');
        const parents = getBlockParents(clientId);
        
        for (const parentId of parents) {
            const parentBlock = getBlock(parentId);
            if (parentBlock?.name === 'wagepoint/container') {
                return parentBlock.attributes.containerBackground;
            }
        }
        return null;
    }, [clientId]);
    
    if (parentContainerBg) {
        containerBackground = parentContainerBg;
    }
    const containerRef = useRef(null);
    const [svgPath, setSvgPath] = useState('');
    
    // Resolve the actual color for display
    const resolvedLineColor = lineColor === 'auto' 
        ? getContextualColor(containerBackground, 'accent')
        : lineColor;
    
    const blockProps = useBlockProps({
        className: 'metrics-bar-block',
    });

    // Template with 3 default metrics
    const TEMPLATE = [
        ['wagepoint/metric', {
            icon: {
                type: 'svg',
                svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
                backgroundColor: 'auto',
                size: 56
            },
            value: '99.9%',
            label: 'uptime'
        }],
        ['wagepoint/metric', {
            icon: {
                type: 'svg',
                svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>',
                backgroundColor: 'auto',
                size: 56
            },
            value: '123,567',
            label: 'payrolls processed monthly'
        }],
        ['wagepoint/metric', {
            icon: {
                type: 'svg',
                svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
                backgroundColor: 'auto',
                size: 56
            },
            value: '+51',
            label: 'NPS score'
        }],
    ];

    // Calculate SVG path dynamically
useEffect(() => {
    const updatePath = () => {
        if (!containerRef.current) return;
        
        const metricsBar = containerRef.current;
        const container = metricsBar.closest('.wp-block-wagepoint-container');
        if (!container) {
            console.log('❌ No container found');
            return;
        }
        
        const splitSection = container.querySelector('.wp-block-wagepoint-split-section');
        if (!splitSection) {
            console.log('❌ No split section found');
            // No split section, draw horizontal line
            const metricsRect = metricsBar.getBoundingClientRect();
            const endY = 28; // Center of 56px icon
            setSvgPath(`M 0 ${endY} L ${metricsRect.width} ${endY}`);
            return;
        }
        
        // Find the media column using the actual class from split-section
        console.log('🔍 Looking for media column in split section', splitSection);
        const mediaColumn = splitSection.querySelector('.split-section__media');
        if (!mediaColumn) {
            console.log('❌ No media column found');
            return;
        }
        
        // Look for the first metric's icon wrapper
        const firstMetric = metricsBar.querySelector('.wp-block-icon');
        if (!firstMetric) {
            console.log('❌ No metric icon found');
            return;
        }
        
        const mediaRect = mediaColumn.getBoundingClientRect();
        const metricsRect = metricsBar.getBoundingClientRect();
        const firstMetricRect = firstMetric.getBoundingClientRect();
        
        // Start point: center of first metric icon
        const startX = firstMetricRect.left + (firstMetricRect.width / 2) - metricsRect.left;
        const startY = firstMetricRect.top + (firstMetricRect.height / 2) - metricsRect.top;
        
        // End point: bottom-right of media
        const endX = mediaRect.right - metricsRect.left;
        const endY = mediaRect.bottom - metricsRect.top;
        
        const cornerRadius = 60;
        
        // Path goes: right from metric, curve up, then up to image
        const path = `M ${startX} ${startY} L ${endX - cornerRadius} ${startY} Q ${endX} ${startY}, ${endX} ${startY - cornerRadius} L ${endX} ${endY}`;
        
        console.log('✅ Path calculated:', path);
        setSvgPath(path);
    };
    
    // Initial calculation with delay
    const initialTimeout = setTimeout(updatePath, 100);
    
    // Recalculate on window resize
    window.addEventListener('resize', updatePath);
    
    // Recalculate when blocks change
    const observer = new MutationObserver(() => {
        setTimeout(updatePath, 50);
    });
    
    if (containerRef.current) {
        const observeTarget = containerRef.current.closest('.wp-block-wagepoint-container') || containerRef.current.parentElement;
        if (observeTarget) {
            observer.observe(observeTarget, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    }
    
    return () => {
        window.removeEventListener('resize', updatePath);
        observer.disconnect();
        clearTimeout(initialTimeout);
    };
}, []);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Metrics Bar Settings', 'wagepoint')} initialOpen={true}>
                    <TextControl
                        label={__('Section Heading', 'wagepoint')}
                        value={heading}
                        onChange={(heading) => setAttributes({ heading })}
                        placeholder={__('Wagepoint by the numbers', 'wagepoint')}
                        help={__('Optional heading above the metrics', 'wagepoint')}
                    />
                    
                    <div style={{ marginTop: '16px' }}>
                        <ContextualColorPicker
                            label={__('Line Color', 'wagepoint')}
                            value={lineColor}
                            onChange={(lineColor) => setAttributes({ lineColor })}
                            role="accent"
                            containerBackground={containerBackground}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} ref={containerRef}>
                {heading && (
                    <RichText
                        tagName="div"
                        className="metrics-bar-heading"
                        value={heading}
                        onChange={(heading) => setAttributes({ heading })}
                        placeholder={__('Wagepoint by the numbers', 'wagepoint')}
                    />
                )}
                
                <div className="metrics-bar-container">
                    {svgPath && (
                        <svg 
                            className="metrics-bar-line-svg" 
                            data-line-color={lineColor || 'auto'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                                overflow: 'visible'
                            }}
                        >
                            <path 
                                d={svgPath} 
                                stroke={resolvedLineColor} 
                                strokeWidth="2" 
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                    <div className="metrics-bar-items">
                        <InnerBlocks
                            allowedBlocks={['wagepoint/metric']}
                            template={TEMPLATE}
                            templateLock="insert"
                            orientation="horizontal"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}