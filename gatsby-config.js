module.exports = {
	siteMetadata: {
		title:
			'LJD · Building interactive interfaces, graphics and animations · Freelance contractor · Laust J Deleuran',
		shortTitle: 'LJD',
		description:
			'I’m Laust. I’m a creative technologist, UX designer &amp; front-end developer. I like creating stuff.',
		author: '@laustdeleuran',
		links: [
			{
				title: 'About me',
				link: '/about-laust-johan-deleuran',
			},
			{
				title: 'My work',
				link: '/my-work',
			},
			{
				title: 'Get in touch',
				link: '/about-laust-johan-deleuran#get-in-touch',
			},
		],
	},
	plugins: [
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/src/markdown-pages`,
			},
		},
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Laust J Deleuran',
				short_name: 'LJD',
				start_url: '/',
				background_color: '#FFFFFF',
				theme_color: '#56f29c',
				display: 'minimal-ui',
				icon: 'src/images/laust-johan-deleuran-square.jpg', // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	],
};
