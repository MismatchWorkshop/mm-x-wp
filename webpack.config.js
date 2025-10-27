const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs = require('fs');

// Auto-discover all blocks in src/blocks/
const blocksDir = path.resolve(process.cwd(), 'src/blocks');
const blockEntries = {};

if (fs.existsSync(blocksDir)) {
    const blockFolders = fs.readdirSync(blocksDir).filter(file => {
        return fs.statSync(path.join(blocksDir, file)).isDirectory();
    });

    blockFolders.forEach(blockName => {
        const blockIndexPath = path.join(blocksDir, blockName, 'index.js');
        if (fs.existsSync(blockIndexPath)) {
            blockEntries[`blocks/${blockName}/index`] = blockIndexPath;
        }

        const blockViewPath = path.join(blocksDir, blockName, 'view.js');
        if (fs.existsSync(blockViewPath)) {
            blockEntries[`blocks/${blockName}/view`] = blockViewPath;
        }
    });
    
}

module.exports = {
    ...defaultConfig,
    entry: {
        'index': './src/index.js',
        // Blocks (auto-discovered)
        ...blockEntries,
        
        // Color system only (no SCSS here!)
        'color-system': './src/color-system.js',
        'logos-frontend': './src/logos-frontend.js'
    },
};