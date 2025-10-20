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