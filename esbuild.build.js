const { config, clean, copyPublic } = require('./esbuild.config');
const { buildSync } = require('esbuild');

clean();
copyPublic();
buildSync({
    ...config,
    define: {
        'process.env.NODE_ENV': "'production'",
    }
});
