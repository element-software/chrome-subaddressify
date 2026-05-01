import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { WebSocketServer } from 'ws';

const RELOAD_PORT = 9999;

function extensionAutoReload(): Plugin {
  let wss: WebSocketServer | undefined;

  return {
    name: 'extension-auto-reload',
    apply: 'build',
    buildStart() {
      if (this.meta.watchMode && !wss) {
        wss = new WebSocketServer({ port: RELOAD_PORT });
      }
    },
    writeBundle() {
      wss?.clients.forEach(client => client.send('reload'));
    },
    transform(code, id) {
      if (!this.meta.watchMode || !id.includes('src/background/index.ts')) return;
      return {
        code: [
          `const __reloadWs = new WebSocket('ws://localhost:${RELOAD_PORT}');`,
          `__reloadWs.onmessage = () => chrome.runtime.reload();`,
          code,
        ].join('\n'),
      };
    },
  };
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'background.js';
          if (chunkInfo.name === 'content') return 'content.js';
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  plugins: [
    extensionAutoReload(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' },
        { src: 'src/icons/*', dest: 'icons' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@subaddressify/shared': resolve(__dirname, '../../packages/shared/src/index.ts'),
    },
  },
});
