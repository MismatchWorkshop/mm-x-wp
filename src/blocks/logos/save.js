import { useBlockProps } from '@wordpress/block-editor';
import { COLOR_SYSTEM } from '../../color-system';

export default function save({ attributes }) {
    const { displayMode, logos, gridColumns, carouselSpeed, pauseOnHover, backgroundColor, rowGap } = attributes;

    const blockProps = useBlockProps.save({
        className: `logos-block logos-${displayMode}`,
        style: {
            backgroundColor: backgroundColor
        },
    });

    if (displayMode === 'carousel') {
        return (
            <div {...blockProps}>
                <div 
                    className="logos-carousel-container"
                    data-speed={carouselSpeed}
                    data-pause={pauseOnHover}
                >
                    <div className="logos-carousel-track">
                        {/* Duplicate logos for infinite scroll effect */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={`${logo.id}-${index}`} className="logo-item">
                                <img src={logo.url} alt={logo.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Grid mode
    return (
        <div {...blockProps}>
            <div 
                className="logos-grid"
                style={{
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                    rowGap: rowGap,
                }}
            >
                {logos.map((logo) => (
                    <div key={logo.id} className="logo-item">
                        <img src={logo.url} alt={logo.alt} loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}