import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl, 
    ToggleControl,
    TextControl,
    RangeControl,
    Notice
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
    const { 
        taxonomy, 
        postType,
        showLabel, 
        placeholder,
        style,
        showCount,
        orderBy,
        order,
        hideEmpty,
        showAllOption,
        allOptionText,
        multiSelect,
        hierarchical,
        maxDepth
    } = attributes;
    
    // Get available post types
    const postTypes = useSelect((select) => {
        const { getPostTypes } = select('core');
        const types = getPostTypes({ per_page: -1 });
        return types?.filter(type => 
            type.viewable && 
            !['attachment', 'wp_block'].includes(type.slug)
        ) || [];
    }, []);
    
    // Get taxonomies for selected post type
    const taxonomies = useSelect((select) => {
        if (!postType) return [];
        const { getTaxonomies } = select('core');
        return getTaxonomies({ type: postType, per_page: -1 }) || [];
    }, [postType]);
    
    // Get selected taxonomy object
    const selectedTaxonomy = taxonomies.find(tax => tax.slug === taxonomy);
    const isHierarchical = selectedTaxonomy?.hierarchical || false;
    
    const blockProps = useBlockProps({
        className: 'taxonomy-filter-block-editor'
    });
    
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Filter Settings', 'mytheme')} initialOpen={true}>
                    
                    <SelectControl
                        label={__('Post Type', 'mytheme')}
                        value={postType}
                        options={[
                            { label: __('Select Post Type', 'mytheme'), value: '' },
                            ...postTypes.map(type => ({
                                label: type.labels.singular_name,
                                value: type.slug
                            }))
                        ]}
                        onChange={(value) => {
                            setAttributes({ postType: value });
                            // Reset taxonomy when post type changes
                            setAttributes({ taxonomy: '' });
                        }}
                    />
                    
                    {postType && taxonomies.length > 0 && (
                        <SelectControl
                            label={__('Taxonomy', 'mytheme')}
                            value={taxonomy}
                            options={[
                                { label: __('Select Taxonomy', 'mytheme'), value: '' },
                                ...taxonomies.map(tax => ({
                                    label: tax.name,
                                    value: tax.slug
                                }))
                            ]}
                            onChange={(value) => setAttributes({ taxonomy: value })}
                        />
                    )}
                    
                    {postType && taxonomies.length === 0 && (
                        <Notice status="warning" isDismissible={false}>
                            {__('No taxonomies available for this post type.', 'mytheme')}
                        </Notice>
                    )}
                    
                </PanelBody>
                
                <PanelBody title={__('Display Settings', 'mytheme')} initialOpen={false}>
                    
                    <SelectControl
                        label={__('Style', 'mytheme')}
                        value={style}
                        options={[
                            { label: __('Dropdown', 'mytheme'), value: 'dropdown' },
                            { label: __('Buttons', 'mytheme'), value: 'buttons' },
                            { label: __('Checkboxes', 'mytheme'), value: 'checkboxes' },
                            { label: __('Radio Buttons', 'mytheme'), value: 'radio' }
                        ]}
                        onChange={(value) => setAttributes({ style: value })}
                    />
                    
                    <ToggleControl
                        label={__('Show Label', 'mytheme')}
                        checked={showLabel}
                        onChange={(value) => setAttributes({ showLabel: value })}
                    />
                    
                    {style === 'dropdown' && (
                        <TextControl
                            label={__('Placeholder Text', 'mytheme')}
                            value={placeholder}
                            onChange={(value) => setAttributes({ placeholder: value })}
                            help={__('Leave empty for default text', 'mytheme')}
                        />
                    )}
                    
                    <ToggleControl
                        label={__('Show Count', 'mytheme')}
                        checked={showCount}
                        onChange={(value) => setAttributes({ showCount: value })}
                        help={__('Display post count for each term', 'mytheme')}
                    />
                    
                    {(style === 'buttons' || style === 'radio' || style === 'dropdown') && (
                        <>
                            <ToggleControl
                                label={__('Show "All" Option', 'mytheme')}
                                checked={showAllOption}
                                onChange={(value) => setAttributes({ showAllOption: value })}
                            />
                            
                            {showAllOption && (
                                <TextControl
                                    label={__('"All" Option Text', 'mytheme')}
                                    value={allOptionText}
                                    onChange={(value) => setAttributes({ allOptionText: value })}
                                    help={__('Leave empty for default text', 'mytheme')}
                                />
                            )}
                        </>
                    )}
                    
                    {style === 'dropdown' && (
                        <ToggleControl
                            label={__('Multi-Select', 'mytheme')}
                            checked={multiSelect}
                            onChange={(value) => setAttributes({ multiSelect: value })}
                            help={__('Allow selecting multiple terms', 'mytheme')}
                        />
                    )}
                    
                    {isHierarchical && (
                        <>
                            <ToggleControl
                                label={__('Show Hierarchy', 'mytheme')}
                                checked={hierarchical}
                                onChange={(value) => setAttributes({ hierarchical: value })}
                                help={__('Display terms in hierarchical structure', 'mytheme')}
                            />
                            
                            {hierarchical && (
                                <RangeControl
                                    label={__('Max Depth', 'mytheme')}
                                    value={maxDepth}
                                    onChange={(value) => setAttributes({ maxDepth: value })}
                                    min={0}
                                    max={5}
                                    help={__('Maximum depth to display (0 = unlimited)', 'mytheme')}
                                />
                            )}
                        </>
                    )}
                    
                </PanelBody>
                
                <PanelBody title={__('Sorting Settings', 'mytheme')} initialOpen={false}>
                    
                    <SelectControl
                        label={__('Order By', 'mytheme')}
                        value={orderBy}
                        options={[
                            { label: __('Name', 'mytheme'), value: 'name' },
                            { label: __('Count', 'mytheme'), value: 'count' },
                            { label: __('Slug', 'mytheme'), value: 'slug' },
                            { label: __('Term ID', 'mytheme'), value: 'term_id' }
                        ]}
                        onChange={(value) => setAttributes({ orderBy: value })}
                    />
                    
                    <SelectControl
                        label={__('Order', 'mytheme')}
                        value={order}
                        options={[
                            { label: __('Ascending', 'mytheme'), value: 'ASC' },
                            { label: __('Descending', 'mytheme'), value: 'DESC' }
                        ]}
                        onChange={(value) => setAttributes({ order: value })}
                    />
                    
                    <ToggleControl
                        label={__('Hide Empty', 'mytheme')}
                        checked={hideEmpty}
                        onChange={(value) => setAttributes({ hideEmpty: value })}
                        help={__('Hide terms with no posts', 'mytheme')}
                    />
                    
                </PanelBody>
            </InspectorControls>
            
            <div {...blockProps}>
                <div className="taxonomy-filter-block-editor__preview">
                    <div className="taxonomy-filter-block-editor__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="taxonomy-filter-block-editor__info">
                        <h4>{__('Taxonomy Filter', 'mytheme')}</h4>
                        <p>
                            {taxonomy ? (
                                <>
                                    <strong>{selectedTaxonomy?.name || taxonomy}</strong>
                                    {' • '}
                                    {style}
                                    {showCount && ` • ${__('with count', 'mytheme')}`}
                                </>
                            ) : (
                                __('Configure filter settings in the sidebar', 'mytheme')
                            )}
                        </p>
                    </div>
                </div>
                
                {taxonomy && (
                    <div className="taxonomy-filter-block-editor__settings">
                        <span className={`taxonomy-filter-block-editor__badge ${showLabel ? 'is-active' : ''}`}>
                            {showLabel ? '✓' : '✗'} {__('Label', 'mytheme')}
                        </span>
                        <span className={`taxonomy-filter-block-editor__badge ${showCount ? 'is-active' : ''}`}>
                            {showCount ? '✓' : '✗'} {__('Count', 'mytheme')}
                        </span>
                        <span className={`taxonomy-filter-block-editor__badge ${hideEmpty ? 'is-active' : ''}`}>
                            {hideEmpty ? '✓' : '✗'} {__('Hide Empty', 'mytheme')}
                        </span>
                        {isHierarchical && (
                            <span className={`taxonomy-filter-block-editor__badge ${hierarchical ? 'is-active' : ''}`}>
                                {hierarchical ? '✓' : '✗'} {__('Hierarchical', 'mytheme')}
                            </span>
                        )}
                    </div>
                )}
                
                {!taxonomy && (
                    <div className="taxonomy-filter-block-editor__notice">
                        <p>{__('Select a post type and taxonomy to configure this filter.', 'mytheme')}</p>
                    </div>
                )}
            </div>
        </>
    );
}