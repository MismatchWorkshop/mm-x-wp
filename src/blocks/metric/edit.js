import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import IconPicker from '../../components/IconPicker';
import Icon from '../../components/Icon';

export default function Edit({ attributes, setAttributes }) {
    const { icon, title, description } = attributes;
    const blockProps = useBlockProps({
        className: 'metric'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Icon Settings">
                    <IconPicker
                        value={icon}
                        onChange={(newIcon) => setAttributes({ icon: newIcon })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="metric__wrapper">
                    <div className="metric__icon">
                        <Icon 
                            type={icon.type}
                            src={icon.src}
                            svg={icon.svg}
                            size={icon.size || 64}
                            backgroundColor={icon.backgroundColor}
                        />
                    </div>
                    <div className="metric__content">
                        <RichText
                            tagName="div"
                            className="metric__title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder="Enter metric title..."
                            allowedFormats={[]}
                        />
                        <RichText
                            tagName="div"
                            className="metric__description"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder="Enter description..."
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}