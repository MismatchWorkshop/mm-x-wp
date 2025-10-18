export default function GridView({ logos, columns, rowGap }) {
    return (
        <div className="logos-block logos-grid">
            <div 
                className="logos-grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    rowGap: rowGap,
                }}
            >
                {logos.map((logo) => (
                    <div key={logo.id} className="logo-item">
                        <img src={logo.url} alt={logo.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
}