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
		},
	},
	daisyui: {
		styled: true,
		themes: false,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
	  },
	variants: {},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'),require("daisyui")],
};
