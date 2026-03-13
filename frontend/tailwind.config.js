/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0f0f0f',
        primary: '#0f0f0f',
        accent: '#7c3aed',
        border: '#e7e7e7',
        muted: '#f6f6f6',
        success: '#166534',
        destructive: '#b91c1c',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 30px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
