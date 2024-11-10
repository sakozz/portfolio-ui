import { createThemes } from 'tw-colors';
import withMT from '@material-tailwind/html/utils/withMT.js';

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1200px',
        xl: '1200px',
        '2xl': '1200px',
      },
    },
    extend: {},
    boxShadow: {
      //box shadow from Neom designs
      'lvl-3-top':
        '0px -0.5px 1px 0px rgba(52, 48, 44, 0.01), 0px -1.5px 3px 0px rgba(52, 48, 44, 0.01), 0px -4px 8px 0px rgba(52, 48, 44, 0.02), 0px -8px 16px 0px rgba(52, 48, 44, 0.03)',
      'lvl-3-bottom':
        '0px 0.5px 1px 0px rgba(52, 48, 44, 0.01), 0px 1.5px 3px 0px rgba(52, 48, 44, 0.01), 0px 4px 8px 0px rgba(52, 48, 44, 0.02), 0px 8px 16px 0px rgba(52, 48, 44, 0.03)',
      'lvl-3-right':
        '0.5px 0px 1px 0px rgba(52, 48, 44, 0.01), 1.5px 0px 3px 0px rgba(52, 48, 44, 0.01), 4px 0px 8px 0px rgba(52, 48, 44, 0.02), 8px 0px 16px 0px rgba(52, 48, 44, 0.03)',
      'lvl-4-top':
        '0px -1px 2px 0px rgba(52, 48, 44, 0.02), 0px -3px 6px 0px rgba(52, 48, 44, 0.03), 0px -8px 16px 0px rgba(52, 48, 44, 0.04), 0px -16px 32px 0px rgba(52, 48, 44, 0.06)',
      'lvl-4-bottom':
        '0px 1px 2px 0px rgba(52, 48, 44, 0.02), 0px 3px 6px 0px rgba(52, 48, 44, 0.03), 0px 8px 16px 0px rgba(52, 48, 44, 0.04), 0px 16px 32px 0px rgba(52, 48, 44, 0.06)',
      'lvl-4-right':
        '1px 0px 2px 0px rgba(52, 48, 44, 0.02), 3px 0px 6px 0px rgba(52, 48, 44, 0.03), 8px 0px 16px 0px rgba(52, 48, 44, 0.04), 16px 0px 32px 0px rgba(52, 48, 44, 0.06)',
      'lvl-4-left':
        '-1px 0px 2px 0px rgba(52, 48, 44, 0.02), -3px 0px 6px 0px rgba(52, 48, 44, 0.03), -8px 0px 16px 0px rgba(52, 48, 44, 0.04), -16px 0px 32px 0px rgba(52, 48, 44, 0.06)',
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          light: {
            5: '#F6F5F3',
            15: '#f3f2ee',
            110: '#1D19170D', //hover-bg
            115: '#79736C1A', //sidemenu-active
            120: '#79736C26', //active-bg
            125: '#79736C40', // sidemenu-selected-active
            130: 'rgba(0,0,0, 0.16)', //border
            135: '#0908071A', // dropdown-border
            140: 'rgba(0,0,0, 0.26)', //hover-border
            145: '#2A252333', // accordion-border
            150: 'rgba(0, 0, 0, 0.32)', //active-border
            155: '#C6C0B6',
            160: '#72777A',
            165: '#979C9E',
          },
          dark: {
            20: '#D6D1C6',
            30: '#B5B0A6',
            40: '#968F87',
            45: '#878079',
            50: '#79736C',
            60: '#615A54',
            70: '#4B4440',
            80: '#35302D',
            90: '#1D1917',
            100: '#1E1B19',
            105: '#7D766F',
            110: '#645D57',
            120: '#13100DBF',
            130: '#1E1E1E',
            140: '#202325',
          },
          primary: {
            50: '#f6f6f6',
            100: '#e7e7e7',
            200: '#d1d1d1',
            300: '#b0b0b0',
            400: '#888888',
            500: '#6d6d6d',
            600: '#5d5d5d',
            700: '#4f4f4f',
            800: '#454545',
            900: '#3d3d3d',
            950: '#030303',
          },
          secondary: {
            50: '#fff4ed',
            100: '#ffe5d4',
            200: '#ffc6a8',
            300: '#ff9f71',
            400: '#ff6b38',
            500: '#fe5020',
            600: '#ef2907',
            700: '#c61a08',
            800: '#9d180f',
            900: '#7e1710',
            950: '#440706',
          },
          blue: {
            10: '#E0EEFF',
            50: '#007AB2',
            60: '#F2F8FF',
          },
          green: {
            5: '#D9FFE8',
            10: '#AAFFCF',
            50: '#008453',
            60: '#7DDE86',
          },
          red: {
            40: '#F85959',
            55: '#CB1B19',
            100: '#FEE8E0',
          },
          gold: {
            30: '#DFA700',
            35: '#CB9700',
            40: '#B78900',
            50: '#946D00',
            60: '#FBF8E8',
          },
          orange: {
            50: '#B35C00',
          },
        },
        dark: {
          primary: 'turquoise',
          base: 'tomato',
          surface: '#4A4A4A',
        },
      },
      { defaultTheme: 'light' },
    ),
  ],
});
