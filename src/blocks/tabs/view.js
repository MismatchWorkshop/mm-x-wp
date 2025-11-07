/**
 * Tabs Block - Frontend JavaScript
 * Dynamically builds tab navigation from Panel blocks and handles tab switching
 */

document.addEventListener('DOMContentLoaded', function() {
    const tabsContainers = document.querySelectorAll('[data-tabs]');

    tabsContainers.forEach(container => {
        const navContainer = container.querySelector('.wagepoint-tabs__nav');
        const panelsContainer = container.querySelector('.wagepoint-tabs__panels-container');
        const panels = panelsContainer.querySelectorAll('.wagepoint-panel');

        // Clear any existing navigation
        navContainer.innerHTML = '';

        // Build tab buttons from Panel blocks
        const tabs = [];
        panels.forEach((panel, index) => {
            const label = panel.getAttribute('data-label') || `Tab ${index + 1}`;
            // Use WordPress-generated ID or fallback to index
            const panelId = panel.id || `panel-${index}`;
            
            // Create tab button
            const tab = document.createElement('button');
            tab.className = `wagepoint-tabs__tab ${index === 0 ? 'is-active' : ''}`;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            tab.setAttribute('aria-controls', panelId);
            tab.setAttribute('id', `tab-${panelId}`);
            tab.setAttribute('data-tab-index', index);
            tab.textContent = label;
            
            navContainer.appendChild(tab);
            tabs.push(tab);

            // Set panel attributes for accessibility
            if (!panel.id) {
                panel.setAttribute('id', panelId);
            }
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', `tab-${panelId}`);
            
            // Set initial visibility - add Tabs-specific class
            if (index === 0) {
                panel.classList.add('is-active');
            } else {
                panel.classList.remove('is-active');
            }
        });

        // Add click handlers
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                tabs.forEach(t => {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                panels.forEach(p => p.classList.remove('is-active'));

                // Add active class to clicked tab and corresponding panel
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');
                panels[index].classList.add('is-active');
            });

            // Keyboard navigation
            tab.addEventListener('keydown', (e) => {
                let newIndex = index;

                if (e.key === 'ArrowRight') {
                    newIndex = index === tabs.length - 1 ? 0 : index + 1;
                } else if (e.key === 'ArrowLeft') {
                    newIndex = index === 0 ? tabs.length - 1 : index - 1;
                } else if (e.key === 'Home') {
                    newIndex = 0;
                } else if (e.key === 'End') {
                    newIndex = tabs.length - 1;
                } else {
                    return;
                }

                e.preventDefault();
                tabs[newIndex].click();
                tabs[newIndex].focus();
            });
        });
    });
});