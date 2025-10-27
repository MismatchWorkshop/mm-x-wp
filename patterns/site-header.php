<?php
/**
 * Title: Site Header
 * Slug: wagepoint/site-header
 * Categories: wagepoint-header
 * Description: Wagepoint-style header with dropdown navigation and CTA buttons
 */
?>
<!-- wp:group {"className":"site-header"} -->
<div class="wp-block-group site-header">
    <!-- wp:group {"className":"header-inner","layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group header-inner">
        <!-- wp:site-logo {"width":150} /-->
        
        <!-- wp:navigation {"className":"is-style-wagepoint-nav"} /-->
        
        <!-- wp:group {"className":"header-actions","layout":{"type":"flex"}} -->
        <div class="wp-block-group header-actions">
            <!-- wp:button {"className":"is-style-text-link"} -->
            <div class="wp-block-button is-style-text-link"><a class="wp-block-button__link">Login</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-primary"} -->
            <div class="wp-block-button is-style-primary"><a class="wp-block-button__link">Book a Demo</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-secondary"} -->
            <div class="wp-block-button is-style-secondary"><a class="wp-block-button__link">Free Trial</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->