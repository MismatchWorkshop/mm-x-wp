<?php
/**
 * Title: Site Header
 * Slug: wagepoint/site-header
 * Categories: wagepoint-header
 * Description: Wagepoint-style header with dropdown navigation and CTA buttons
 */
?>

<!-- wp:group {"className":"site-header","layout":{"type":"default"}} -->
<div class="wp-block-group site-header">
    
    <!-- wp:group {"className":"header-inner","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
    <div class="wp-block-group header-inner">
        
        <!-- wp:site-logo {"width":150,"className":"site-logo"} /-->
        
        <!-- wp:navigation {"className":"is-style-wagepoint-nav","layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <!-- wp:navigation-submenu {"label":"For Small Businesses","url":"#"} -->
                <!-- wp:navigation-link {"label":"FOR SMALL BUSINESSES","url":"#","className":"is-style-category-header"} /-->
                <!-- wp:navigation-link {"label":"Payroll","url":"#"} /-->
                <!-- wp:navigation-link {"label":"People","url":"#"} /-->
                <!-- wp:navigation-link {"label":"Benefits","url":"#"} /-->
            <!-- /wp:navigation-submenu -->
            
            <!-- wp:navigation-submenu {"label":"For Bookkeepers & Accountants","url":"#"} -->
                <!-- wp:navigation-link {"label":"FOR ACCOUNTANTS","url":"#","className":"is-style-category-header"} /-->
                <!-- wp:navigation-link {"label":"Partner Program","url":"#"} /-->
                <!-- wp:navigation-link {"label":"Client Management","url":"#"} /-->
                <!-- wp:navigation-link {"label":"Resources","url":"#"} /-->
            <!-- /wp:navigation-submenu -->
            
            <!-- wp:navigation-submenu {"label":"Resources","url":"#"} -->
                <!-- wp:navigation-link {"label":"Blog","url":"#"} /-->
                <!-- wp:navigation-link {"label":"Help Center","url":"#"} /-->
                <!-- wp:navigation-link {"label":"Case Studies","url":"#"} /-->
            <!-- /wp:navigation-submenu -->
            
            <!-- wp:navigation-link {"label":"Pricing","url":"#"} /-->
            <!-- wp:navigation-link {"label":"Company","url":"#"} /-->
        <!-- /wp:navigation -->
        
        <!-- wp:group {"className":"header-actions","layout":{"type":"flex","flexWrap":"nowrap"}} -->
        <div class="wp-block-group header-actions">
            <!-- wp:button {"className":"is-style-text-link"} -->
            <div class="wp-block-button is-style-text-link"><a class="wp-block-button__link wp-element-button">Login</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-primary"} -->
            <div class="wp-block-button is-style-primary"><a class="wp-block-button__link wp-element-button">Book a Demo →</a></div>
            <!-- /wp:button -->
            
            <!-- wp:button {"className":"is-style-secondary"} -->
            <div class="wp-block-button is-style-secondary"><a class="wp-block-button__link wp-element-button">Free Trial →</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:group -->
        
    </div>
    <!-- /wp:group -->
    
</div>
<!-- /wp:group -->