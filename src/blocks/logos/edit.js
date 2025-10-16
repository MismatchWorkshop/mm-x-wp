import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    RangeControl, 
    ToggleControl, 
    Button,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { COLOR_SYSTEM } from '../../color-system';
import SortableLogoItem from '../../components/SortableLogoItem';
import CarouselView from './carousel-view';
import GridView from './grid-view';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { displayMode, logos = [], gridColumns, carouselSpeed, pauseOnHover, backgroundColor, rowGap } = attributes;
    
    const blockProps = useBlockProps({
        style: {
            backgroundColor: backgroundColor,
        },
    });

    const addLogos = (newLogos) => {
        const updatedLogos = [...logos, ...newLogos.map(logo => ({
            id: logo.id,
            url: logo.url,
            alt: logo.alt || '',
        }))];
        setAttributes({ logos: updatedLogos });
    };

    const removeLogo = (index) => {
        const updatedLogos = logos.filter((_, i) => i !== index);
        setAttributes({ logos: updatedLogos });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            const oldIndex = logos.findIndex(logo => logo.id === active.id);
            const newIndex = logos.findIndex(logo => logo.id === over.id);
            
            const reorderedLogos = arrayMove(logos, oldIndex, newIndex);
            setAttributes({ logos: reorderedLogos });
        }
    };

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="image-flip-horizontal"
                        label={__('Carousel', 'wagepoint')}
                        isPressed={displayMode === 'carousel'}
                        onClick={() => setAttributes({ displayMode: 'carousel' })}
                    />
                    <ToolbarButton
                        icon="grid-view"
                        label={__('Grid', 'wagepoint')}
                        isPressed={displayMode === 'grid'}
                        onClick={() => setAttributes({ displayMode: 'grid' })}
                    />
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Logo Management', 'wagepoint')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={addLogos}
                            allowedTypes={['image']}
                            multiple
                            gallery
                            value={logos.map(logo => logo.id)}
                            render={({ open }) => (
                                <Button variant="secondary" onClick={open} className="add-logos-button">
                                    {logos.length === 0 ? __('Add Logos', 'wagepoint') : __('Add More Logos', 'wagepoint')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    
                    {logos.length > 0 && (
                        <p className="logos-count">
                            {logos.length} {logos.length === 1 ? __('logo', 'wagepoint') : __('logos', 'wagepoint')}
                        </p>
                    )}
                </PanelBody>

                {displayMode === 'carousel' && (
                    <PanelBody title={__('Carousel Settings', 'wagepoint')} initialOpen={true}>
                        <RangeControl
                            label={__('Animation Speed', 'wagepoint')}
                            value={carouselSpeed}
                            onChange={(value) => setAttributes({ carouselSpeed: value })}
                            min={10}
                            max={60}
                            help={__('Seconds to complete one loop', 'wagepoint')}
                        />
                        <ToggleControl
                            label={__('Pause on Hover', 'wagepoint')}
                            checked={pauseOnHover}
                            onChange={(value) => setAttributes({ pauseOnHover: value })}
                        />
                    </PanelBody>
                )}

                {displayMode === 'grid' && (
                    <PanelBody title={__('Grid Settings', 'wagepoint')} initialOpen={true}>
                        <RangeControl
                            label={__('Columns', 'wagepoint')}
                            value={gridColumns}
                            onChange={(value) => setAttributes({ gridColumns: value })}
                            min={3}
                            max={6}
                        />
                        <RangeControl
                            label={__('Row Gap', 'wagepoint')}
                            value={parseFloat(rowGap)}
                            onChange={(value) => setAttributes({ rowGap: `${value}rem` })}
                            min={1}
                            max={6}
                            step={0.5}
                            help={__('Space between rows', 'wagepoint')}
                        />
                    </PanelBody>
                )}

                <PanelBody title={__('Background', 'wagepoint')} initialOpen={false}>
                    <div className="color-palette">
                        {Object.entries(COLOR_SYSTEM.backgrounds).map(([key, config]) => (
                            <button
                                key={key}
                                className={`color-swatch ${backgroundColor === config.value ? 'is-selected' : ''}`}
                                style={{ backgroundColor: config.value }}
                                onClick={() => setAttributes({ backgroundColor: config.value })}
                                aria-label={config.label}
                                title={config.label}
                            />
                        ))}
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {logos.length === 0 ? (
                    <div className="logos-placeholder">
                        <p>{__('Add logos to get started', 'wagepoint')}</p>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={addLogos}
                                allowedTypes={['image']}
                                multiple
                                gallery
                                render={({ open }) => (
                                    <Button variant="primary" onClick={open}>
                                        {__('Add Logos', 'wagepoint')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                ) : (
                    <>
                        <div className="logos-editor-toolbar">
                            <span className="logos-mode-indicator">
                                {displayMode === 'carousel' ? __('Carousel Mode', 'wagepoint') : __('Grid Mode', 'wagepoint')}
                            </span>
                            <span className="logos-reorder-hint">
                                {__('Drag to reorder', 'wagepoint')}
                            </span>
                        </div>

                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={logos.map(logo => logo.id)} strategy={rectSortingStrategy}>
                                <div className={`logos-sortable-container ${displayMode}`}>
                                    {logos.map((logo, index) => (
                                        <SortableLogoItem
                                            key={logo.id}
                                            id={logo.id}
                                            logo={logo}
                                            onRemove={() => removeLogo(index)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>

                        <div className="logos-preview-divider">
                            <span>{__('Preview', 'wagepoint')}</span>
                        </div>

                        {displayMode === 'carousel' ? (
                            <CarouselView 
                                logos={logos} 
                                speed={carouselSpeed}
                                pauseOnHover={pauseOnHover}
                            />
                        ) : (
                            <GridView 
                                logos={logos} 
                                columns={gridColumns}
                                rowGap={rowGap}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}