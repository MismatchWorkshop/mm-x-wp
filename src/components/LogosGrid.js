import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { __ } from '@wordpress/i18n';
import { 
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';

import { 
    Button,
    __experimentalHStack as HStack
} from '@wordpress/components';

import SortableLogoItem from './SortableLogoItem';

// Updated logos display with drag and drop
function LogosGrid({ logos, setAttributes, addLogo, removeLogo }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = logos.findIndex(logo => logo.id === active.id);
            const newIndex = logos.findIndex(logo => logo.id === over.id);

            const reorderedLogos = arrayMove(logos, oldIndex, newIndex);
            setAttributes({ logos: reorderedLogos });
        }
    };

    const handleReplace = (index, media) => {
        const newLogos = [...logos];
        newLogos[index] = {
            id: media.id,
            url: media.url,
            alt: media.alt || ''
        };
        setAttributes({ logos: newLogos });
    };

    return (
        <div className="logos-grid">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={logos.map(logo => logo.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {logos.map((logo, index) => (
                        <SortableLogoItem
                            key={logo.id}
                            logo={logo}
                            index={index}
                            onReplace={handleReplace}
                            onRemove={removeLogo}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {/* Add Logo button */}
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={addLogo}
                    allowedTypes={['image']}
                    render={({ open }) => (
                        <Button onClick={open} variant="secondary">
                            Add Logo
                        </Button>
                    )}
                />
            </MediaUploadCheck>
        </div>
    );
}

export default LogosGrid;