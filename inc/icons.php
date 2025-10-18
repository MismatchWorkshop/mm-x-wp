<?php 
function wagepoint_register_icon_library() {
    register_post_type('icon', array(
        'labels' => array(
            'name' => 'Icons',
            'singular_name' => 'Icon',
            'add_new' => 'Add New Icon',
            'add_new_item' => 'Add New Icon',
            'edit_item' => 'Edit Icon',
            'search_items' => 'Search Icons',
            'not_found' => 'No icons found',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-star-filled',
        'menu_position' => 58,
        'supports' => array('title'), // Removed 'editor'
        'show_in_rest' => true, // Still needed for REST API
        'capability_type' => 'post',
        'capabilities' => array(
            'create_posts' => 'edit_posts',
        ),
        'map_meta_cap' => true,
    ));
}
add_action('init', 'wagepoint_register_icon_library');

// Disable Gutenberg for icons
function wagepoint_disable_gutenberg_for_icons($use_block_editor, $post_type) {
    if ($post_type === 'icon') {
        return false;
    }
    return $use_block_editor;
}
add_filter('use_block_editor_for_post_type', 'wagepoint_disable_gutenberg_for_icons', 10, 2);

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
    
    // Add preview meta box
    add_meta_box(
        'icon_preview',
        'Icon Preview',
        'wagepoint_icon_preview_meta_box_html',
        'icon',
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'wagepoint_icon_meta_boxes');

function wagepoint_icon_svg_meta_box_html($post) {
    $svg_code = get_post_meta($post->ID, '_icon_svg_code', true);
    wp_nonce_field('wagepoint_icon_svg_nonce', 'wagepoint_icon_svg_nonce');
    ?>
    <div style="margin-bottom: 15px;">
        <p><strong>Instructions:</strong></p>
        <ul style="list-style: disc; margin-left: 20px;">
            <li>Paste your complete SVG code below</li>
            <li>Use <code>fill="currentColor"</code> to make the icon inherit colors</li>
            <li>Ensure your SVG has a <code>viewBox</code> attribute</li>
            <li>Keep icons simple - they work best at small sizes</li>
        </ul>
    </div>
    
    <textarea 
        name="icon_svg_code" 
        id="icon_svg_code"
        rows="15" 
        style="width: 100%; font-family: 'Courier New', monospace; font-size: 13px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
        placeholder='<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
</svg>'
    ><?php echo esc_textarea($svg_code); ?></textarea>
    
    <div style="margin-top: 10px; padding: 10px; background: #f0f6fc; border-left: 4px solid #0073aa; border-radius: 4px;">
        <p style="margin: 0; font-size: 12px;">
            <strong>Example SVG:</strong><br>
            <code style="font-size: 11px;">&lt;svg viewBox="0 0 24 24" fill="currentColor"&gt;&lt;path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/&gt;&lt;/svg&gt;</code>
        </p>
    </div>
    
    <div style="margin-top: 10px;">
        <p style="font-size: 12px; color: #666;">
            <strong>Need icons?</strong> Try 
            <a href="https://fonts.google.com/icons" target="_blank">Google Icons</a> or 
            <a href="https://heroicons.com/" target="_blank">Heroicons</a>
        </p>
    </div>
    <?php
}

function wagepoint_icon_preview_meta_box_html($post) {
    $svg_code = get_post_meta($post->ID, '_icon_svg_code', true);
    ?>
    <div id="icon-preview-container">
        <?php if ($svg_code): ?>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                <!-- Blue background -->
                <div style="width: 64px; height: 64px; background: #4A90E2; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                    <div style="width: 60%; height: 60%;">
                        <?php echo $svg_code; ?>
                    </div>
                </div>
                
                <!-- Green background -->
                <div style="width: 64px; height: 64px; background: #2ECC71; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                    <div style="width: 60%; height: 60%;">
                        <?php echo $svg_code; ?>
                    </div>
                </div>
                
                <!-- Dark background -->
                <div style="width: 64px; height: 64px; background: #1E293B; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                    <div style="width: 60%; height: 60%;">
                        <?php echo $svg_code; ?>
                    </div>
                </div>
                
                <!-- White background -->
                <div style="width: 64px; height: 64px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #1E293B;">
                    <div style="width: 60%; height: 60%;">
                        <?php echo $svg_code; ?>
                    </div>
                </div>
            </div>
            <p style="font-size: 12px; color: #666; margin: 0;">
                Preview shows how your icon looks on different backgrounds
            </p>
        <?php else: ?>
            <p style="color: #666; font-style: italic;">Save your icon to see a preview</p>
        <?php endif; ?>
    </div>
    
    <script>
    // Live preview update
    jQuery(document).ready(function($) {
        $('#icon_svg_code').on('input', function() {
            var svgCode = $(this).val();
            if (svgCode) {
                // Update all preview containers
                $('#icon-preview-container > div > div > div').html(svgCode);
            }
        });
    });
    </script>
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
        $svg_code = $_POST['icon_svg_code'];
        
        // More permissive SVG sanitization
        $svg_code = wp_kses($svg_code, array(
            'svg' => array(
                'viewbox' => true,
                'fill' => true,
                'xmlns' => true,
                'width' => true,
                'height' => true,
                'class' => true,
                'aria-hidden' => true,
            ),
            'path' => array(
                'd' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
                'stroke-linecap' => true,
                'stroke-linejoin' => true,
                'fill-rule' => true,
                'clip-rule' => true,
            ),
            'circle' => array(
                'cx' => true,
                'cy' => true,
                'r' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'rect' => array(
                'x' => true,
                'y' => true,
                'width' => true,
                'height' => true,
                'rx' => true,
                'ry' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'line' => array(
                'x1' => true,
                'y1' => true,
                'x2' => true,
                'y2' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'polyline' => array(
                'points' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'polygon' => array(
                'points' => true,
                'fill' => true,
                'stroke' => true,
                'stroke-width' => true,
            ),
            'ellipse' => array(
                'cx' => true,
                'cy' => true,
                'rx' => true,
                'ry' => true,
                'fill' => true,
                'stroke' => true,
            ),
            'g' => array(
                'fill' => true,
                'stroke' => true,
                'transform' => true,
            ),
            'defs' => array(),
            'clippath' => array(
                'id' => true,
            ),
            'mask' => array(
                'id' => true,
            ),
        ));
        
        update_post_meta($post_id, '_icon_svg_code', $svg_code);
    }
}
add_action('save_post_icon', 'wagepoint_save_icon_meta');

// Expose icons via REST API
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

// Customize the icon list columns
function wagepoint_icon_columns($columns) {
    return array(
        'cb' => $columns['cb'],
        'title' => 'Icon Name',
        'preview' => 'Preview',
        'date' => 'Date Added',
    );
}
add_filter('manage_icon_posts_columns', 'wagepoint_icon_columns');

function wagepoint_icon_column_content($column, $post_id) {
    if ($column === 'preview') {
        $svg_code = get_post_meta($post_id, '_icon_svg_code', true);
        if ($svg_code) {
            echo '<div style="width: 48px; height: 48px; background: #4A90E2; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">';
            echo '<div style="width: 60%; height: 60%;">' . $svg_code . '</div>';
            echo '</div>';
        } else {
            echo '<span style="color: #999;">No SVG</span>';
        }
    }
}
add_action('manage_icon_posts_custom_column', 'wagepoint_icon_column_content', 10, 2);

// Make preview column not sortable
function wagepoint_icon_sortable_columns($columns) {
    unset($columns['preview']);
    return $columns;
}
add_filter('manage_edit-icon_sortable_columns', 'wagepoint_icon_sortable_columns');
?>