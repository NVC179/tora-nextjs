module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--wp--preset--color--black)',
        white: 'var(--wp--preset--color--white)',
        // Bạn có thể bổ sung thêm các biến màu ở đây nếu cần vào Tailwind utility
      },
      fontSize: {
        normal: 'var(--wp--preset--font-size--normal)',
        huge: 'var(--wp--preset--font-size--huge)',
        small: 'var(--wp--preset--font-size--small)',
        medium: 'var(--wp--preset--font-size--medium)',
        large: 'var(--wp--preset--font-size--large)',
        'x-large': 'var(--wp--preset--font-size--x-large)',
      },
      fontFamily: {
        notoSans: ['var(--font-noto-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
