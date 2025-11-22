/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3182F6',
        'text-primary': '#191F28',
        'text-secondary': '#4E5968',
        'text-tertiary': '#8B95A1',
        background: '#FFFFFF',
        'background-secondary': '#F9FAFB',
        border: '#E5E8EB',
        hover: '#F2F4F6',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Pretendard',
          'Roboto',
          'Noto Sans KR',
          'Segoe UI',
          'Malgun Gothic',
          'sans-serif',
        ],
      },
    },
  },
  darkMode: 'media',
  plugins: [],
  darkMode: 'media',
}

