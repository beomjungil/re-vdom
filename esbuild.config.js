const fs = require('fs-extra');

function clean() {
    fs.rmSync('./dist/static', { recursive: true, force: true });
}

function copyPublic() {
    fs.copySync('./public', './dist');
}

module.exports = {
    config: {
        entryPoints: ['src/example/app.ts'],
        bundle: true,
        minify: true,
        outdir: 'dist/static/js',
        sourcemap: true,
        target: 'es6',
    },
    clean: clean,
    copyPublic: copyPublic
}
