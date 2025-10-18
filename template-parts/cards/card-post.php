<?php
/**
 * Card Template: Post
 * 
 * @var array $card_options
 * @var int $post_id
 */

$options = get_query_var('card_options', []);
$show_featured_image = $options['show_featured_image'] ?? true;
$show_excerpt = $options['show_excerpt'] ?? false;
$show_date = $options['show_date'] ?? false;
$show_author = $options['show_author'] ?? false;

$categories = get_the_category();
?>

<article class="filterable-grid-block__card filterable-grid-block__card--post card--post" data-post-id="<?php echo esc_attr($post_id); ?>">
    
    <?php if ($show_featured_image && has_post_thumbnail()): ?>
    <div class="filterable-grid-block__card-image">
        <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('medium', ['loading' => 'lazy']); ?>
        </a>
        
        <!-- Add reading time for posts -->
        <div class="filterable-grid-block__card-badge">
            <?php echo esc_html(wagepoint_get_reading_time()); ?> min read
        </div>
    </div>
    <?php endif; ?>
    
    <div class="filterable-grid-block__card-content">
        
        <?php if (!empty($categories)): ?>
        <div class="filterable-grid-block__card-meta">
            <a href="<?php echo esc_url(get_category_link($categories[0]->term_id)); ?>" 
               class="filterable-grid-block__card-category">
                <?php echo esc_html($categories[0]->name); ?>
            </a>
        </div>
        <?php endif; ?>
        
        <h3 class="filterable-grid-block__card-title">
            <a href="<?php the_permalink(); ?>">
                <?php the_title(); ?>
            </a>
        </h3>
        
        <?php if ($show_excerpt): ?>
        <div class="filterable-grid-block__card-excerpt">
            <?php echo wp_trim_words(get_the_excerpt(), 25); ?>
        </div>
        <?php endif; ?>
        
        <?php if ($show_date || $show_author): ?>
        <div class="filterable-grid-block__card-footer">
            <?php if ($show_author): ?>
            <div class="filterable-grid-block__card-author">
                <?php echo get_avatar(get_the_author_meta('ID'), 24); ?>
                <span><?php the_author(); ?></span>
            </div>
            <?php endif; ?>
            
            <?php if ($show_date): ?>
            <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                <?php echo esc_html(get_the_date()); ?>
            </time>
            <?php endif; ?>
        </div>
        <?php endif; ?>
        
        <a href="<?php the_permalink(); ?>" class="filterable-grid-block__card-link">
            Read Article →
        </a>
        
    </div>
    
</article>