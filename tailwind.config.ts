import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ruralhop: {
          forest: '#2D5016',      // Deep forest green
          meadow: '#7FB069',      // Fresh meadow green
          earth: '#8B4513',       // Rich earth brown
          sand: '#F4E4BC',        // Warm sand beige
          stone: '#8D7053',       // Natural stone
          moss: '#9CAF88',        // Soft moss green
          copper: '#B87333',      // Rustic copper
          cream: '#FFF8DC'        // Natural cream
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rural-texture': "url('/noise.svg')"
      },
    },
  },
  plugins: [],
}
export default config
