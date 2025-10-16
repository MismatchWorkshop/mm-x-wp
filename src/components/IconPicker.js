import { SelectControl, TextControl, RangeControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { COLOR_SYSTEM } from '../color-system';
import Icon from './Icon';

const IconPicker = ({ 
    value = { 
        type: 'svg', 
        src: '', 
        svg: '', 
        backgroundColor: 'payday-blue',
        size: 64
    },
    onChange,
    label = 'Icon Settings'
}) => {
    const [customIcons, setCustomIcons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch custom icons from WordPress
    useEffect(() => {
        fetch('/wp-json/wp/v2/icon?per_page=100&status=publish')
            .then(response => response.json())
            .then(icons => {
                const iconOptions = icons
                    .filter(icon => icon.svg_code) // Only icons with SVG code
                    .map(icon => ({
                        label: icon.title.rendered,
                        value: icon.svg_code,
                        id: icon.id,
                    }));
                setCustomIcons(iconOptions);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching icons:', error);
                setIsLoading(false);
            });
    }, []);

    // Built-in preset icons (fallback/starter set)
    const PRESET_ICONS = {
        home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        dollar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
        card: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
        person: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        lightning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',
    };

    const presetOptions = Object.keys(PRESET_ICONS).map(key => ({
        label: `${key.charAt(0).toUpperCase() + key.slice(1)} (Built-in)`,
        value: PRESET_ICONS[key]
    }));

    // Combine preset and custom icons
    const allIconOptions = [
        { label: 'Select an icon...', value: '' },
        ...(customIcons.length > 0 ? [
            { label: '── Custom Icons ──', value: '', disabled: true },
            ...customIcons,
        ] : []),
        { label: '── Built-in Icons ──', value: '', disabled: true },
        ...presetOptions,
    ];

    return (
        <div className="icon-picker-control">
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
                            <p style={{ fontSize: '12px', color: '#6B7280' }}>Loading icons...</p>
                        </div>
                    ) : (
                        <SelectControl
                            label="Choose Icon"
                            value={value.svg}
                            options={allIconOptions}
                            onChange={(svg) => onChange({ ...value, svg })}
                        />
                    )}
                    
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
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

            <SelectControl
                label="Background Color"
                value={value.backgroundColor}
                options={COLOR_SYSTEM.iconColorOptions}
                onChange={(backgroundColor) => onChange({ ...value, backgroundColor })}
            />

            <RangeControl
                label="Icon Size"
                value={value.size}
                onChange={(size) => onChange({ ...value, size })}
                min={32}
                max={128}
                step={8}
            />
            
            {(value.svg || value.src) && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                        Preview
                    </p>
                    <Icon 
                        type={value.type}
                        src={value.src}
                        svg={value.svg}
                        size={value.size}
                        backgroundColor={value.backgroundColor}
                        borderRadius="16px"
                    />
                </div>
            )}
        </div>
    );
};

export default IconPicker;