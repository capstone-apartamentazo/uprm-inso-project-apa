module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#5C9EAD',
				secondary: '#326273',
				accent: '#E39774',
			},
			height:{
				'128': '32rem',
			}
		},
	},
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#5C9EAD',
					secondary: '#326273',
					accent: '#E39774',
					neutral: '#ffffff',
					'base-100': '#ffffff',
				},
			},
		],
	},
	variants: {},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
};
