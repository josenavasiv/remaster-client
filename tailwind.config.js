/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            width: {
                'w-mega-max': 'var(--max-width)',
            },
        },
    },
    plugins: [],
};
