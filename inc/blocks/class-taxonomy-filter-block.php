<?php
/**
 * Taxonomy Filter Block
 * 
 * A standalone filter block that can be used independently or with the Filterable Grid
 *
 * @package wagepoint
 */

namespace wagepoint\Blocks;

class Taxonomy_Filter_Block {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'register_block']);
    }
    
    /**
     * Register the block
     */
    public function register_block(): void {
        register_block_type(
            get_template_directory() . '/build/blocks/taxonomy-filter',
            [
                'render_callback' => [$this, 'render_callback'],
                'attributes' => [
                    'taxonomy' => [
                        'type' => 'string',
                        'default' => 'category'
                    ],
                    'postType' => [
                        'type' => 'string',
                        'default' => 'post'
                    ],
                    'showLabel' => [
                        'type' => 'boolean',
                        'default' => true
                    ],
                    'placeholder' => [
                        'type' => 'string',
                        'default' => ''
                    ],
                    'style' => [
                        'type' => 'string',
                        'default' => 'dropdown',
                        'enum' => ['dropdown', 'buttons', 'checkboxes', 'radio']
                    ],
                    'showCount' => [
                        'type' => 'boolean',
                        'default' => false
                    ],
                    'orderBy' => [
                        'type' => 'string',
                        'default' => 'name',
                        'enum' => ['name', 'count', 'slug', 'term_id']
                    ],
                    'order' => [
                        'type' => 'string',
                        'default' => 'ASC',
                        'enum' => ['ASC', 'DESC']
                    ],
                    'hideEmpty' => [
                        'type' => 'boolean',
                        'default' => true
                    ],
                    'showAllOption' => [
                        'type' => 'boolean',
                        'default' => true
                    ],
                    'allOptionText' => [
                        'type' => 'string',
                        'default' => ''
                    ],
                    'multiSelect' => [
                        'type' => 'boolean',
                        'default' => false
                    ],
                    'hierarchical' => [
                        'type' => 'boolean',
                        'default' => false
                    ],
                    'maxDepth' => [
                        'type' => 'number',
                        'default' => 0
                    ]
                ]
            ]
        );
    }
    
    /**
     * Render callback
     */
    public function render_callback($attributes, $content, $block): string {
        // Extract attributes
        $taxonomy = $attributes['taxonomy'] ?? 'category';
        $post_type = $attributes['postType'] ?? 'post';
        $show_label = $attributes['showLabel'] ?? true;
        $placeholder = $attributes['placeholder'] ?? '';
        $style = $attributes['style'] ?? 'dropdown';
        $show_count = $attributes['showCount'] ?? false;
        $order_by = $attributes['orderBy'] ?? 'name';
        $order = $attributes['order'] ?? 'ASC';
        $hide_empty = $attributes['hideEmpty'] ?? true;
        $show_all = $attributes['showAllOption'] ?? true;
        $all_text = $attributes['allOptionText'] ?? '';
        $multi_select = $attributes['multiSelect'] ?? false;
        $hierarchical = $attributes['hierarchical'] ?? false;
        $max_depth = $attributes['maxDepth'] ?? 0;
        
        // Get taxonomy object
        $tax_obj = get_taxonomy($taxonomy);
        if (!$tax_obj) {
            return $this->render_error(__('Invalid taxonomy selected.', 'wagepoint'));
        }
        
        // Check if taxonomy is associated with post type
        if (!in_array($post_type, $tax_obj->object_type)) {
            return $this->render_error(
                sprintf(
                    __('Taxonomy "%s" is not associated with post type "%s".', 'wagepoint'),
                    $taxonomy,
                    $post_type
                )
            );
        }
        
        // Get terms
        $terms = $this->get_terms([
            'taxonomy' => $taxonomy,
            'hide_empty' => $hide_empty,
            'orderby' => $order_by,
            'order' => $order,
            'hierarchical' => $hierarchical,
            'max_depth' => $hierarchical ? $max_depth : 0
        ]);
        
        if (empty($terms) && !is_wp_error($terms)) {
            return ''; // Return nothing if no terms
        }
        
        if (is_wp_error($terms)) {
            return $this->render_error($terms->get_error_message());
        }
        
        // Set defaults
        $label = $show_label ? $tax_obj->labels->singular_name : '';
        $placeholder = $placeholder ?: sprintf(
            __('Select %s', 'wagepoint'),
            $tax_obj->labels->singular_name
        );
        $all_text = $all_text ?: sprintf(
            __('All %s', 'wagepoint'),
            $tax_obj->labels->name
        );
        
        // Get wrapper attributes
        $wrapper_attributes = get_block_wrapper_attributes([
            'class' => 'taxonomy-filter-block taxonomy-filter-block--' . $style,
            'data-taxonomy' => $taxonomy,
            'data-post-type' => $post_type,
            'data-style' => $style,
            'data-multi-select' => $multi_select ? '1' : '0'
        ]);
        
        ob_start();
        ?>
        <div <?php echo $wrapper_attributes; ?>>
            <?php
            switch ($style) {
                case 'buttons':
                    $this->render_button_style($terms, $taxonomy, $label, $show_count, $show_all, $all_text);
                    break;
                    
                case 'checkboxes':
                    $this->render_checkbox_style($terms, $taxonomy, $label, $show_count, $hierarchical);
                    break;
                    
                case 'radio':
                    $this->render_radio_style($terms, $taxonomy, $label, $show_count, $show_all, $all_text, $hierarchical);
                    break;
                    
                case 'dropdown':
                default:
                    $this->render_dropdown_style($terms, $taxonomy, $label, $placeholder, $show_count, $show_all, $all_text, $multi_select, $hierarchical);
                    break;
            }
            ?>
        </div>
        <?php
        
        return ob_get_clean();
    }
    
    /**
     * Get terms with optional hierarchy
     */
    private function get_terms(array $args): array {
        $defaults = [
            'taxonomy' => 'category',
            'hide_empty' => true,
            'orderby' => 'name',
            'order' => 'ASC',
            'hierarchical' => false,
            'max_depth' => 0
        ];
        
        $args = wp_parse_args($args, $defaults);
        $hierarchical = $args['hierarchical'];
        $max_depth = $args['max_depth'];
        
        unset($args['hierarchical'], $args['max_depth']);
        
        $terms = get_terms($args);
        
        if (is_wp_error($terms) || empty($terms)) {
            return $terms;
        }
        
        // Build hierarchy if needed
        if ($hierarchical) {
            return $this->build_term_hierarchy($terms, 0, $max_depth);
        }
        
        return $terms;
    }
    
    /**
     * Build hierarchical term structure
     */
    private function build_term_hierarchy(array $terms, int $parent = 0, int $max_depth = 0, int $depth = 0): array {
        if ($max_depth > 0 && $depth >= $max_depth) {
            return [];
        }
        
        $branch = [];
        
        foreach ($terms as $term) {
            if ($term->parent == $parent) {
                $term->depth = $depth;
                $term->children = $this->build_term_hierarchy($terms, $term->term_id, $max_depth, $depth + 1);
                $branch[] = $term;
            }
        }
        
        return $branch;
    }
    
    /**
     * Render dropdown style
     */
    private function render_dropdown_style($terms, string $taxonomy, string $label, string $placeholder, bool $show_count, bool $show_all, string $all_text, bool $multi_select, bool $hierarchical): void {
        $unique_id = 'taxonomy-filter-' . wp_unique_id();
        ?>
        <div class="taxonomy-filter-block__dropdown">
            <?php if ($label): ?>
                <label for="<?php echo esc_attr($unique_id); ?>" class="taxonomy-filter-block__label">
                    <?php echo esc_html($label); ?>
                </label>
            <?php endif; ?>
            
            <select 
                id="<?php echo esc_attr($unique_id); ?>"
                class="taxonomy-filter-block__select" 
                data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                <?php echo $multi_select ? 'multiple' : ''; ?>
                aria-label="<?php echo esc_attr(sprintf(__('Filter by %s', 'wagepoint'), $label)); ?>">
                
                <?php if ($show_all && !$multi_select): ?>
                    <option value=""><?php echo esc_html($all_text); ?></option>
                <?php endif; ?>
                
                <?php 
                if ($hierarchical) {
                    $this->render_hierarchical_options($terms, $show_count);
                } else {
                    foreach ($terms as $term):
                ?>
                    <option value="<?php echo esc_attr($term->term_id); ?>">
                        <?php echo esc_html($term->name); ?>
                        <?php if ($show_count): ?>
                            (<?php echo esc_html($term->count); ?>)
                        <?php endif; ?>
                    </option>
                <?php 
                    endforeach;
                }
                ?>
            </select>
        </div>
        <?php
    }
    
    /**
     * Render hierarchical options
     */
    private function render_hierarchical_options(array $terms, bool $show_count, string $prefix = ''): void {
        foreach ($terms as $term) {
            ?>
            <option value="<?php echo esc_attr($term->term_id); ?>">
                <?php echo esc_html($prefix . $term->name); ?>
                <?php if ($show_count): ?>
                    (<?php echo esc_html($term->count); ?>)
                <?php endif; ?>
            </option>
            <?php
            
            if (!empty($term->children)) {
                $this->render_hierarchical_options($term->children, $show_count, $prefix . '— ');
            }
        }
    }
    
    /**
     * Render button style
     */
    private function render_button_style($terms, string $taxonomy, string $label, bool $show_count, bool $show_all, string $all_text): void {
        ?>
        <div class="taxonomy-filter-block__buttons">
            <?php if ($label): ?>
                <span class="taxonomy-filter-block__label">
                    <?php echo esc_html($label); ?>
                </span>
            <?php endif; ?>
            
            <div class="taxonomy-filter-block__button-group" role="group" aria-label="<?php echo esc_attr($label); ?>">
                <?php if ($show_all): ?>
                    <button type="button" 
                            class="taxonomy-filter-block__button is-active" 
                            data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                            data-term-id=""
                            aria-pressed="true">
                        <?php echo esc_html($all_text); ?>
                    </button>
                <?php endif; ?>
                
                <?php 
                $flat_terms = $this->flatten_terms($terms);
                foreach ($flat_terms as $term): 
                ?>
                    <button type="button" 
                            class="taxonomy-filter-block__button" 
                            data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                            data-term-id="<?php echo esc_attr($term->term_id); ?>"
                            aria-pressed="false">
                        <?php echo esc_html($term->name); ?>
                        <?php if ($show_count): ?>
                            <span class="taxonomy-filter-block__count">(<?php echo esc_html($term->count); ?>)</span>
                        <?php endif; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render checkbox style
     */
    private function render_checkbox_style($terms, string $taxonomy, string $label, bool $show_count, bool $hierarchical): void {
        $unique_id = 'taxonomy-filter-' . wp_unique_id();
        ?>
        <div class="taxonomy-filter-block__checkboxes">
            <?php if ($label): ?>
                <span class="taxonomy-filter-block__label">
                    <?php echo esc_html($label); ?>
                </span>
            <?php endif; ?>
            
            <div class="taxonomy-filter-block__checkbox-group" role="group" aria-label="<?php echo esc_attr($label); ?>">
                <?php 
                if ($hierarchical) {
                    $this->render_hierarchical_checkboxes($terms, $taxonomy, $show_count, $unique_id);
                } else {
                    foreach ($terms as $term):
                        $checkbox_id = $unique_id . '-' . $term->term_id;
                ?>
                    <label class="taxonomy-filter-block__checkbox-label" for="<?php echo esc_attr($checkbox_id); ?>">
                        <input type="checkbox" 
                               class="taxonomy-filter-block__checkbox"
                               id="<?php echo esc_attr($checkbox_id); ?>"
                               data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                               value="<?php echo esc_attr($term->term_id); ?>">
                        <span class="taxonomy-filter-block__checkbox-text">
                            <?php echo esc_html($term->name); ?>
                            <?php if ($show_count): ?>
                                <span class="taxonomy-filter-block__count">(<?php echo esc_html($term->count); ?>)</span>
                            <?php endif; ?>
                        </span>
                    </label>
                <?php 
                    endforeach;
                }
                ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render hierarchical checkboxes
     */
    private function render_hierarchical_checkboxes(array $terms, string $taxonomy, bool $show_count, string $unique_id, int $depth = 0): void {
        foreach ($terms as $term) {
            $checkbox_id = $unique_id . '-' . $term->term_id;
            $indent = $depth > 0 ? str_repeat('—', $depth) . ' ' : '';
            ?>
            <label class="taxonomy-filter-block__checkbox-label" 
                   for="<?php echo esc_attr($checkbox_id); ?>"
                   style="padding-left: <?php echo esc_attr($depth * 1.5); ?>rem;">
                <input type="checkbox" 
                       class="taxonomy-filter-block__checkbox"
                       id="<?php echo esc_attr($checkbox_id); ?>"
                       data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                       value="<?php echo esc_attr($term->term_id); ?>">
                <span class="taxonomy-filter-block__checkbox-text">
                    <?php echo esc_html($indent . $term->name); ?>
                    <?php if ($show_count): ?>
                        <span class="taxonomy-filter-block__count">(<?php echo esc_html($term->count); ?>)</span>
                    <?php endif; ?>
                </span>
            </label>
            <?php
            
            if (!empty($term->children)) {
                $this->render_hierarchical_checkboxes($term->children, $taxonomy, $show_count, $unique_id, $depth + 1);
            }
        }
    }
    
    /**
     * Render radio style
     */
    private function render_radio_style($terms, string $taxonomy, string $label, bool $show_count, bool $show_all, string $all_text, bool $hierarchical): void {
        $unique_id = 'taxonomy-filter-' . wp_unique_id();
        $group_name = 'taxonomy-filter-' . $taxonomy . '-' . wp_unique_id();
        ?>
        <div class="taxonomy-filter-block__radios">
            <?php if ($label): ?>
                <span class="taxonomy-filter-block__label">
                    <?php echo esc_html($label); ?>
                </span>
            <?php endif; ?>
            
            <div class="taxonomy-filter-block__radio-group" role="radiogroup" aria-label="<?php echo esc_attr($label); ?>">
                <?php if ($show_all): ?>
                    <label class="taxonomy-filter-block__radio-label" for="<?php echo esc_attr($unique_id); ?>-all">
                        <input type="radio" 
                               class="taxonomy-filter-block__radio"
                               id="<?php echo esc_attr($unique_id); ?>-all"
                               name="<?php echo esc_attr($group_name); ?>"
                               data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                               value=""
                               checked>
                        <span class="taxonomy-filter-block__radio-text">
                            <?php echo esc_html($all_text); ?>
                        </span>
                    </label>
                <?php endif; ?>
                
                <?php 
                if ($hierarchical) {
                    $this->render_hierarchical_radios($terms, $taxonomy, $show_count, $unique_id, $group_name);
                } else {
                    foreach ($terms as $term):
                        $radio_id = $unique_id . '-' . $term->term_id;
                ?>
                    <label class="taxonomy-filter-block__radio-label" for="<?php echo esc_attr($radio_id); ?>">
                        <input type="radio" 
                               class="taxonomy-filter-block__radio"
                               id="<?php echo esc_attr($radio_id); ?>"
                               name="<?php echo esc_attr($group_name); ?>"
                               data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                               value="<?php echo esc_attr($term->term_id); ?>">
                        <span class="taxonomy-filter-block__radio-text">
                            <?php echo esc_html($term->name); ?>
                            <?php if ($show_count): ?>
                                <span class="taxonomy-filter-block__count">(<?php echo esc_html($term->count); ?>)</span>
                            <?php endif; ?>
                        </span>
                    </label>
                <?php 
                    endforeach;
                }
                ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render hierarchical radios
     */
    private function render_hierarchical_radios(array $terms, string $taxonomy, bool $show_count, string $unique_id, string $group_name, int $depth = 0): void {
        foreach ($terms as $term) {
            $radio_id = $unique_id . '-' . $term->term_id;
            $indent = $depth > 0 ? str_repeat('—', $depth) . ' ' : '';
            ?>
            <label class="taxonomy-filter-block__radio-label" 
                   for="<?php echo esc_attr($radio_id); ?>"
                   style="padding-left: <?php echo esc_attr($depth * 1.5); ?>rem;">
                <input type="radio" 
                       class="taxonomy-filter-block__radio"
                       id="<?php echo esc_attr($radio_id); ?>"
                       name="<?php echo esc_attr($group_name); ?>"
                       data-filter-taxonomy="<?php echo esc_attr($taxonomy); ?>"
                       value="<?php echo esc_attr($term->term_id); ?>">
                <span class="taxonomy-filter-block__radio-text">
                    <?php echo esc_html($indent . $term->name); ?>
                    <?php if ($show_count): ?>
                        <span class="taxonomy-filter-block__count">(<?php echo esc_html($term->count); ?>)</span>
                    <?php endif; ?>
                </span>
            </label>
            <?php
            
            if (!empty($term->children)) {
                $this->render_hierarchical_radios($term->children, $taxonomy, $show_count, $unique_id, $group_name, $depth + 1);
            }
        }
    }
    
    /**
     * Flatten hierarchical terms
     */
    private function flatten_terms(array $terms): array {
        $flat = [];
        
        foreach ($terms as $term) {
            $flat[] = $term;
            
            if (!empty($term->children)) {
                $flat = array_merge($flat, $this->flatten_terms($term->children));
            }
        }
        
        return $flat;
    }
    
    /**
     * Render error message
     */
    private function render_error(string $message): string {
        if (!current_user_can('edit_posts')) {
            return ''; // Don't show errors to non-editors
        }
        
        return sprintf(
            '<div class="taxonomy-filter-block__error" style="padding: 1rem; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c00;">
                <strong>%s:</strong> %s
            </div>',
            __('Taxonomy Filter Error', 'wagepoint'),
            esc_html($message)
        );
    }
}

// Initialize the block
new Taxonomy_Filter_Block();