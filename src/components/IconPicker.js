import { SelectControl, TextControl, Spinner, Button, BaseControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

const PRESET_ICONS = {
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    lightning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
};

function IconPicker({ value, onChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch custom icons from WordPress
    const { customIcons, isLoading, iconMap } = useSelect((select) => {
        const { getEntityRecords, isResolving } = select('core');
        const icons = getEntityRecords('postType', 'icon', { per_page: -1 });
        
        // Create a map of icon IDs to SVG code for lookup
        const map = {};
        const iconData = icons?.map(icon => {
            const iconId = `custom-${icon.id}`;
            map[iconId] = icon.svg_code || '';
            return {
                id: iconId,
                label: icon.title.rendered,
                svg: icon.svg_code || '',
            };
        }) || [];
        
        return {
            customIcons: iconData,
            isLoading: isResolving('getEntityRecords', ['postType', 'icon', { per_page: -1 }]),
            iconMap: map,
        };
    }, []);

    // Add preset icons to the map
    const allIconMap = {
        ...iconMap,
        ...PRESET_ICONS,
    };

    // Prepare preset icons for display
    const presetIconsData = Object.keys(PRESET_ICONS).map(key => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        svg: PRESET_ICONS[key],
    }));

    // Find the current icon's ID by matching SVG content
    const getCurrentIconId = () => {
        if (!value.svg) return '';
        
        // Check if it's a preset icon
        const presetKey = Object.keys(PRESET_ICONS).find(key => 
            PRESET_ICONS[key] === value.svg
        );
        if (presetKey) return presetKey;
        
        // Check if it's a custom icon
        const customKey = Object.keys(iconMap).find(key => 
            iconMap[key] === value.svg
        );
        if (customKey) return customKey;
        
        return '';
    };

    const handleIconChange = (iconId) => {
        if (!iconId) {
            onChange({ ...value, svg: '' });
            return;
        }
        
        const svgCode = allIconMap[iconId] || '';
        onChange({ ...value, svg: svgCode });
    };

    // Filter icons based on search
    const filteredCustomIcons = customIcons.filter(icon =>
        icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPresetIcons = presetIconsData.filter(icon =>
        icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentIconId = getCurrentIconId();

    // Combine all filtered icons into one array
    const allFilteredIcons = [...filteredCustomIcons, ...filteredPresetIcons];

    return (
        <div className="icon-picker-control">
            <style>
                {`
                    .icon-picker-icon svg {
                        fill: #000000 !important;
                        color: #000000 !important;
                    }
                    .icon-picker-icon svg * {
                        fill: #000000 !important;
                        color: #000000 !important;
                    }
                `}
            </style>
            <SelectControl
                label="Icon Type"
                value={value.type}
                options={[
                    { label: 'Choose Icon (SVG)', value: 'svg' },
                    { label: 'Upload Image', value: 'image' },
                ]}
                onChange={(type) => onChange({ ...value, type })}
            />

            {value.type === 'svg' && (
                <>
                    {isLoading ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <Spinner />
                            <p style={{ fontSize: '12px', color: '#6B7280' }}>
                                Loading icons...
                            </p>
                        </div>
                    ) : (
                        <BaseControl label="Choose Icon" id="icon-picker-grid">
                            {/* Search Input */}
                            <TextControl
                                placeholder="Search icons..."
                                value={searchTerm}
                                onChange={setSearchTerm}
                                style={{ marginBottom: '12px' }}
                            />

                            {/* Icon Grid */}
                            <div style={{ 
                                maxHeight: '300px', 
                                overflowY: 'auto',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '12px',
                                backgroundColor: '#fafafa'
                            }}>
                                {allFilteredIcons.length > 0 ? (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                                        gap: '8px'
                                    }}>
                                        {allFilteredIcons.map(icon => (
                                            <Button
                                                key={icon.id}
                                                onClick={() => handleIconChange(icon.id)}
                                                title={icon.label}
                                                style={{
                                                    height: '50px',
                                                    width: '50px',
                                                    padding: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: currentIconId === icon.id ? '2px solid #2271b1' : '1px solid #ddd',
                                                    backgroundColor: currentIconId === icon.id ? '#f0f6fc' : '#f5f5f5',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    position: 'relative'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentIconId !== icon.id) {
                                                        e.currentTarget.style.borderColor = '#2271b1';
                                                        e.currentTarget.style.backgroundColor = '#e8e8e8';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentIconId !== icon.id) {
                                                        e.currentTarget.style.borderColor = '#ddd';
                                                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                                                    }
                                                }}
                                            >
                                                <div 
                                                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                                                    style={{ 
                                                        width: '28px', 
                                                        height: '28px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#000000',
                                                        fill: '#000000'
                                                    }}
                                                    className="icon-picker-icon"
                                                />
                                            </Button>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ 
                                        textAlign: 'center', 
                                        padding: '20px',
                                        color: '#666',
                                        fontSize: '13px'
                                    }}>
                                        No icons found matching "{searchTerm}"
                                    </div>
                                )}
                            </div>
                        </BaseControl>
                    )}
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '8px 0' }}>
                        Need a new icon? <a href="/wp-admin/post-new.php?post_type=icon" target="_blank">Add one here</a>
                    </p>
                </>
            )}

            {value.type === 'image' && (
                <TextControl
                    label="Image URL"
                    value={value.src}
                    onChange={(src) => onChange({ ...value, src })}
                    help="Enter the URL of your icon image"
                />
            )}
        </div>
    );
}

export default IconPicker;