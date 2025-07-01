/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,md,mdx,svelte,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-monospace',
          'SF Mono',
          'Cascadia Code',
          'Source Code Pro',
          'Menlo',
          'Consolas',
          'DejaVu Sans Mono',
          'monospace',
        ],
        mono: [
          'ui-monospace',
          'SF Mono',
          'Cascadia Code',
          'Source Code Pro',
          'Menlo',
          'Consolas',
          'DejaVu Sans Mono',
          'monospace',
        ],
        tech: [
          'ui-monospace',
          'SF Mono',
          'Cascadia Code',
          'Source Code Pro',
          'Menlo',
          'Consolas',
          'DejaVu Sans Mono',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
