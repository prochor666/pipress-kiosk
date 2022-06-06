import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        removeConsole(),
    ],
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    build: {
        extend(config, { isDev, isClient }) {
            config.module.rules.push({
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" }
            });
        }
    }
});
