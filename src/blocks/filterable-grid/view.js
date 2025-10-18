/**
 * Frontend JavaScript for Filterable Grid Block
 * 
 * @package MyTheme
 */

class FilterableGrid {
    constructor(element) {
        this.element = element;
        this.config = {
            postType: element.dataset.postType,
            postsPerPage: parseInt(element.dataset.postsPerPage),
            columns: parseInt(element.dataset.columns),
            orderBy: element.dataset.orderBy,
            order: element.dataset.order,
            showFeaturedImage: element.dataset.showFeaturedImage === '1',
            showExcerpt: element.dataset.showExcerpt === '1',
            showDate: element.dataset.showDate === '1',
            showAuthor: element.dataset.showAuthor === '1'
        };
        
        // DOM elements
        this.grid = element.querySelector('.filterable-grid-block__grid');
        this.gridWrapper = element.querySelector('.filterable-grid-block__grid-wrapper');
        this.loading = element.querySelector('.filterable-grid-block__loading');
        this.pagination = element.querySelector('.filterable-grid-block__pagination');
        this.searchInput = element.querySelector('.filterable-grid-block__search-input');
        this.filterSelects = element.querySelectorAll('.filterable-grid-block__filter-select');
        this.sortSelect = element.querySelector('.filterable-grid-block__sort-select');
        this.resultsCount = element.querySelector('.filterable-grid-block__results-count');
        this.activeFiltersContainer = element.querySelector('.filterable-grid-block__active-filters');
        this.activeFiltersList = element.querySelector('.filterable-grid-block__active-filters-list');
        this.clearFiltersBtn = element.querySelector('.filterable-grid-block__clear-filters');
        
        // State
        this.currentPage = 1;
        this.searchTimeout = null;
        this.activeFilters = {};
        this.searchQuery = '';
        this.isLoading = false;
        
        this.init();
    }
    
