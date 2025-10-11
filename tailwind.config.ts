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
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
            },
            fontFamily: {
                rubik: ['var(--font-rubik)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                roboto: ['var(--font-roboto)', 'sans-serif'],
                bangla: ['var(--font-tiro-bangla)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
