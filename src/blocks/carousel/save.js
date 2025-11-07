import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        slidesPerView,
        slidesPerViewTablet,
        slidesPerViewDesktop,
        spaceBetween,
        showNavigation,
        loop,
        centered,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'carousel-wrapper',
    });

    return (
        <div {...blockProps}>
            <div 
                className="swiper"
                data-slides-mobile={slidesPerView}
                data-slides-tablet={slidesPerViewTablet}
                data-slides-desktop={slidesPerViewDesktop}
                data-space-between={spaceBetween}
                data-loop={loop}
                data-centered={centered}
            >
                <div className="swiper-wrapper">
                    <InnerBlocks.Content />
                </div>
            </div>
            
            {/* Pagination dots - shown for centered carousels */}
            {centered && (
                <div className="swiper-pagination"></div>
            )}
            
            {showNavigation && (
                <>
                    <button 
                        className="swiper-button-prev" 
                        aria-label="Previous slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button 
                        className="swiper-button-next" 
                        aria-label="Next slide"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}