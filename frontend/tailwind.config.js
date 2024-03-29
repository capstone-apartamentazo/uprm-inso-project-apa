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
			height: {
				128: '32rem',
			},
			maxHeight: {
				'128': '32rem',
				'semi': '80vh',
			  },
			maxWidth:{
				'semi':'100vh',
			},
			spacing: {
				82: '22rem'
			},
			minHeight: (theme) => ({
				...theme('spacing'),
			  }),
		},
	},
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#5C9EAD',
					secondary: '#326273',
					accent: '#E39774',
					'accent-focus': '#dc8056',
					neutral: '#ffffff',
					error: '#c13336',
					'base-100': '#f9fafb',
				},
			},
		],
	},
	variants: {},
	
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
};
