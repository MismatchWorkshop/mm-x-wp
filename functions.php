<?php

/**
 * wagepoint functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wagepoint
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function wagepoint_setup() {
	load_theme_textdomain( 'wagepoint', get_template_directory() . '/languages' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'wagepoint' ),
		)
	);
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	add_theme_support(
		'custom-background',
		apply_filters(
			'wagepoint_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'wagepoint_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function wagepoint_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'wagepoint_content_width', 640 );
}
add_action( 'after_setup_theme', 'wagepoint_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function wagepoint_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'wagepoint' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'wagepoint' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'wagepoint_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function wagepoint_scripts() {
    // Main theme styles (compiled from src/style.scss)
    /*
    wp_enqueue_style(
        'wagepoint-style',
        get_template_directory_uri() . '/build/style-index.css',
        array(),
        _S_VERSION
    );
    */
    
	wp_enqueue_style(
            'custom-blocks-style',
            get_template_directory_uri() . '/build/global-styles.css',
			array(),
			_S_VERSION
        );

    // Main theme scripts (compiled from src/index.js)
    wp_enqueue_script(
        'wagepoint-script',
        get_template_directory_uri() . '/build/index.js',
        array(),
        _S_VERSION,
        true
    );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'wagepoint_scripts' );


function wagepoint_enqueue_block_assets() {
    
    // Editor only
    if ( is_admin() ) {
        // Editor styles
        wp_enqueue_style(
            'wagepoint-editor-style',
            get_template_directory_uri() . '/build/editor-style.css',
            array( 'wp-edit-blocks' ),
            _S_VERSION
        );
        
        // Color system script
        wp_enqueue_script(
            'wagepoint-color-system',
            get_template_directory_uri() . '/build/color-system.js',
            array( 'wp-blocks', 'wp-dom-ready' ),
            _S_VERSION,
            true
        );
    }
}
add_action( 'enqueue_block_assets', 'wagepoint_enqueue_block_assets' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


require get_template_directory() . '/inc/parts.php';
require get_template_directory() . '/inc/patterns.php';
require get_template_directory() . '/inc/icons.php';
require get_template_directory() . '/inc/index-grid.php';



/**
 * ==================================================
 * BLOCK THEME MODERNIZATION
 * ==================================================
 */

/**
 * Add block editor features
 */
function wagepoint_add_block_editor_features() {
    // Enable block editor features
    add_theme_support( 'editor-styles' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    
    // Add editor stylesheet
    add_editor_style( 'style-editor.css' );
    
    // Disable custom colors (force theme palette only)
    add_theme_support( 'disable-custom-colors' );
    
    // Disable custom font sizes (force theme sizes only)
    add_theme_support( 'disable-custom-font-sizes' );
}
add_action( 'after_setup_theme', 'wagepoint_add_block_editor_features' );

/**
 * Register custom blocks
 */
function wagepoint_register_blocks() {
    $blocks_dir = get_template_directory() . '/build/blocks';
    
    if ( file_exists( $blocks_dir ) ) {
        $block_folders = glob( $blocks_dir . '/*', GLOB_ONLYDIR );
        
        foreach ( $block_folders as $block_folder ) {
            if ( file_exists( $block_folder . '/block.json' ) ) {
                register_block_type( $block_folder );
            }
        }
    }
}
add_action( 'init', 'wagepoint_register_blocks' );


function wagepoint_hide_custom_blocks( $allowed_blocks, $editor_context ) {
    $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
    $all_blocks = array_keys( $registered_blocks );
    
    // Blocks that can be inserted
    $allowed_custom_blocks = array(
        'wagepoint/buttons',
        'wagepoint/metric', // ← The wrapper is insertable
    );
    
    // Hide all other wagepoint blocks
    $blocks_to_hide = array_filter( $all_blocks, function( $block ) use ( $allowed_custom_blocks ) {
        return strpos( $block, 'wagepoint/' ) === 0 && !in_array( $block, $allowed_custom_blocks );
    });
    
    return array_diff( $all_blocks, $blocks_to_hide );
}
add_filter( 'allowed_block_types_all', 'wagepoint_hide_custom_blocks', 10, 2 );

/**
 * Unregister default pattern categories we don't need
 */
function wagepoint_unregister_default_categories() {
    $categories_to_remove = array(
        'buttons', 
        'columns', 
        'gallery', 
        'header', 
        'text', 
        'posts', 
        'query',
        'featured'
    );
    
    foreach ( $categories_to_remove as $category ) {
        unregister_block_pattern_category( $category );
    }
}
add_action( 'init', 'wagepoint_unregister_default_categories', 11 );

/**
 * Debug: List all registered blocks
 */
function wagepoint_debug_blocks() {
    $registry = WP_Block_Type_Registry::get_instance();
    $registered = $registry->get_all_registered();
    
    error_log('=== Registered Blocks ===');
    foreach ($registered as $block_name => $block_type) {
        if (strpos($block_name, 'wagepoint/') === 0) {
            error_log('Found: ' . $block_name);
        }
    }
}
add_action('init', 'wagepoint_debug_blocks', 999);


function wagepoint_unregister_core_blocks() {
    // Unregister core heading block
    // unregister_block_type('core/heading');
}
add_action('init', 'wagepoint_unregister_core_blocks');


function wagepoint_enqueue_logos_frontend_script() {
    if ( has_block( 'wagepoint/logos' ) ) {
        wp_enqueue_script(
            'wagepoint-logos-frontend',
            get_template_directory_uri() . '/build/logos-frontend.js',
            array(),
            filemtime( get_template_directory() . '/build/logos-frontend.js' ),
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'wagepoint_enqueue_logos_frontend_script' );

/*
function wagepoint_register_pattern_categories() {
    if ( function_exists( 'register_block_pattern_category' ) ) {
        register_block_pattern_category(
            'wagepoint-social-proof',
            array(
                'label' => __( 'Social Proof', 'wagepoint' ),
            )
        );
    }
}
add_action( 'init', 'wagepoint_register_pattern_categories' );
*/