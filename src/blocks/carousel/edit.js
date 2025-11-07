import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { 
        showNavigation,
        centered,
        slidesPerView,
        slidesPerViewTablet,
        slidesPerViewDesktop,
        spaceBetween,
        loop
    } = attributes;

    const blockProps = useBlockProps({
        className: 'carousel',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Carousel Settings', 'wagepoint')}>
                    <ToggleControl
                        label={__('Show Navigation Arrows', 'wagepoint')}
                        checked={showNavigation}
                        onChange={(value) => setAttributes({ showNavigation: value })}
                    />
                    <ToggleControl
                        label={__('Center Active Slide', 'wagepoint')}
                        checked={centered}
                        onChange={(value) => setAttributes({ centered: value })}
                        help={__('When enabled, uses fixed slide width and centers the active slide', 'wagepoint')}
                    />
                    <ToggleControl
                        label={__('Loop Infinitely', 'wagepoint')}
                        checked={loop}
                        onChange={(value) => setAttributes({ loop: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Slides Per View', 'wagepoint')} initialOpen={false}>
                    <RangeControl
                        label={__('Mobile', 'wagepoint')}
                        value={slidesPerView}
                        onChange={(value) => setAttributes({ slidesPerView: value })}
                        min={1}
                        max={4}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Tablet (≥600px)', 'wagepoint')}
                        value={slidesPerViewTablet}
                        onChange={(value) => setAttributes({ slidesPerViewTablet: value })}
                        min={1}
                        max={4}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Desktop (≥1024px)', 'wagepoint')}
                        value={slidesPerViewDesktop}
                        onChange={(value) => setAttributes({ slidesPerViewDesktop: value })}
                        min={1}
                        max={6}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Space Between (px)', 'wagepoint')}
                        value={spaceBetween}
                        onChange={(value) => setAttributes({ spaceBetween: value })}
                        min={0}
                        max={64}
                        step={4}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="carousel__inner">
                    <InnerBlocks
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
                {showNavigation && (
                    <div className="carousel__navigation">
                        <button className="carousel-nav carousel-nav--prev">
                            <span>←</span>
                        </button>
                        <button className="carousel-nav carousel-nav--next">
                            <span>→</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}