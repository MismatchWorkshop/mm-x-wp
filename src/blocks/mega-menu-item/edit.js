import { useBlockProps, RichText, InspectorControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { PanelBody, Popover, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import IconPicker from '../../components/IconPicker';
import ContextualColorPicker from '../../components/ContextualColorPicker';

export default function Edit({ attributes, setAttributes }) {
    const { icon, title, description, url, iconColor, textColor } = attributes;
    const [isEditingURL, setIsEditingURL] = useState(false);

    // Build class names
    const itemClasses = [
        'mega-menu-item',
        textColor && textColor !== 'auto' ? `text-${textColor}` : ''
    ].filter(Boolean).join(' ');

    const iconClasses = [
        'mega-menu-item__icon',
        iconColor ? `color-${iconColor}` : 'color-auto'
    ].filter(Boolean).join(' ');

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={url ? linkOff : link}
                        label={url ? 'Edit link' : 'Add link'}
                        onClick={() => setIsEditingURL(!isEditingURL)}
                    />
                </ToolbarGroup>
            </BlockControls>

            {isEditingURL && (
                <Popover
                    position="bottom center"
                    onClose={() => setIsEditingURL(false)}
                >
                    <LinkControl
                        value={{ url }}
                        onChange={(newValue) => {
                            setAttributes({ url: newValue.url });
                        }}
                        onRemove={() => setAttributes({ url: '' })}
                        settings={[]}
                    />
                </Popover>
            )}

            <InspectorControls>
                <PanelBody title="Menu Item Settings">
                    <IconPicker
                        label="Icon"
                        value={{ type: 'svg', svg: icon }}
                        onChange={(newIcon) => setAttributes({ icon: newIcon.svg })}
                    />
                    <ContextualColorPicker
                        label="Icon Color"
                        value={iconColor || 'auto'}
                        onChange={(color) => setAttributes({ iconColor: color })}
                        role="iconDefault"
                        containerBackground="white"
                    />
                    <ContextualColorPicker
                        label="Text Color"
                        value={textColor || 'auto'}
                        onChange={(color) => setAttributes({ textColor: color })}
                        containerBackground="white"
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps({ className: itemClasses })}>
                {icon && (
                    <div 
                        className={iconClasses}
                        dangerouslySetInnerHTML={{ __html: icon }}
                    />
                )}
                <div className="mega-menu-item__content">
                    <RichText
                        tagName="h3"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Menu Item Title"
                        className="mega-menu-item__title"
                    />
                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder="Description..."
                        className="mega-menu-item__description"
                    />
                </div>
            </div>
        </>
    );
}