import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

console.log('Registering metric block:', metadata);

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});

console.log('Metric block registered successfully');