    /**
     * Initialize all event listeners
     */
    init() {
        // Search functionality with debounce
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.searchQuery = e.target.value;
                    this.currentPage = 1;
                    this.fetchPosts();
                }, 500);
            });
            
            // Handle search button click
            const searchButton = this.element.querySelector('.filterable-grid-block__search-button');
            if (searchButton) {
                searchButton.addEventListener('click', () => {
                    this.searchQuery = this.searchInput.value;
                    this.currentPage = 1;
                    this.fetchPosts();
                });
            }
            
            // Handle Enter key
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    clearTimeout(this.searchTimeout);
                    this.searchQuery = this.searchInput.value;
                    this.currentPage = 1;
                    this.fetchPosts();
                }
            });
        }
        
        // Filter dropdowns
        this.filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                const taxonomy = e.target.dataset.taxonomy;
                const value = e.target.value;
                
                if (value) {
                    this.activeFilters[taxonomy] = {
                        termId: value,
                        termName: e.target.options[e.target.selectedIndex].text.split(' (')[0]
                    };
                } else {
                    delete this.activeFilters[taxonomy];
                }
                
                this.currentPage = 1;
                this.updateActiveFiltersDisplay();
                this.fetchPosts();
            });
        });
        
        // Sort select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                const [orderBy, order] = e.target.value.split('-');
                this.config.orderBy = orderBy;
                this.config.order = order;
                this.currentPage = 1;
                this.fetchPosts();
            });
        }
        
        // Pagination
        this.element.addEventListener('click', (e) => {
            const pageLink = e.target.closest('.page-numbers');
            if (pageLink && !pageLink.classList.contains('current')) {
                e.preventDefault();
                
                if (pageLink.classList.contains('prev')) {
                    this.currentPage--;
                } else if (pageLink.classList.contains('next')) {
                    this.currentPage++;
                } else {
                    const pageText = pageLink.textContent.trim();
                    this.currentPage = parseInt(pageText);
                }
                
                this.fetchPosts();
                this.scrollToTop();
            }
        });
        
        // Clear all filters
        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
        
        // Remove individual filter
        this.element.addEventListener('click', (e) => {
            if (e.target.closest('.filterable-grid-block__active-filter-remove')) {
                e.preventDefault();
                const taxonomy = e.target.closest('.filterable-grid-block__active-filter-remove').dataset.taxonomy;
                this.removeFilter(taxonomy);
            }
        });
    }
    
    /**
     * Fetch posts via AJAX
     */
    async fetchPosts() {
        if (this.isLoading) return;
        
        this.showLoading();
        this.isLoading = true;
        
        const formData = new FormData();
        formData.append('action', 'filter_grid_posts');
        formData.append('nonce', filterableGridData.nonce);
        formData.append('post_type', this.config.postType);
        formData.append('posts_per_page', this.config.postsPerPage);
        formData.append('paged', this.currentPage);
        formData.append('search', this.searchQuery);
        formData.append('orderby', this.config.orderBy);
        formData.append('order', this.config.order);
        formData.append('show_featured_image', this.config.showFeaturedImage ? '1' : '0');
        formData.append('show_excerpt', this.config.showExcerpt ? '1' : '0');
        formData.append('show_date', this.config.showDate ? '1' : '0');
        formData.append('show_author', this.config.showAuthor ? '1' : '0');
        
        // Add filters
        Object.entries(this.activeFilters).forEach(([taxonomy, data]) => {
            formData.append(`filters[${taxonomy}]`, data.termId);
        });
        
        try {
            const response = await fetch(filterableGridData.ajaxUrl, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                this.updateGrid(data.data);
                this.updatePagination(data.data);
                this.updateResultsCount(data.data);
                this.updateURL();
            } else {
                console.error('Error fetching posts:', data);
                this.showError();
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            this.showError();
        } finally {
            this.hideLoading();
            this.isLoading = false;
        }
    }
    
    /**
     * Update grid with new content
     */
    updateGrid(data) {
        // Fade out
        this.grid.style.opacity = '0';
        
        setTimeout(() => {
            this.grid.innerHTML = data.html;
            
            // Fade in
            requestAnimationFrame(() => {
                this.grid.style.opacity = '1';
            });
            
            // Trigger custom event for external scripts
            this.element.dispatchEvent(new CustomEvent('gridUpdated', {
                detail: {
                    foundPosts: data.found_posts,
                    postCount: data.post_count,
                    currentPage: data.current_page
                }
            }));
        }, 200);
    }
    
    /**
     * Update pagination
     */
    updatePagination(data) {
        if (!this.pagination) return;
        
        if (data.max_pages <= 1) {
            this.pagination.style.display = 'none';
        } else {
            this.pagination.style.display = 'block';
            this.pagination.innerHTML = data.pagination_html;
            this.pagination.dataset.maxPages = data.max_pages;
            this.pagination.dataset.currentPage = data.current_page;
        }
    }
    
    /**
     * Update results count
     */
    updateResultsCount(data) {
        if (!this.resultsCount) return;
        
        const message = data.found_posts > 0
            ? this.getResultsMessage(data.post_count, data.found_posts)
            : this.getNoResultsMessage();
        
        this.resultsCount.textContent = message;
    }
    
    /**
     * Get results message
     */
    getResultsMessage(showing, total) {
        if (window.wp && window.wp.i18n) {
            return wp.i18n.sprintf(
                wp.i18n.__('Showing %d of %d results', 'mytheme'),
                showing,
                total
            );
        }
        return `Showing ${showing} of ${total} results`;
    }
    
    /**
     * Get no results message
     */
    getNoResultsMessage() {
        if (window.wp && window.wp.i18n) {
            return wp.i18n.__('No results found', 'mytheme');
        }
        return 'No results found';
    }
    
    /**
     * Update active filters display
     */
    updateActiveFiltersDisplay() {
        if (!this.activeFiltersContainer || !this.activeFiltersList) return;
        
        const filterCount = Object.keys(this.activeFilters).length;
        
        if (filterCount === 0) {
            this.activeFiltersContainer.style.display = 'none';
            return;
        }
        
        this.activeFiltersContainer.style.display = 'flex';
        
        // Build filter tags HTML
        const filtersHTML = Object.entries(this.activeFilters).map(([taxonomy, data]) => {
            const taxonomyLabel = this.getTaxonomyLabel(taxonomy);
            return `
                <span class="filterable-grid-block__active-filter">
                    <span class="filterable-grid-block__active-filter-label">
                        ${taxonomyLabel}:
                    </span>
                    <span class="filterable-grid-block__active-filter-value">
                        ${this.escapeHtml(data.termName)}
                    </span>
                    <button type="button" 
                            class="filterable-grid-block__active-filter-remove" 
                            data-taxonomy="${taxonomy}"
                            aria-label="${this.getRemoveFilterLabel(data.termName)}">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </span>
            `;
        }).join('');
        
        this.activeFiltersList.innerHTML = filtersHTML;
    }
    
    /**
     * Get taxonomy label
     */
    getTaxonomyLabel(taxonomy) {
        const select = this.element.querySelector(`[data-taxonomy="${taxonomy}"]`);
        if (!select) return taxonomy;
        
        const firstOption = select.querySelector('option:first-child');
        return firstOption ? firstOption.textContent : taxonomy;
    }
    
    /**
     * Get remove filter label
     */
    getRemoveFilterLabel(termName) {
        if (window.wp && window.wp.i18n) {
            return wp.i18n.sprintf(
                wp.i18n.__('Remove filter: %s', 'mytheme'),
                termName
            );
        }
        return `Remove filter: ${termName}`;
    }
    
    /**
     * Remove individual filter
     */
    removeFilter(taxonomy) {
        delete this.activeFilters[taxonomy];
        
        // Reset dropdown
        const select = this.element.querySelector(`[data-taxonomy="${taxonomy}"]`);
        if (select) {
            select.value = '';
        }
        
        this.currentPage = 1;
        this.updateActiveFiltersDisplay();
        this.fetchPosts();
    }
    
    /**
     * Clear all filters
     */
    clearAllFilters() {
        this.activeFilters = {};
        this.searchQuery = '';
        this.currentPage = 1;
        
        // Reset all dropdowns
        this.filterSelects.forEach(select => {
            select.value = '';
        });
        
        // Reset search input
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        // Reset sort to default
        if (this.sortSelect) {
            this.sortSelect.value = `${this.element.dataset.orderBy}-${this.element.dataset.order}`;
            this.config.orderBy = this.element.dataset.orderBy;
            this.config.order = this.element.dataset.order;
        }
        
        this.updateActiveFiltersDisplay();
        this.fetchPosts();
    }
    
    /**
     * Update URL with current state (optional - for sharing/bookmarking)
     */
    updateURL() {
        if (!window.history || !window.history.pushState) return;
        
        const url = new URL(window.location);
        const params = url.searchParams;
        
        // Clear existing params
        ['page', 's', 'orderby', 'order'].forEach(key => params.delete(key));
        Object.keys(this.activeFilters).forEach(taxonomy => params.delete(taxonomy));
        
        // Add current state
        if (this.currentPage > 1) {
            params.set('page', this.currentPage);
        }
        
        if (this.searchQuery) {
            params.set('s', this.searchQuery);
        }
        
        if (this.config.orderBy !== this.element.dataset.orderBy || 
            this.config.order !== this.element.dataset.order) {
            params.set('orderby', this.config.orderBy);
            params.set('order', this.config.order);
        }
        
        Object.entries(this.activeFilters).forEach(([taxonomy, data]) => {
            params.set(taxonomy, data.termId);
        });
        
        window.history.pushState({}, '', url.toString());
    }
    
    /**
     * Show loading state
     */
    showLoading() {
        if (this.loading) {
            this.loading.hidden = false;
        }
        
        if (this.gridWrapper) {
            this.gridWrapper.classList.add('is-loading');
        }
        
        // Disable interactive elements
        this.setInteractiveState(true);
    }
    
    /**
     * Hide loading state
     */
    hideLoading() {
        if (this.loading) {
            this.loading.hidden = true;
        }
        
        if (this.gridWrapper) {
            this.gridWrapper.classList.remove('is-loading');
        }
        
        // Re-enable interactive elements
        this.setInteractiveState(false);
    }
    
    /**
     * Set interactive state
     */
    setInteractiveState(disabled) {
        if (this.searchInput) {
            this.searchInput.disabled = disabled;
        }
        
        this.filterSelects.forEach(select => {
            select.disabled = disabled;
        });
        
        if (this.sortSelect) {
            this.sortSelect.disabled = disabled;
        }
    }
    
    /**
     * Show error message
     */
    showError() {
        const errorMessage = this.getErrorMessage();
        this.grid.innerHTML = `
            <div class="filterable-grid-block__error">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2"/>
                    <path d="M24 14V26" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="24" cy="32" r="1.5" fill="currentColor"/>
                </svg>
                <p>${errorMessage}</p>
                <button type="button" class="filterable-grid-block__retry-button">
                    ${this.getRetryButtonText()}
                </button>
            </div>
        `;
        
        // Add retry handler
        const retryButton = this.grid.querySelector('.filterable-grid-block__retry-button');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                this.fetchPosts();
            });
        }
    }
    
    /**
     * Get error message
     */
    getErrorMessage() {
        if (window.wp && window.wp.i18n) {
            return wp.i18n.__('Something went wrong while loading posts. Please try again.', 'mytheme');
        }
        return 'Something went wrong while loading posts. Please try again.';
    }
    
    /**
     * Get retry button text
     */
    getRetryButtonText() {
        if (window.wp && window.wp.i18n) {
            return wp.i18n.__('Retry', 'mytheme');
        }
        return 'Retry';
    }
    
    /**
     * Scroll to top of grid
     */
    scrollToTop() {
        const offset = 100; // pixels above the element
        const elementTop = this.element.getBoundingClientRect().top + window.pageYOffset;
        const scrollTo = elementTop - offset;
        
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }
    
    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Initialize from URL parameters (optional)
     */
    initFromURL() {
        const url = new URL(window.location);
        const params = url.searchParams;
        
        // Page
        const page = params.get('page');
        if (page) {
            this.currentPage = parseInt(page);
        }
        
        // Search
        const search = params.get('s');
        if (search && this.searchInput) {
            this.searchQuery = search;
            this.searchInput.value = search;
        }
        
        // Order
        const orderBy = params.get('orderby');
        const order = params.get('order');
        if (orderBy && order) {
            this.config.orderBy = orderBy;
            this.config.order = order;
            if (this.sortSelect) {
                this.sortSelect.value = `${orderBy}-${order}`;
            }
        }
        
        // Taxonomies
        this.filterSelects.forEach(select => {
            const taxonomy = select.dataset.taxonomy;
            const termId = params.get(taxonomy);
            if (termId) {
                select.value = termId;
                const termName = select.options[select.selectedIndex].text.split(' (')[0];
                this.activeFilters[taxonomy] = { termId, termName };
            }
        });
        
        // Update display if we have filters from URL
        if (Object.keys(this.activeFilters).length > 0) {
            this.updateActiveFiltersDisplay();
        }
        
        // Fetch if URL has parameters
        if (page || search || orderBy || Object.keys(this.activeFilters).length > 0) {
            this.fetchPosts();
        }
    }
}

/**
 * Initialize all filterable grids on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.filterable-grid-block');
    
    grids.forEach(gridElement => {
        const instance = new FilterableGrid(gridElement);
        
        // Optionally initialize from URL parameters
        // instance.initFromURL();
        
        // Store instance on element for external access
        gridElement.filterableGridInstance = instance;
    });
});

/**
 * Expose FilterableGrid class globally for external access
 */
window.FilterableGrid = FilterableGrid;