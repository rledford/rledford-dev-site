/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,md,mdx,svelte,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Share Tech Mono', 'monospace'],
        mono: ['Share Tech Mono', 'monospace'],
        tech: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
