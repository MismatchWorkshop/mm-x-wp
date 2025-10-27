<?php 

function wagepoint_register_parts_styles() {
    // Wagepoint navigation style
    register_block_style(
        'core/navigation',
        array(
            'name'  => 'wagepoint-nav',
            'label' => 'Wagepoint Navigation',
        )
    );
    
    // Text-only button style for Login
    register_block_style(
        'core/button',
        array(
            'name'  => 'text-link',
            'label' => 'Text Link',
        )
    );
    
    // Category header for submenu sections
    register_block_style(
        'core/navigation-link',
        array(
            'name'  => 'category-header',
            'label' => 'Category Header',
        )
    );
}
add_action( 'init', 'wagepoint_register_parts_styles' );



// Add meta box to post/page editor
function wagepoint_add_header_theme_meta() {
    add_meta_box(
        'wagepoint_header_theme',
        'Header Theme',
        'wagepoint_header_theme_callback',
        ['post', 'page'],
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'wagepoint_add_header_theme_meta');

// Meta box HTML
function wagepoint_header_theme_callback($post) {
    wp_nonce_field('wagepoint_header_theme_nonce', 'wagepoint_header_theme_nonce');
    $value = get_post_meta($post->ID, '_header_theme', true);
    ?>
    <select name="header_theme" style="width: 100%;">
        <option value="">Default (Dark)</option>
        <option value="header-light" <?php selected($value, 'header-light'); ?>>Light (on dark bg)</option>
    </select>
    <p class="description">Choose header color based on your hero section background.</p>
    <?php
}

// Save meta box value
function wagepoint_save_header_theme($post_id) {
    if (!isset($_POST['wagepoint_header_theme_nonce'])) return;
    if (!wp_verify_nonce($_POST['wagepoint_header_theme_nonce'], 'wagepoint_header_theme_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['header_theme'])) {
        update_post_meta($post_id, '_header_theme', sanitize_text_field($_POST['header_theme']));
    }
}
add_action('save_post', 'wagepoint_save_header_theme');

// Add body class
function wagepoint_header_theme_body_class($classes) {
    if (is_singular() || is_front_page()) {
        $header_theme = get_post_meta(get_the_ID(), '_header_theme', true);
        if ($header_theme) {
            $classes[] = $header_theme;
        }
    }
    return $classes;
}
add_filter('body_class', 'wagepoint_header_theme_body_class');