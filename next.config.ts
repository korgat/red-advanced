import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: ['encrypted-tbn0.gstatic.com'] // Add the domain here
	},
	reactStrictMode: true,
	poweredByHeader: false,
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
