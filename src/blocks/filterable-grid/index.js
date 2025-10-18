import { registerBlockType } from '@wordpress/blocks';
import { filter } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,
    icon: {
        src: filter,
        foreground: '#10b981'
    },
    edit,
    save,
});