/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './public/index.html',
    'tailwind.config.{js,cjs,mjs,ts}'
  ],
  theme: {
    extend: {
      width:{
        '1100': '1100px'
      },

      backgroundColor:{
        primary: '#F5F5F5',
        secondary1: '#196EC0',//xanh 3
        secondary2: '#F5676F',//đỏ
        secondary3: '#6FDFF9',//xanh 2
        secondary4: '#218AB9',//xanh 1
        secondary5: '#FDFCC6',//vàng
        secondary6: '#F69B4B',//cam
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      },

      colors:{
        secondary1: '#196EC0',//xanh 3
        secondary2: '#F5676F',//đỏ
        secondary3: '#6FDFF9',//xanh 2
        secondary4: '#218AB9',//xanh 1
        secondary5: '#FDFCC6',//vàng
        secondary6: '#F69B4B'//cam
      },

      maxWidth:{
        '600': '600px',
        '1100': '1100px'
      },

      minWidth:{
        '300': '300px',
        '200': '200px'
      },

      flex:{
        '3': '3 3 0%'
      }
    },
  },
  plugins: [],
}

