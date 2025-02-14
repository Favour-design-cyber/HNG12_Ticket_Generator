/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				jejumyeongo: ['Jeju Myeongjo', 'serif'],
				roboto: ['Roboto', 'serif'],
				roadRage: ['Road Rage', 'cursive'],
				alatsi: ['Alatsi', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
