import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Neurodesign Color Palette - Calm and accessible colors
      colors: {
        // Primary Colors - Calm tones
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#4a90a4', // Main primary blue
          600: '#3a7a8a',
          700: '#2d6270',
          800: '#1e4a56',
          900: '#0f323c',
        },
        // Secondary Green - Calming nature tones
        secondary: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#7fb069', // Main secondary green
          600: '#6b9654',
          700: '#577c40',
          800: '#43622c',
          900: '#2f4818',
        },
        // Accent Purple - Gentle and supportive
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#9b7ede', // Main accent purple
          600: '#8b5cf6',
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#5b21b6',
        },
        // Neutral colors with warm undertones
        neutral: {
          50: '#fafafa',
          100: '#f7f3e9', // Warm cream
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Semantic colors with moderate contrast
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#6b8e23', // Olive green for success
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#daa520', // Golden rod for warning
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#cd5c5c', // Indian red for errors
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4682b4', // Steel blue for info
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      // Typography system with Inter font
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      // Accessibility-compliant font sizes
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
        hero: ['3.5rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
      },
      // Spacing scale for consistent rhythm
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Border radius for soft, approachable design
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Box shadows with subtle depth
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.15)',
        large: '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      // Animation durations respecting motion preferences
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      // Screen sizes for responsive design
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
