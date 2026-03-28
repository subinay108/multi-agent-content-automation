/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Syne', 'sans-serif'],
        mono:  ['DM Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        ink:    '#0a0a0f',
        paper:  '#f5f2ec',
        paper2: '#ede9e0',
        accent: '#e84d2a',
        accent2:'#2a6ee8',
        gold:   '#c8a84b',
        muted:  '#7a7568',
        border: '#d4cfc5',
        'status-green':  '#2d7a4f',
        'status-yellow': '#b87a10',
        'status-gray':   '#9a9490',
        'status-red':    '#c0392b',
      },
    },
  },
  plugins: [],
}
