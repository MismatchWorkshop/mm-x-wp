<?php
/**
 * Filterable Grid Block
 *
 * @package wagepoint
 */

namespace wagepoint\Blocks;

class Filterable_Grid_Block {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'register_block']);
        add_action('wp_ajax_filter_grid_posts', [$this, 'ajax_filter_posts']);
        add_action('wp_ajax_nopriv_filter_grid_posts', [$this, 'ajax_filter_posts']);
    }
    
    /**
     * Register the block
     */
    public function register_block(): void {
        register_block_type(
            get_template_directory() . '/build/blocks/filterable-grid',
            [
                'render_callback' => [$this, 'render_callback']
            ]
        );
    }
    
    /**
     * Render callback
     */
    public function render_callback($attributes, $content, $block): string {
        // Extract attributes with defaults
        $post_type = $attributes['postType'] ?? 'post';
        $posts_per_page = $attributes['postsPerPage'] ?? 12;
        $columns = $attributes['columns'] ?? 4;
        $show_search = $attributes['showSearch'] ?? true;
        $show_filters = $attributes['showFilters'] ?? true;
        $order_by = $attributes['orderBy'] ?? 'date';
        $order = $attributes['order'] ?? 'DESC';
        $show_featured_image = $attributes['showFeaturedImage'] ?? true;
        $show_excerpt = $attributes['showExcerpt'] ?? false;
        $show_date = $attributes['showDate'] ?? false;
        $show_author = $attributes['showAuthor'] ?? false;
        
        // Generate unique block ID
        $block_id = $attributes['blockId'] ?? 'filterable-grid-' . wp_unique_id();
        
        // Get taxonomies for this post type
        $taxonomies = $this->get_post_type_taxonomies($post_type);
        
        // Initial query
        $query_args = [
            'post_type' => $post_type,
            'posts_per_page' => $posts_per_page,
            'post_status' => 'publish',
            'orderby' => $order_by,
            'order' => $order,
            'paged' => 1,
            'no_found_rows' => false
        ];
        
        $query = new \WP_Query($query_args);
        
        // Start output buffering
        ob_start();
        
        // Get wrapper attributes
        $wrapper_attributes = get_block_wrapper_attributes([
            'class' => 'filterable-grid-block',
            'id' => $block_id,
            'data-post-type' => $post_type,
            'data-posts-per-page' => $posts_per_page,
            'data-columns' => $columns,
            'data-order-by' => $order_by,
            'data-order' => $order,
            'data-show-featured-image' => $show_featured_image ? '1' : '0',
            'data-show-excerpt' => $show_excerpt ? '1' : '0',
            'data-show-date' => $show_date ? '1' : '0',
            'data-show-author' => $show_author ? '1' : '0'
        ]);
        
        ?>
        <div <?php echo $wrapper_attributes; ?>>
            
            <!-- Header Section -->
            <div class="filterable-grid-block__header">
                
                <div class="filterable-grid-block__controls">
                    
                    <?php if ($show_search): ?>
                    <div class="filterable-grid-block__search">
                        <input type="search" 
                               class="filterable-grid-block__search-input"
                               placeholder="<?php esc_attr_e('Search...', 'wagepoint'); ?>"
                               aria-label="<?php esc_attr_e('Search', 'wagepoint'); ?>">
                        <button type="button" 
                                class="filterable-grid-block__search-button"
                                aria-label="<?php esc_attr_e('Submit search', 'wagepoint'); ?>">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M19 19L14.65 14.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <?php endif; ?>
                    
                    <?php if ($show_filters && !empty($taxonomies)): ?>
                    <div class="filterable-grid-block__filters">
                        <?php foreach ($taxonomies as $taxonomy): ?>
                            <?php $this->render_taxonomy_filter($taxonomy, $post_type); ?>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                    
                </div>
                
                <!-- Active Filters Display -->
                <div class="filterable-grid-block__active-filters" style="display: none;">
                    <span class="filterable-grid-block__active-filters-label">
                        <?php esc_html_e('Active Filters:', 'wagepoint'); ?>
                    </span>
                    <div class="filterable-grid-block__active-filters-list"></div>
                    <button type="button" class="filterable-grid-block__clear-filters">
                        <?php esc_html_e('Clear All', 'wagepoint'); ?>
                    </button>
                </div>
                
            </div>
            
            <!-- Results Info -->
            <div class="filterable-grid-block__results-info">
                <span class="filterable-grid-block__results-count">
                    <?php
                    printf(
                        esc_html__('Showing %d of %d results', 'wagepoint'),
                        $query->post_count,
                        $query->found_posts
                    );
                    ?>
                </span>
                
                <!-- Sort Options -->
                <div class="filterable-grid-block__sort">
                    <label for="<?php echo esc_attr($block_id); ?>-sort">
                        <?php esc_html_e('Sort by:', 'wagepoint'); ?>
                    </label>
                    <select id="<?php echo esc_attr($block_id); ?>-sort" 
                            class="filterable-grid-block__sort-select">
                        <option value="date-DESC"><?php esc_html_e('Newest First', 'wagepoint'); ?></option>
                        <option value="date-ASC"><?php esc_html_e('Oldest First', 'wagepoint'); ?></option>
                        <option value="title-ASC"><?php esc_html_e('Title (A-Z)', 'wagepoint'); ?></option>
                        <option value="title-DESC"><?php esc_html_e('Title (Z-A)', 'wagepoint'); ?></option>
                        <?php if ($post_type === 'post'): ?>
                        <option value="modified-DESC"><?php esc_html_e('Recently Updated', 'wagepoint'); ?></option>
                        <?php endif; ?>
                    </select>
                </div>
            </div>
            
            <!-- Grid Section -->
            <div class="filterable-grid-block__grid-wrapper">
                <div class="filterable-grid-block__grid" 
                     data-columns="<?php echo esc_attr($columns); ?>"
                     style="--grid-columns: <?php echo esc_attr($columns); ?>;">
                    <?php
                    if ($query->have_posts()) {
                        while ($query->have_posts()) {
                            $query->the_post();
                            $this->render_card($post_type, [
                                'show_featured_image' => $show_featured_image,
                                'show_excerpt' => $show_excerpt,
                                'show_date' => $show_date,
                                'show_author' => $show_author
                            ]);
                        }
                        wp_reset_postdata();
                    } else {
                        $this->render_no_results();
                    }
                    ?>
                </div>
            </div>
            
            <!-- Pagination -->
            <?php if ($query->max_num_pages > 1): ?>
            <nav class="filterable-grid-block__pagination" 
                 aria-label="<?php esc_attr_e('Pagination', 'wagepoint'); ?>"
                 data-max-pages="<?php echo esc_attr($query->max_num_pages); ?>"
                 data-current-page="1">
                <?php
                echo paginate_links([
                    'total' => $query->max_num_pages,
                    'current' => 1,
                    'prev_text' => '<span aria-label="' . esc_attr__('Previous page', 'wagepoint') . '">←</span>',
                    'next_text' => '<span aria-label="' . esc_attr__('Next page', 'wagepoint') . '">→</span>',
                    'type' => 'list',
                    'before_page_number' => '<span class="screen-reader-text">' . __('Page', 'wagepoint') . ' </span>',
                    'add_fragment' => '#' . $block_id
                ]);
                ?>
            </nav>
            <?php endif; ?>
            
            <!-- Loading State -->
            <div class="filterable-grid-block__loading" hidden aria-hidden="true">
                <div class="filterable-grid-block__loading-spinner">
                    <svg class="filterable-grid-block__spinner" viewBox="0 0 50 50">
                        <circle class="filterable-grid-block__spinner-path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
                    </svg>
                    <span><?php esc_html_e('Loading...', 'wagepoint'); ?></span>
                </div>
            </div>
            
        </div>
        <?php
        
        return ob_get_clean();
    }
    
    /**
     * Render individual card
     */
    /**
 * Render individual card
 */
