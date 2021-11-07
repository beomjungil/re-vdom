const { config, clean, copyPublic } = require('./esbuild.config');
const { build } = require('esbuild');
const chokidar = require('chokidar');
const fs = require('fs-extra');

chokidar.watch('.', { ignored: /dist|node_modules|.git/ }).on('all', (event, path) => {
    clean();
    copyPublic();

    build({
        ...config,
        watch: {
            onRebuild(error, result) {
                if (error) console.error('Build failed:', error)
                else console.log('Build succeeded')
            },
        }
    }).catch(() => process.exit(1));
});
