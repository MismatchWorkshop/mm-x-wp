/**
 * Carousel Module - TRULY FIXED
 * Initializes Swiper carousels with configuration from data attributes
 */

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Initialize all carousels on the page
 */
export function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-wrapper .swiper');
    
    if (carousels.length === 0) {
        return;
    }
    
    carousels.forEach((carousel) => {
        initSingleCarousel(carousel);
    });
}

/**
 * Initialize a single carousel instance
 */
function initSingleCarousel(carousel) {
    const slidesMobile = parseFloat(carousel.dataset.slidesMobile) || 1;
    const slidesTablet = parseFloat(carousel.dataset.slidesTablet) || 2;
    const slidesDesktop = parseFloat(carousel.dataset.slidesDesktop) || 3;
    const spaceBetween = parseInt(carousel.dataset.spaceBetween) || 24;
    const loop = carousel.dataset.loop === 'true';
    const centered = carousel.dataset.centered === 'true';
    
    // STEP 1: Wrap FIRST (before any duplication)
    wrapSlidesInSwiperSlide(carousel);
    
    // STEP 2: Then duplicate if needed for centered + loop
    if (centered && loop) {
        duplicateSlidesForLoop(carousel, 5);
    }
    
    // STEP 3: Initialize Swiper
    if (centered) {
        new Swiper(carousel, {
            modules: [Navigation, Pagination],
            slidesPerView: 1.5, // Shows center + partials
            spaceBetween: spaceBetween,
            centeredSlides: true,
            loop: loop,
            initialSlide: 0,
            
            navigation: {
                nextEl: carousel.parentElement.querySelector('.swiper-button-next'),
                prevEl: carousel.parentElement.querySelector('.swiper-button-prev'),
            },
            
            pagination: {
                el: carousel.parentElement.querySelector('.swiper-pagination'),
                clickable: true,
            },
            
            breakpoints: {
                600: {
                    slidesPerView: 1.5,
                },
                1024: {
                    slidesPerView: 1.5,
                },
            },
        });
    } else {
        new Swiper(carousel, {
            modules: [Navigation],
            slidesPerView: slidesMobile,
            spaceBetween: spaceBetween,
            loop: loop,
            
            navigation: {
                nextEl: carousel.parentElement.querySelector('.swiper-button-next'),
                prevEl: carousel.parentElement.querySelector('.swiper-button-prev'),
            },
            
            breakpoints: {
                600: {
                    slidesPerView: slidesTablet,
                },
                1024: {
                    slidesPerView: slidesDesktop,
                },
            },
        });
    }
}

/**
 * Duplicate slides if there aren't enough for loop mode
 * THIS ONLY DUPLICATES .swiper-slide elements (already wrapped)
 */
function duplicateSlidesForLoop(carousel, minSlides) {
    const wrapper = carousel.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    
    // Get already-wrapped slides
    const slides = Array.from(wrapper.querySelectorAll(':scope > .swiper-slide'));
    
    if (slides.length < minSlides) {
        const slidesToAdd = minSlides - slides.length;
        for (let i = 0; i < slidesToAdd; i++) {
            const slideIndex = i % slides.length;
            const clonedSlide = slides[slideIndex].cloneNode(true);
            wrapper.appendChild(clonedSlide);
        }
    }
}

/**
 * Wrap direct children in swiper-slide divs
 * CRITICAL: This must run BEFORE duplication
 */
function wrapSlidesInSwiperSlide(carousel) {
    const wrapper = carousel.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    
    // Get only direct children that aren't already wrapped
    const children = Array.from(wrapper.children).filter(
        child => !child.classList.contains('swiper-slide')
    );
    
    // Wrap each child
    children.forEach(child => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        // Insert slide before child, then move child into slide
        wrapper.insertBefore(slide, child);
        slide.appendChild(child);
    });
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }
}