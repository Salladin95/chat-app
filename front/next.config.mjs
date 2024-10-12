/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		remotePatterns: [],
	},
	async rewrites() {
		return []
	},
};

export default nextConfig;
