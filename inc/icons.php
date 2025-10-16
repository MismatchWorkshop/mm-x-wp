<?php 

function wagepoint_register_icon_library() {
    register_post_type('icon', array(
        'labels' => array(
            'name' => 'Icons',
            'singular_name' => 'Icon',
            'add_new' => 'Add New Icon',
            'add_new_item' => 'Add New Icon',
            'edit_item' => 'Edit Icon',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-star-filled',
        'menu_position' => 58,
        'supports' => array('title', 'editor'),
        'show_in_rest' => true, // CRITICAL for Gutenberg
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'edit_posts',
        ),
        'map_meta_cap' => true,
    ));
}
add_action('init', 'wagepoint_register_icon_library');

// Add meta box for SVG code
function wagepoint_icon_meta_boxes() {
    add_meta_box(
        'icon_svg_code',
        'SVG Code',
        'wagepoint_icon_svg_meta_box_html',
        'icon',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'wagepoint_icon_meta_boxes');

function wagepoint_icon_svg_meta_box_html($post) {
    $svg_code = get_post_meta($post->ID, '_icon_svg_code', true);
    wp_nonce_field('wagepoint_icon_svg_nonce', 'wagepoint_icon_svg_nonce');
    ?>
    <p><strong>Instructions:</strong> Paste your SVG code below. Use <code>fill="currentColor"</code> for parts that should inherit the icon color.</p>
    <textarea 
        name="icon_svg_code" 
        rows="10" 
        style="width: 100%; font-family: monospace;"
        placeholder='<svg viewBox="0 0 24 24" fill="currentColor"><path d="..."/></svg>'
    ><?php echo esc_textarea($svg_code); ?></textarea>
    <p class="description">Example: <code>&lt;svg viewBox="0 0 24 24" fill="currentColor"&gt;&lt;path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/&gt;&lt;/svg&gt;</code></p>
    <?php
}

function wagepoint_save_icon_meta($post_id) {
    if (!isset($_POST['wagepoint_icon_svg_nonce']) || 
        !wp_verify_nonce($_POST['wagepoint_icon_svg_nonce'], 'wagepoint_icon_svg_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    if (isset($_POST['icon_svg_code'])) {
        // Basic sanitization - you might want to be more strict
        $svg_code = wp_kses($_POST['icon_svg_code'], array(
            'svg' => array(
                'viewbox' => true,
                'fill' => true,
                'xmlns' => true,
                'width' => true,
                'height' => true,
            ),
            'path' => array(
                'd' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'circle' => array(
                'cx' => true,
                'cy' => true,
                'r' => true,
                'fill' => true,
                'stroke' => true,
            ),
            'rect' => array(
                'x' => true,
                'y' => true,
                'width' => true,
                'height' => true,
                'fill' => true,
                'stroke' => true,
            ),
            'g' => array(
                'fill' => true,
                'stroke' => true,
            ),
        ));
        update_post_meta($post_id, '_icon_svg_code', $svg_code);
    }
}
add_action('save_post_icon', 'wagepoint_save_icon_meta');



function wagepoint_register_icon_rest_fields() {
    register_rest_field('icon', 'svg_code', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_icon_svg_code', true);
        },
        'schema' => array(
            'description' => 'SVG code for the icon',
            'type' => 'string',
        ),
    ));
}
add_action('rest_api_init', 'wagepoint_register_icon_rest_fields');

?>