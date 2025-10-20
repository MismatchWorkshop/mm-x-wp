import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { color, position } = attributes;

    const blockProps = useBlockProps({
        className: `brand-accent brand-accent--${position}`,
        style: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            [position]: 0,
            width: '311px',
            pointerEvents: 'none',
            zIndex: 2
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Accent Settings', 'wagepoint')} initialOpen={true}>
                    <ColorPicker
                        color={color}
                        onChangeComplete={(value) => setAttributes({ color: value.hex })}
                        disableAlpha
                    />
                    <p style={{ marginTop: '1rem', fontSize: '12px', color: '#757575' }}>
                        {__('Default: Yellow (#FFBF46)', 'wagepoint')}
                    </p>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <svg 
                    width="311" 
                    height="586" 
                    viewBox="0 0 311 586" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <path 
                        d="M521.041 964.461C490.165 990.175 443.38 988.404 414.252 959.111L414.25 959.109L40.9639 584.633L31.9434 574.654C-7.31676 527.058 -7.31365 457.931 31.9512 410.338L40.9639 400.368L414.25 25.8906L414.252 25.8887C443.38 -3.40403 490.165 -5.17481 521.041 20.54L527.325 25.958C552.899 51.7352 558.188 89.9192 543.168 121.017L543.169 121.018L532.254 142.968L532.232 143.011L532.212 143.056C432.669 364.389 432.669 620.612 532.212 841.945L532.232 841.989L532.254 842.032L543.168 863.983C558.189 895.083 552.899 933.272 527.319 959.049L521.041 964.461Z" 
                        stroke={color} 
                        strokeWidth="5"
                        fill="none"
                    />
                </svg>
            </div>
        </>
    );
}