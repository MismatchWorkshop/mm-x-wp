import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function SortableLogoItem({ id, logo, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="sortable-logo-item"
            {...attributes}
            {...listeners}
        >
            <img src={logo.url} alt={logo.alt} />
            <Button
                icon="no-alt"
                label={__('Remove logo', 'wagepoint')}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="remove-logo-button"
                isDestructive
            />
        </div>
    );
}