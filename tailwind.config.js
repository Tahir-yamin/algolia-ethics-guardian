/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'electric-blue': 'oklch(75% 0.18 200)',
                'safety-amber': 'oklch(78% 0.16 85)',
                'glass-bg': 'oklch(20% 0.02 240 / 0.4)',
                'glass-border': 'oklch(100% 0 0 / 0.1)',
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
}
