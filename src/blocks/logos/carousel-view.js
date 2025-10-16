
export default function CarouselView({ logos, speed, pauseOnHover }) {
    return (
        <div 
            className="logos-carousel-container"
            data-speed={speed}
            data-pause={pauseOnHover}
        >
            <div className="logos-carousel-track">
                {/* Duplicate logos for infinite scroll effect */}
                {[...logos, ...logos].map((logo, index) => (
                    <div key={`${logo.id}-${index}`} className="logo-item">
                        <img src={logo.url} alt={logo.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
}