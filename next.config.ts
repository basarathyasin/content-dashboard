/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		rules: {
			"**/*.{tsx,jsx}": {
				loaders: [
					{
						loader: "@locator/webpack-loader",
						options: { env: "development" },
					},
				],
			},
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
};

module.exports = nextConfig;
