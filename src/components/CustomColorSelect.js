// Custom Color Select Component
import { BaseControl, Button, Dropdown, ColorIndicator } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function CustomColorSelect({ 
    label, 
    value, 
    onChange, 
    colors, 
    showAutoOption = false,
    autoColor = '#1a1a1a' 
}) {
    const getCurrentColor = () => {
        if (value === 'auto' && showAutoOption) {
            return autoColor;
        }
        return colors[value]?.value || '#000000';
    };

    const getCurrentLabel = () => {
        if (value === 'auto' && showAutoOption) {
            return 'Auto';
        }
        return colors[value]?.label || 'Unknown';
    };

    return (
        <BaseControl label={label}>
            <Dropdown
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            border: '1px solid #949494',
                            borderRadius: '2px',
                            backgroundColor: 'white',
                            width: '100%',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <ColorIndicator colorValue={getCurrentColor()} />
                        {getCurrentLabel()}
                    </Button>
                )}
                renderContent={() => (
                    <div style={{ 
                        padding: '8px',
                        minWidth: '200px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                        {Object.entries(colors).map(([key, config]) => (
                            <Button
                                key={key}
                                onClick={() => onChange(key)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px',
                                    width: '100%',
                                    border: 'none',
                                    backgroundColor: value === key ? '#f0f0f0' : 'transparent',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <ColorIndicator colorValue={config.value} />
                                {config.label}
                            </Button>
                        ))}
                    </div>
                )}
            />
        </BaseControl>
    );
}

export default CustomColorSelect;