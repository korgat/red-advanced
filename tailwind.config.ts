import type { Config } from 'tailwindcss'

export default {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			width: {
				'opened-sidebar': 'var(--sidebar-width)',
				'closed-sidebar': 'var(--sidebar-width-closed)'
			},
			borderColor: {
				DEFAULT: 'var(--default-color-border)'
			},
			colors: {
				primary: 'var(--color-primary)',
				background: 'var(--color-background)',
				border: 'var(--color-border)'
			},
			padding: {
				layout: '1.2rem'
			},
			margin: {
				layout: '1.2rem'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '333ms'
			}
		}
	},
	plugins: []
} satisfies Config
