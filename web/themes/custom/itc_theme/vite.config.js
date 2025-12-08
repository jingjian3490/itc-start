import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [],
    build: {
        // Build output directory
        outDir: 'dist',
        emptyOutDir: true,
        manifest: false,
        rollupOptions: {
            input: {
                // Only import the JS; import SCSS from the JS. Using two entry points will create a script2.js in the dist directory.
                // styles: path.resolve(__dirname, 'src/style.scss'),
                scripts: path.resolve(__dirname, 'src/js/main.js'),
            },
            output: {
                // Force CSS filename to style.css (for easier Drupal reference)
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'style.css';
                    }
                    return '[name][extname]';
                },
                // Force JS filename to script.js
                entryFileNames: 'script.js',
            },
        },
    },
});
