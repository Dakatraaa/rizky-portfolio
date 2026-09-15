import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF8F5',
          technical: '#F2EFE9',
          card: '#FFFFFF',
          dark: '#141414',
        },
        carbon: {
          DEFAULT: '#111111',
          muted: '#666666',
          border: '#111111',
          guide: '#E2DDD5',
        },
        kalcer: {
          orange: '#FF5500',
          cobalt: '#2563EB',
          yellow: '#FFE600',
          lime: '#B4F51C',
          pink: '#FF3E83',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-xs': '2px 2px 0px #111111',
        'brutal-sm': '3px 3px 0px #111111',
        'brutal': '4px 4px 0px #111111',
        'brutal-md': '5px 5px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
        'brutal-xl': '8px 8px 0px #111111',
        'brutal-cobalt': '4px 4px 0px #2563EB',
        'brutal-orange': '4px 4px 0px #FF5500',
        'brutal-yellow': '4px 4px 0px #FFE600',
      },
      borderWidth: {
        '2.5': '2.5px',
        '3': '3px',
      },
      rotate: {
        'neg-1.5': '-1.5deg',
        'neg-2': '-2deg',
        'neg-3': '-3deg',
        'pos-1': '1deg',
        'pos-1.5': '1.5deg',
      },
    },
  },
  plugins: [],
};

export default config;
