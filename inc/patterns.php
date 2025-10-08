<?php 

remove_theme_support('core-block-patterns');

function register_hero_pattern_category() {
    register_block_pattern_category(
        'hero',
        array( 
            'label' => __('Hero', 'textdomain'),
            'description' => __('Hero sections and landing page headers', 'textdomain')
        )
    );
}


function register_custom_blocks() {
    register_block_pattern('wagepoint/hero-with-metrics', [
        'title' => 'Hero Section with Metrics',
        'content' => '<!-- wp:custom/container {"containerBackground":"white"} -->
        <div class="wp-block-custom-container container"><div class="container__content" style="background-color:#ffffff"><!-- wp:columns -->
    <div class="wp-block-columns"><!-- wp:column -->
    <div class="wp-block-column"><!-- wp:paragraph -->
    <p>Text</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:column --></div>
    <!-- /wp:columns --></div></div>
    <!-- /wp:custom/container -->'
    ]);


    register_block_pattern(
            'hero/background-media',
            array(
                'title'         => __('Hero - Background Media', 'custom-blocks'),
                'description'   => __('A hero section with background image, overlay, and call-to-action buttons', 'custom-blocks'),
                'categories'    => array('hero'),
                'keywords'      => array('hero', 'banner', 'landing', 'payroll', 'cta'),
                'content'       => '
    <!-- wp:group {"className":"custom-hero-section"} -->
    <div class="wp-block-group custom-hero-section">
    <!-- wp:cover {"url":"","id":0,"dimRatio":70,"overlayColor":"black","minHeight":600,"isDark":true,"align":"full"} -->
    <div class="wp-block-cover alignfull is-dark has-black-background-color has-background-dim-70 has-background-dim" style="min-height:600px">
        <span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-70 has-background-dim"></span>
        
        <!-- wp:group {"layout":{"type":"constrained","contentSize":"1200px"}} -->
        <div class="wp-block-group">
            
            <!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"}}}} -->
            <div class="wp-block-columns are-vertically-aligned-center" style="padding-top:4rem;padding-right:2rem;padding-bottom:4rem;padding-left:2rem">
                
                <!-- wp:column {"verticalAlignment":"center","width":"60%"} -->
                <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">
                    
                    <!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"4rem","fontStyle":"normal","fontWeight":"700","lineHeight":"1.1"},"color":{"text":"#ffffff"},"spacing":{"margin":{"bottom":"1rem"}}}} -->
                    <h1 class="wp-block-heading has-text-color" style="color:#ffffff;margin-bottom:1rem;font-size:4rem;font-style:normal;font-weight:700;line-height:1.1">Payroll,<br>the easy way</h1>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph {"style":{"typography":{"fontSize":"1.25rem"},"color":{"text":"rgba(255,255,255,0.9)"},"spacing":{"margin":{"bottom":"2rem"}}}} -->
                    <p class="has-text-color" style="color:rgba(255,255,255,0.9);margin-bottom:2rem;font-size:1.25rem">Your all-in-one payroll partner for simple, accurate, on-time paydays.</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:buttons {"style":{"spacing":{"blockGap":"1rem"}}} -->
                    <div class="wp-block-buttons">
                        <!-- wp:button {"backgroundColor":"white","textColor":"black","style":{"border":{"radius":"50px"},"typography":{"fontWeight":"500"},"spacing":{"padding":{"left":"1.5rem","right":"1.5rem","top":"0.75rem","bottom":"0.75rem"}}}} -->
                        <div class="wp-block-button"><a class="wp-block-button__link has-black-color has-white-background-color has-text-color has-background wp-element-button" style="border-radius:50px;padding-top:0.75rem;padding-right:1.5rem;padding-bottom:0.75rem;padding-left:1.5rem;font-weight:500">Book a Demo →</a></div>
                        <!-- /wp:button -->
                        
                        <!-- wp:button {"backgroundColor":"#4a90e2","style":{"border":{"radius":"50px"},"typography":{"fontWeight":"500"},"spacing":{"padding":{"left":"1.5rem","right":"1.5rem","top":"0.75rem","bottom":"0.75rem"}},"color":{"text":"#ffffff"}}} -->
                        <div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" style="border-radius:50px;color:#ffffff;background-color:#4a90e2;padding-top:0.75rem;padding-right:1.5rem;padding-bottom:0.75rem;padding-left:1.5rem;font-weight:500">Free Trial →</a></div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                    
                </div>
                <!-- /wp:column -->
                
                <!-- wp:column {"width":"40%"} -->
                <div class="wp-block-column" style="flex-basis:40%">
                    <!-- wp:spacer {"height":"1px"} -->
                    <div style="height:1px" aria-hidden="true" class="wp-block-spacer"></div>
                    <!-- /wp:spacer -->
                </div>
                <!-- /wp:column -->
                
            </div>
            <!-- /wp:columns -->
            
        </div>
        <!-- /wp:group -->
        
    </div>
    <!-- /wp:cover -->
    </div>
    <!-- /wp:group -->',
            )
    );
}


add_action('init', 'register_hero_pattern_category');
add_action('init', 'register_custom_blocks');