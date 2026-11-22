import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Preact runs the React-style components: same code, about half the download.
export default defineConfig({
  plugins: [preact()],
});