private function render_card(string $post_type, array $options = []): void {
    $post_id = get_the_ID();
    
    // Try to load post-type specific template
    $template_slug = 'template-parts/cards/card';
    $template_name = $post_type;
    
    // Check if custom template exists
    $template_path = locate_template([
        "{$template_slug}-{$template_name}.php",
        "{$template_slug}-default.php"
    ]);
    
    if ($template_path) {
        // Pass options to template
        set_query_var('card_options', $options);
        set_query_var('post_id', $post_id);
        
        include $template_path;
    } else {
        // Fallback to inline rendering
        $this->render_card_inline($post_type, $options);
    }
}

/**
 * Fallback inline card rendering (your current method)
 */
private function render_card_inline(string $post_type, array $options = []): void {
    $post_id = get_the_ID();
    $taxonomies = get_object_taxonomies($post_type, 'objects');
    $primary_taxonomy = !empty($taxonomies) ? reset($taxonomies) : null;
    
    $show_featured_image = $options['show_featured_image'] ?? true;
    $show_excerpt = $options['show_excerpt'] ?? false;
    $show_date = $options['show_date'] ?? false;
    $show_author = $options['show_author'] ?? false;
    ?>
    
    <article class="filterable-grid-block__card" data-post-id="<?php echo esc_attr($post_id); ?>">
        
        <?php if ($show_featured_image && has_post_thumbnail()): ?>
        <div class="filterable-grid-block__card-image">
            <a href="<?php the_permalink(); ?>" 
               aria-label="<?php echo esc_attr(sprintf(__('View %s', 'wagepoint'), get_the_title())); ?>">
                <?php 
                the_post_thumbnail('medium', [
                    'loading' => 'lazy',
                    'alt' => get_the_title()
                ]); 
                ?>
            </a>
        </div>
        <?php endif; ?>
        
        <div class="filterable-grid-block__card-content">
            
            <?php if ($primary_taxonomy): ?>
                <?php
                $terms = get_the_terms($post_id, $primary_taxonomy->name);
                if ($terms && !is_wp_error($terms)):
                ?>
                <div class="filterable-grid-block__card-meta">
                    <?php $term = reset($terms); ?>
                    <a href="<?php echo esc_url(get_term_link($term)); ?>" 
                       class="filterable-grid-block__card-category"
                       rel="tag">
                        <?php echo esc_html($term->name); ?>
                    </a>
                </div>
                <?php endif; ?>
            <?php endif; ?>
            
            <h3 class="filterable-grid-block__card-title">
                <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a>
            </h3>
            
            <?php if ($show_excerpt): ?>
            <div class="filterable-grid-block__card-excerpt">
                <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
            </div>
            <?php endif; ?>
            
            <?php if ($show_date || $show_author): ?>
            <div class="filterable-grid-block__card-footer">
                <?php if ($show_author): ?>
                <span class="filterable-grid-block__card-author">
                    <?php
                    printf(
                        esc_html__('By %s', 'wagepoint'),
                        '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . 
                        esc_html(get_the_author()) . 
                        '</a>'
                    );
                    ?>
                </span>
                <?php endif; ?>
                
                <?php if ($show_date): ?>
                <time class="filterable-grid-block__card-date" 
                      datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                    <?php echo esc_html(get_the_date()); ?>
                </time>
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
            <a href="<?php the_permalink(); ?>" 
               class="filterable-grid-block__card-link"
               aria-label="<?php echo esc_attr(sprintf(__('Read more about %s', 'wagepoint'), get_the_title())); ?>">
                <span class="filterable-grid-block__card-arrow" aria-hidden="true">→</span>
            </a>
            
        </div>
        
    </article>
    
    <?php
}
    
    /**
     * Render taxonomy filter dropdown
     */
    private function render_taxonomy_filter($taxonomy, string $post_type): void {
        $terms = get_terms([
            'taxonomy' => $taxonomy->name,
            'hide_empty' => true,
            'orderby' => 'name',
            'order' => 'ASC'
        ]);
        
        if (empty($terms) || is_wp_error($terms)) {
            return;
        }
        ?>
        
        <div class="filterable-grid-block__filter">
            <select class="filterable-grid-block__filter-select" 
                    data-taxonomy="<?php echo esc_attr($taxonomy->name); ?>"
                    aria-label="<?php echo esc_attr(sprintf(__('Filter by %s', 'wagepoint'), $taxonomy->label)); ?>">
                <option value=""><?php echo esc_html($taxonomy->label); ?></option>
                <?php foreach ($terms as $term): ?>
                    <option value="<?php echo esc_attr($term->term_id); ?>">
                        <?php echo esc_html($term->name); ?> (<?php echo esc_html($term->count); ?>)
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        
        <?php
    }
    
    /**
     * Render no results message
     */
    private function render_no_results(): void {
        ?>
        <div class="filterable-grid-block__no-results">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>
                <path d="M32 20V32L40 40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p><?php esc_html_e('No results found. Try adjusting your filters or search query.', 'wagepoint'); ?></p>
        </div>
        <?php
    }
    
    /**
     * Get taxonomies for post type
     */
    private function get_post_type_taxonomies(string $post_type): array {
        $taxonomies = get_object_taxonomies($post_type, 'objects');
        
        return array_filter($taxonomies, function($tax) {
            return $tax->public && $tax->show_ui && !in_array($tax->name, ['post_format']);
        });
    }
    
    /**
     * AJAX handler for filtering posts
     */
    public function ajax_filter_posts(): void {
        // Verify nonce
        check_ajax_referer('filterable_grid_nonce', 'nonce');
        
        // Sanitize inputs
        $post_type = sanitize_text_field($_POST['post_type'] ?? 'post');
        $posts_per_page = absint($_POST['posts_per_page'] ?? 12);
        $paged = absint($_POST['paged'] ?? 1);
        $search = sanitize_text_field($_POST['search'] ?? '');
        $order_by = sanitize_text_field($_POST['orderby'] ?? 'date');
        $order = sanitize_text_field($_POST['order'] ?? 'DESC');
        
        // Display options
        $show_featured_image = !empty($_POST['show_featured_image']);
        $show_excerpt = !empty($_POST['show_excerpt']);
        $show_date = !empty($_POST['show_date']);
        $show_author = !empty($_POST['show_author']);
        
        // Build tax query
        $tax_query = [];
        if (!empty($_POST['filters'])) {
            foreach ($_POST['filters'] as $taxonomy => $term_id) {
                $taxonomy = sanitize_text_field($taxonomy);
                $term_id = absint($term_id);
                
                if ($term_id > 0) {
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
        }
        
        // Build query args
        $query_args = [
            'post_type' => $post_type,
            'posts_per_page' => $posts_per_page,
            'paged' => $paged,
            'post_status' => 'publish',
            'orderby' => $order_by,
            'order' => $order,
            's' => $search
        ];
        
        if (!empty($tax_query)) {
            $query_args['tax_query'] = $tax_query;
        }
        
        // Execute query
        $query = new \WP_Query($query_args);
        
        // Render posts
        ob_start();
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $this->render_card($post_type, [
                    'show_featured_image' => $show_featured_image,
                    'show_excerpt' => $show_excerpt,
                    'show_date' => $show_date,
                    'show_author' => $show_author
                ]);
            }
        } else {
            $this->render_no_results();
        }
        $posts_html = ob_get_clean();
        
        // Render pagination
        ob_start();
        if ($query->max_num_pages > 1) {
            echo paginate_links([
                'total' => $query->max_num_pages,
                'current' => $paged,
                'prev_text' => '<span aria-label="' . esc_attr__('Previous page', 'wagepoint') . '">←</span>',
                'next_text' => '<span aria-label="' . esc_attr__('Next page', 'wagepoint') . '">→</span>',
                'type' => 'list',
                'before_page_number' => '<span class="screen-reader-text">' . __('Page', 'wagepoint') . ' </span>'
            ]);
        }
        $pagination_html = ob_get_clean();
        
        wp_reset_postdata();
        
        // Send response
        wp_send_json_success([
            'html' => $posts_html,
            'pagination_html' => $pagination_html,
            'found_posts' => $query->found_posts,
            'post_count' => $query->post_count,
            'max_pages' => $query->max_num_pages,
            'current_page' => $paged
        ]);
    }
}

// Initialize the block
new Filterable_Grid_Block();