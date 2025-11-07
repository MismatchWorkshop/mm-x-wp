<?php
/**
 * Title: Testimonials Carousel
 * Slug: wagepoint/testimonials-carousel
 * Categories: testimonials
 * Description: Client testimonials carousel with rounded border cards
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"backgroundColor":"light","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-light-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
    
    <!-- wp:group {"layout":{"type":"constrained","contentSize":"1200px"}} -->
    <div class="wp-block-group">
        
        <!-- wp:heading {"textAlign":"left","level":5,"fontSize":"small"} -->
        <h5 class="wp-block-heading has-text-align-left has-small-font-size">Client testimonials</h5>
        <!-- /wp:heading -->

        <!-- wp:heading {"textAlign":"left","fontSize":"x-large","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|30"}}}} -->
        <h2 class="wp-block-heading has-text-align-left has-x-large-font-size" style="margin-bottom:var(--wp--preset--spacing--30)">Cool companies. Cooler clients.</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"fontSize":"medium","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|60"}}}} -->
        <p class="has-medium-font-size" style="margin-bottom:var(--wp--preset--spacing--60)">Thousands of Canadian small businesses, bookkeepers, and accountants choose Wagepoint every payday.</p>
        <!-- /wp:paragraph -->

        <!-- wp:wagepoint/carousel {"slidesPerView":1,"slidesPerViewTablet":2,"slidesPerViewDesktop":3,"spaceBetween":32,"loop":true,"showNavigation":true} -->
        <div class="wp-block-wagepoint-carousel carousel-wrapper">
            <div class="swiper" data-slides-mobile="1" data-slides-tablet="2" data-slides-desktop="3" data-space-between="32" data-loop="true">
                <div class="swiper-wrapper">
                    
                    <!-- Testimonial 1 -->
                    <!-- wp:wagepoint/testimonial {"showCompanyLogo":true} -->
                    <div class="wp-block-wagepoint-testimonial">
                        <!-- wp:wagepoint/box {"borderColor":"primary","className":"is-style-border"} -->
                        <div class="wp-block-wagepoint-box box is-style-border" style="--box-color:var(--wp--preset--color--primary)">
                            
                            <!-- wp:paragraph {"className":"testimonial__quote-icon","fontSize":"xx-large"} -->
                            <p class="testimonial__quote-icon has-xx-large-font-size">&#8220;</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:paragraph {"className":"testimonial__quote","fontSize":"large"} -->
                            <p class="testimonial__quote has-large-font-size">No more worrying about T4s or ROEs or payroll remittances. Wagepoint takes care of it all, which almost feels like magic, and I can go back to focusing on my business.</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:group {"className":"testimonial__author","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
                            <div class="wp-block-group testimonial__author">
                                
                                <!-- wp:group {"className":"author-info","layout":{"type":"flex","orientation":"vertical"}} -->
                                <div class="wp-block-group author-info">
                                    <!-- wp:paragraph {"className":"author__name"} -->
                                    <p class="author__name"><strong>Carmen Narancsik</strong></p>
                                    <!-- /wp:paragraph -->

                                    <!-- wp:paragraph {"className":"author__title"} -->
                                    <p class="author__title">Job Title</p>
                                    <!-- /wp:paragraph -->
                                </div>
                                <!-- /wp:group -->

                                <!-- wp:image {"className":"testimonial__company-logo","sizeSlug":"full","linkDestination":"none"} -->
                                <figure class="wp-block-image size-full testimonial__company-logo"><img src="" alt="Chekkit Logo"/></figure>
                                <!-- /wp:image -->

                            </div>
                            <!-- /wp:group -->

                        </div>
                        <!-- /wp:wagepoint/box -->
                    </div>
                    <!-- /wp:wagepoint/testimonial -->

                    <!-- Testimonial 2 -->
                    <!-- wp:wagepoint/testimonial {"showCompanyLogo":true} -->
                    <div class="wp-block-wagepoint-testimonial">
                        <!-- wp:wagepoint/box {"borderColor":"primary","className":"is-style-border"} -->
                        <div class="wp-block-wagepoint-box box is-style-border" style="--box-color:var(--wp--preset--color--primary)">
                            
                            <!-- wp:paragraph {"className":"testimonial__quote-icon","fontSize":"xx-large"} -->
                            <p class="testimonial__quote-icon has-xx-large-font-size">&#8220;</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:paragraph {"className":"testimonial__quote","fontSize":"large"} -->
                            <p class="testimonial__quote has-large-font-size">Wagepoint has simplified our payroll process tremendously. The team support is outstanding and they're always there when we need them.</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:group {"className":"testimonial__author","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
                            <div class="wp-block-group testimonial__author">
                                
                                <!-- wp:group {"className":"author-info","layout":{"type":"flex","orientation":"vertical"}} -->
                                <div class="wp-block-group author-info">
                                    <!-- wp:paragraph {"className":"author__name"} -->
                                    <p class="author__name"><strong>Sarah Johnson</strong></p>
                                    <!-- /wp:paragraph -->

                                    <!-- wp:paragraph {"className":"author__title"} -->
                                    <p class="author__title">HR Manager</p>
                                    <!-- /wp:paragraph -->
                                </div>
                                <!-- /wp:group -->

                                <!-- wp:image {"className":"testimonial__company-logo","sizeSlug":"full","linkDestination":"none"} -->
                                <figure class="wp-block-image size-full testimonial__company-logo"><img src="" alt="Company Logo"/></figure>
                                <!-- /wp:image -->

                            </div>
                            <!-- /wp:group -->

                        </div>
                        <!-- /wp:wagepoint/box -->
                    </div>
                    <!-- /wp:wagepoint/testimonial -->

                    <!-- Testimonial 3 -->
                    <!-- wp:wagepoint/testimonial {"showCompanyLogo":true} -->
                    <div class="wp-block-wagepoint-testimonial">
                        <!-- wp:wagepoint/box {"borderColor":"primary","className":"is-style-border"} -->
                        <div class="wp-block-wagepoint-box box is-style-border" style="--box-color:var(--wp--preset--color--primary)">
                            
                            <!-- wp:paragraph {"className":"testimonial__quote-icon","fontSize":"xx-large"} -->
                            <p class="testimonial__quote-icon has-xx-large-font-size">&#8220;</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:paragraph {"className":"testimonial__quote","fontSize":"large"} -->
                            <p class="testimonial__quote has-large-font-size">As a bookkeeper, I recommend Wagepoint to all my clients. It's reliable, accurate, and makes my job so much easier.</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:group {"className":"testimonial__author","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
                            <div class="wp-block-group testimonial__author">
                                
                                <!-- wp:group {"className":"author-info","layout":{"type":"flex","orientation":"vertical"}} -->
                                <div class="wp-block-group author-info">
                                    <!-- wp:paragraph {"className":"author__name"} -->
                                    <p class="author__name"><strong>Michael Chen</strong></p>
                                    <!-- /wp:paragraph -->

                                    <!-- wp:paragraph {"className":"author__title"} -->
                                    <p class="author__title">Certified Bookkeeper</p>
                                    <!-- /wp:paragraph -->
                                </div>
                                <!-- /wp:group -->

                                <!-- wp:image {"className":"testimonial__company-logo","sizeSlug":"full","linkDestination":"none"} -->
                                <figure class="wp-block-image size-full testimonial__company-logo"><img src="" alt="Company Logo"/></figure>
                                <!-- /wp:image -->

                            </div>
                            <!-- /wp:group -->

                        </div>
                        <!-- /wp:wagepoint/box -->
                    </div>
                    <!-- /wp:wagepoint/testimonial -->

                    <!-- Testimonial 4 -->
                    <!-- wp:wagepoint/testimonial {"showCompanyLogo":true} -->
                    <div class="wp-block-wagepoint-testimonial">
                        <!-- wp:wagepoint/box {"borderColor":"primary","className":"is-style-border"} -->
                        <div class="wp-block-wagepoint-box box is-style-border" style="--box-color:var(--wp--preset--color--primary)">
                            
                            <!-- wp:paragraph {"className":"testimonial__quote-icon","fontSize":"xx-large"} -->
                            <p class="testimonial__quote-icon has-xx-large-font-size">&#8220;</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:paragraph {"className":"testimonial__quote","fontSize":"large"} -->
                            <p class="testimonial__quote has-large-font-size">The best decision we made for our growing team. Payroll used to take hours, now it's done in minutes.</p>
                            <!-- /wp:paragraph -->

                            <!-- wp:group {"className":"testimonial__author","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
                            <div class="wp-block-group testimonial__author">
                                
                                <!-- wp:group {"className":"author-info","layout":{"type":"flex","orientation":"vertical"}} -->
                                <div class="wp-block-group author-info">
                                    <!-- wp:paragraph {"className":"author__name"} -->
                                    <p class="author__name"><strong>Lisa Martinez</strong></p>
                                    <!-- /wp:paragraph -->

                                    <!-- wp:paragraph {"className":"author__title"} -->
                                    <p class="author__title">Business Owner</p>
                                    <!-- /wp:paragraph -->
                                </div>
                                <!-- /wp:group -->

                                <!-- wp:image {"className":"testimonial__company-logo","sizeSlug":"full","linkDestination":"none"} -->
                                <figure class="wp-block-image size-full testimonial__company-logo"><img src="" alt="Company Logo"/></figure>
                                <!-- /wp:image -->

                            </div>
                            <!-- /wp:group -->

                        </div>
                        <!-- /wp:wagepoint/box -->
                    </div>
                    <!-- /wp:wagepoint/testimonial -->

                </div>
            </div>
            
            <!-- Navigation -->
            <button class="swiper-button-prev" aria-label="Previous slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="swiper-button-next" aria-label="Next slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
        </div>
        <!-- /wp:wagepoint/carousel -->

        <!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}}} -->
        <div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--60)">
            <!-- wp:button {"className":"is-style-outline"} -->
            <div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button">See what our clients are up to →</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->

    </div>
    <!-- /wp:group -->

</div>
<!-- /wp:group -->