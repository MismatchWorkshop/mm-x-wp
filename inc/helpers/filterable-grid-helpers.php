<?php
/**
 * Helper functions for Filterable Grid Block
 *
 * @package MyTheme
 */

namespace MyTheme\Helpers;

/**
 * Get post types available for filterable grid
 */
function get_available_post_types(): array {
    $post_types = get_post_types([
        'public' => true,
        'show_in_rest' => true
    ], 'objects');
    
    // Filter out unwanted post types
    $excluded = ['attachment', 'wp_block', 'wp_template', 'wp_template_part', 'wp_navigation'];
    
    return array_filter($post_types, function($post_type) use ($excluded) {
        return !in_array($post_type->name, $excluded);
    });
}

/**
 * Get taxonomies for a post type
 */
function get_post_type_taxonomies(string $post_type): array {
    $taxonomies = get_object_taxonomies($post_type, 'objects');
    
    return array_filter($taxonomies, function($taxonomy) {
        return $taxonomy->public && 
               $taxonomy->show_ui && 
               !in_array($taxonomy->name, ['post_format']);
    });
}

/**
 * Format post for output
 */
function format_post_data(\WP_Post $post): array {
    return [
        'id' => $post->ID,
        'title' => get_the_title($post),
        'excerpt' => get_the_excerpt($post),
        'permalink' => get_permalink($post),
        'date' => get_the_date('', $post),
        'author' => get_the_author_meta('display_name', $post->post_author),
        'featured_image' => get_post_thumbnail_id($post) ? [
            'url' => get_the_post_thumbnail_url($post, 'medium'),
            'alt' => get_post_meta(get_post_thumbnail_id($post), '_wp_attachment_image_alt', true)
        ] : null,
        'terms' => get_post_terms_formatted($post->ID, $post->post_type)
    ];
}

/**
 * Get formatted terms for a post
 */
function get_post_terms_formatted(int $post_id, string $post_type): array {
    $taxonomies = get_object_taxonomies($post_type);
    $terms_data = [];
    
    foreach ($taxonomies as $taxonomy) {
        $terms = get_the_terms($post_id, $taxonomy);
        if ($terms && !is_wp_error($terms)) {
            $terms_data[$taxonomy] = array_map(function($term) {
                return [
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'link' => get_term_link($term)
                ];
            }, $terms);
        }
    }
    
    return $terms_data;
}

/**
 * Sanitize filter parameters
 */
function sanitize_filter_params(array $params): array {
    $sanitized = [];
    
    foreach ($params as $taxonomy => $term_id) {
        $sanitized[sanitize_text_field($taxonomy)] = absint($term_id);
    }
    
    return $sanitized;
}

/**
 * Build tax query from filters
 */
function build_tax_query(array $filters): array {
    $tax_query = [];
    
    foreach ($filters as $taxonomy => $term_id) {
        if ($term_id > 0 && taxonomy_exists($taxonomy)) {
            $tax_query[] = [
                'taxonomy' => $taxonomy,
                'field' => 'term_id',
                'terms' => $term_id
            ];
        }
    }
    
    if (count($tax_query) > 1) {
        $tax_query['relation'] = 'AND';
    }
    
    return $tax_query;
}

/**
 * Get grid cache key
 */
function get_grid_cache_key(array $args): string {
    ksort($args);
    return 'filterable_grid_' . md5(serialize($args));
}

/**
 * Check if grid has active filters
 */
function has_active_filters(): bool {
    return !empty($_GET['s']) || 
           !empty(array_filter($_GET, function($key) {
               return taxonomy_exists($key);
           }, ARRAY_FILTER_USE_KEY));
}

/**
 * Get current filter state from URL
 */
function get_current_filter_state(): array {
    $state = [
        'search' => sanitize_text_field($_GET['s'] ?? ''),
        'page' => absint($_GET['paged'] ?? 1),
        'filters' => []
    ];
    
    // Get taxonomy filters
    $post_types = get_post_types(['public' => true]);
    foreach ($post_types as $post_type) {
        $taxonomies = get_object_taxonomies($post_type);
        foreach ($taxonomies as $taxonomy) {
            if (isset($_GET[$taxonomy])) {
                $state['filters'][$taxonomy] = absint($_GET[$taxonomy]);
            }
        }
    }
    
    return $state;
}