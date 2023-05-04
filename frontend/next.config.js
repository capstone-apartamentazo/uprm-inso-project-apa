module.exports = {
	publicRuntimeConfig: {
		site: {
			name: 'Apartamentazo',
			url: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://api.apartamentazo.com',
			title: 'Apartamentazo',
			description: 'Helping you find your next college apartment',
			socialPreview: '/images/preview.png',
		},
	},
	swcMinify: true,
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	images: {
		domains: ['images.unsplash.com'],
	},
};
