<?php 

/**
 * Register pattern categories
 */
function wagepoint_register_pattern_categories() {
    // Hero category
    register_block_pattern_category(
        'hero',
        array( 
            'label' => __('Hero', 'wagepoint'),
            'description' => __('Hero sections and landing page headers', 'wagepoint')
        )
    );

     register_block_pattern_category(
        'wagepoint-header',
        array(
            'label' => __('Headers', 'wagepoint'),
            'description' => __('Site headers and navigation', 'wagepoint')
        )
    );
    
    // Social Proof category
    register_block_pattern_category(
        'wagepoint-social-proof',
        array(
            'label' => __('Social Proof', 'wagepoint'),
            'description' => __('Logos, testimonials, and trust indicators', 'wagepoint')
        )
    );
}
add_action('init', 'wagepoint_register_pattern_categories');

/**
 * Enable pattern support for auto-discovery from /patterns directory
 */
function wagepoint_enable_custom_patterns() {
    add_theme_support('block-patterns');
}
add_action('after_setup_theme', 'wagepoint_enable_custom_patterns');

/**
 * Debug: List all registered patterns and categories
 * Remove this after confirming patterns work
 */
function wagepoint_debug_patterns() {
    // Debug pattern categories
    $categories = WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();
    error_log('=== Pattern Categories ===');
    error_log('Total categories: ' . count($categories));
    foreach ($categories as $category) {
        error_log('Category: ' . $category['name'] . ' - ' . ($category['label'] ?? 'no label'));
    }
    
    // Debug patterns
    $patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
    error_log('=== Registered Patterns ===');
    error_log('Total patterns: ' . count($patterns));
    foreach ($patterns as $pattern) {
        if (strpos($pattern['name'], 'wagepoint/') === 0) {
            error_log('Pattern: ' . $pattern['name']);
            error_log('  - Title: ' . ($pattern['title'] ?? 'no title'));
            error_log('  - Categories: ' . print_r($pattern['categories'] ?? [], true));
        }
    }
    
    // Check patterns directory
    $patterns_dir = get_template_directory() . '/patterns';
    error_log('=== Patterns Directory ===');
    error_log('Directory exists: ' . (file_exists($patterns_dir) ? 'YES' : 'NO'));
    error_log('Directory path: ' . $patterns_dir);
    
    if (file_exists($patterns_dir)) {
        $pattern_files = glob($patterns_dir . '/*.php');
        error_log('Pattern files found: ' . count($pattern_files));
        foreach ($pattern_files as $file) {
            error_log('  - ' . basename($file));
        }
    }
}
add_action('init', 'wagepoint_debug_patterns', 999);

function wagepoint_remove_core_patterns() {
    remove_theme_support( 'core-block-patterns' );
}
add_action( 'after_setup_theme', 'wagepoint_remove_core_patterns' );

/**
 * Unregister remote (WordPress.org) pattern directory
 */
function wagepoint_remove_remote_patterns() {
    remove_theme_support( 'core-block-patterns' );
    
    // Remove the patterns from WordPress.org
    add_filter( 'should_load_remote_block_patterns', '__return_false' );
}
add_action( 'after_setup_theme', 'wagepoint_remove_remote_patterns' );


function wagepoint_autoswitch_patterns() {
    ?>
    <script>
    // Switch to Patterns tab by default when inserter opens
    wp.domReady(function() {
        // Listen for when the inserter opens
        wp.data.subscribe(function() {
            var isInserterOpened = wp.data.select('core/edit-post').isInserterOpened() || 
                                   wp.data.select('core/edit-site')?.isInserterOpened();
            
            if (isInserterOpened) {
                // Small delay to let the inserter render
                setTimeout(function() {
                    // Find and click the Patterns tab
                    var patternsTab = document.querySelector('button[data-type="patterns"], button.components-tab-panel__tabs-item:nth-child(2)');
                    if (patternsTab && !patternsTab.getAttribute('aria-selected')) {
                        patternsTab.click();
                    }
                }, 100);
            }
        });
    });
    </script>
    <?php
}
add_action('admin_head', 'wagepoint_autoswitch_patterns');