import { BaseControl, Button, Dropdown, ColorIndicator } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { COLOR_SYSTEM, getContextualColor, getContextualColorValue, getColorsByGroup } from '../color-system';

function ContextualColorPicker({ 
    label,
    value, 
    onChange,
    role = 'iconDefault',
    filterGroup = null,
    containerBackground = 'white' // Now passed as prop instead of context
}) {
    console.log('=== ContextualColorPicker Debug ===');
    console.log('Container Background:', containerBackground);
    console.log('Current value:', value);
    console.log('Role:', role);
    
    const suggestedColorKey = getContextualColor(containerBackground, role);
    const suggestedColorValue = getContextualColorValue(containerBackground, role);
    
    console.log('Suggested Color Key:', suggestedColorKey);
    console.log('Suggested Color Value:', suggestedColorValue);
    console.log('===================================');
    
    const availableColors = filterGroup 
        ? getColorsByGroup(filterGroup)
        : COLOR_SYSTEM.backgrounds;
    
    const getCurrentColor = () => {
        if (value === 'auto') {
            return suggestedColorValue;
        }
        return COLOR_SYSTEM.backgrounds[value]?.value || suggestedColorValue;
    };

    const getCurrentLabel = () => {
        if (value === 'auto') {
            const suggestedLabel = COLOR_SYSTEM.backgrounds[suggestedColorKey]?.label || 'Auto';
            return `Auto (${suggestedLabel})`;
        }
        return COLOR_SYSTEM.backgrounds[value]?.label || 'Unknown';
    };

    return (
        <BaseControl 
            label={label}
            help={value === 'auto' ? __('Adapts based on container background', 'wagepoint') : null}
        >
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
                        minWidth: '220px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Button
                            onClick={() => onChange('auto')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px',
                                width: '100%',
                                border: 'none',
                                backgroundColor: value === 'auto' ? '#f0f0f0' : 'transparent',
                                textAlign: 'left',
                                cursor: 'pointer',
                                borderBottom: '1px solid #e0e0e0',
                                marginBottom: '4px'
                            }}
                        >
                            <ColorIndicator colorValue={suggestedColorValue} />
                            <div>
                                <div style={{ fontWeight: 500 }}>Auto</div>
                                <div style={{ fontSize: '11px', color: '#666' }}>
                                    {COLOR_SYSTEM.backgrounds[suggestedColorKey]?.label}
                                </div>
                            </div>
                        </Button>

                        {Object.entries(availableColors).map(([key, config]) => (
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

export default ContextualColorPicker;