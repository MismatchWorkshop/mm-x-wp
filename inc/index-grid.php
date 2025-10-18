<?php
/**
 * Theme Functions
 *
 * @package wagepoint_index_grid
 */

// Autoload block classes
require_once get_template_directory() . '/inc/blocks/class-filterable-grid-block.php';
require_once get_template_directory() . '/inc/blocks/class-taxonomy-filter-block.php';

/**
 * Enqueue block editor assets
 */
function wagepoint_index_grid_enqueue_block_editor_assets() {
    $asset_file = get_template_directory() . '/build/blocks/filterable-grid/index.asset.php';
    
    if (file_exists($asset_file)) {
        $asset_data = require $asset_file;
        
        wp_enqueue_script(
            'wagepoint_index_grid-filterable-grid-editor',
            get_template_directory_uri() . '/build/blocks/filterable-grid/index.js',
            $asset_data['dependencies'],
            $asset_data['version'],
            true
        );
        
        wp_enqueue_style(
            'wagepoint_index_grid-filterable-grid-editor',
            get_template_directory_uri() . '/build/blocks/filterable-grid/index.css',
            [],
            $asset_data['version']
        );
    }
}
add_action('enqueue_block_editor_assets', 'wagepoint_index_grid_enqueue_block_editor_assets');

/**
 * Enqueue frontend assets
 */
function wagepoint_index_grid_enqueue_frontend_assets() {
    if (has_block('wagepoint/filterable-grid')) {
        wp_enqueue_script(
            'wagepoint_index_grid-filterable-grid-view',
            get_template_directory_uri() . '/build/blocks/filterable-grid/view.js',
            [],
            filemtime(get_template_directory() . '/build/blocks/filterable-grid/view.js'),
            true
        );
        
        wp_enqueue_style(
            'wagepoint_index_grid-filterable-grid-style',
            get_template_directory_uri() . '/build/blocks/filterable-grid/style.css',
            [],
            filemtime(get_template_directory() . '/build/blocks/filterable-grid/style.css')
        );
        
        wp_localize_script('wagepoint_index_grid-filterable-grid-view', 'filterableGridData', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('filterable_grid_nonce'),
            'restUrl' => rest_url('wp/v2/'),
            'restNonce' => wp_create_nonce('wp_rest')
        ]);
    }
}
add_action('wp_enqueue_scripts', 'wagepoint_index_grid_enqueue_frontend_assets');

require_once get_template_directory() . '/inc/helpers/filterable-grid-helpers.php';