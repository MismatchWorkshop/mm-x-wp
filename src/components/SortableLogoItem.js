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

// Individual sortable logo item component
function SortableLogoItem({ logo, index, onReplace, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: logo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className="logo-item sortable-item"
            {...attributes}
        >
            {/* Drag handle */}
            <div className="drag-handle" {...listeners}>
                ⋮⋮
            </div>
            
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => onReplace(index, media)}
                    allowedTypes={['image']}
                    value={logo.id}
                    render={({ open }) => (
                        <div className="logo-wrapper">
                            <img 
                                src={logo.url} 
                                alt={logo.alt}
                                onClick={open}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="logo-controls">
                                <Button onClick={open} variant="secondary" isSmall>
                                    Replace
                                </Button>
                                <Button onClick={() => onRemove(index)} isDestructive isSmall>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    )}
                />
            </MediaUploadCheck>
        </div>
    );
}

export default SortableLogoItem;