/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        /* 🎨 1. Original – Đa sắc tươi sáng */
        'gradient-original':
          'linear-gradient(to right, #bbf7d0, #38bdf8, #fb923c, #facc15, #0ea5e9, #dcfce7)',

        /* 🌌 2. Phim Hàn – Tím Hồng Xanh */
        /* 🌌 2. Phim Hàn – Tím Hồng Xanh (6 màu, pastel mộng mơ) */
        'gradient-han':
          'linear-gradient(to right, #f9a8d4, #f472b6, #a78bfa, #60a5fa, #38bdf8, #c084fc)',

        /* 🔮 3. Netflix / Disney – Xanh Tím Hồng (6 màu, sang và lạnh) */
        'gradient-netflix':
          'linear-gradient(to right, #38bdf8, #0ea5e9, #6366f1, #7c3aed, #a855f7, #e879f9)',

        /* ☀️ 4. K-Drama ấm áp – Cam Vàng Hồng (6 màu, ấm áp và dịu) */
        'gradient-romantic':
          'linear-gradient(to right, #fb923c, #f59e0b, #fcd34d, #f9a8d4, #f472b6, #fdba74)',

        /* 🌊 5. Xanh mát hiện đại – Teal Cyan Sky Green (6 màu, tươi sáng) */
        'gradient-fresh':
          'linear-gradient(to right, #2dd4bf, #5eead4, #22d3ee, #38bdf8, #4ade80, #86efac)',

        /* 💎 6. Sang trọng sâu màu – Violet Fuchsia Sky Blue (6 màu, ánh tím lam cao cấp) */
        'gradient-premium':
          'linear-gradient(to right, #4f46e5, #8b5cf6, #d946ef, #a855f7, #38bdf8, #60a5fa)',

        /* ⚡ 7. Action / Sci-Fi – Xanh Neon Đen Bạc */
        'gradient-action':
          'linear-gradient(to right, #0f172a, #1e3a8a, #06b6d4, #38bdf8, #94a3b8, #0f172a)',

        /* 🌿 8. Nature / Healing – Lục Ngọc Bích Dịu Mát */
        'gradient-nature':
          'linear-gradient(to right, #bbf7d0, #86efac, #34d399, #22c55e, #4ade80, #a7f3d0)',

        /* 🕶️ 9. DarkTech / Hacker – Đen Xanh Dương Neon */
        'gradient-darktech':
          'linear-gradient(to right, #0f172a, #1e293b, #2563eb, #06b6d4, #0ea5e9, #1e40af)',

        /* 💖 10. Romantic Deep – Hồng Tím Trầm */
        'gradient-love':
          'linear-gradient(to right, #fda4af, #fb7185, #f472b6, #d946ef, #c084fc, #e879f9)',

        /* 🌇 11. Sunset – Cam Đỏ Tím */
        'gradient-sunset':
          'linear-gradient(to right, #fb923c, #f97316, #ef4444, #e879f9, #c084fc, #a855f7)',

        /* 🧊 12. Minimal / Ice Blue – Xanh Trắng Nhạt */
        'gradient-minimal':
          'linear-gradient(to right, #f0fdfa, #ccfbf1, #a5f3fc, #bae6fd, #e0f2fe, #f9fafb)',
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

