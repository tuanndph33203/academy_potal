/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        /* 🎨 1. Original*/
        'gradient-original':
          'linear-gradient(to right, #bbf7d0, #38bdf8, #fb923c, #facc15, #0ea5e9, #dcfce7)',
        /* 🌌 2. Phim Hàn – Tím Hồng Xanh */
        'gradient-han':
          'linear-gradient(to right, #f472b6, #a78bfa, #38bdf8, #f9a8d4)',
        /* 🔮 3. Netflix / Disney vibe – Xanh Tím Hồng */
        'gradient-netflix':
          'linear-gradient(to right, #38bdf8, #6366f1, #a855f7, #e879f9)',
        /* ☀️ 4. K-Drama ấm áp – Cam Vàng Hồng */
        'gradient-romantic':
          'linear-gradient(to right, #fb923c, #fcd34d, #f472b6, #fdba74)',
        /* 🌊 5. Xanh mát hiện đại – Teal Cyan Sky Green */
        'gradient-fresh':
          'linear-gradient(to right, #5eead4, #22d3ee, #38bdf8, #86efac)',
        /* 💎 6. Sang trọng sâu màu – Violet Fuchsia Sky Blue */
        'gradient-premium':
          'linear-gradient(to right, #8b5cf6, #d946ef, #38bdf8, #60a5fa)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        }
      }
    },
  },
  plugins: [],
}

