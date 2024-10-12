import type { Config } from "tailwindcss"

// Sort colors by numbers: https://elektrobild.org/tools/sort-colors
const colors = {
	primary: "#7749F8",
	"sub-primary": "#B69CFF",
	gold: "#FFC107",
	green: "#28A745",
	info: "#3D8BFD",
	danger: "#EC3A48",
	black: "#333333",
	white: "#FFF",
	gray: {
		100: "#F5F5F5",
		200: "#EFEFEF",
		300: "#D6D6D6",
		400: "#CCCCCC",
		500: "#7F7E7E",
		600: "#4b5563",
	},
}

const config: Config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		colors,
		screens: {
			// Mobile
			320: "320px",
			360: "360px",
			375: "375px",
			428: "428px",
			// Tablet
			640: "640px",
			768: "768px",
			1024: "1024px",
			1180: "1180px",
			// Desktop
			1280: "1280px",
			1440: "1440px",
			1680: "1680px",
			1860: "1860px",
		},
		fontFamily: {
			noto: ["var(--font-noto)"],
			inter: ["var(--font-inter)"],
			montserrat: ["Montserrat", "sans-serif"],
			"g-mono": ["var(--font-geist-mono)"],
			"g-sans": ["var(--font-geist-sans)"],
		},
		fontSize: {
			xs: ["14px", "130%"],
			sm: ["16px", "130%"],
			md: ["18px", "130%"],
			lg: ["20px", "130%"],
			xl: ["22px", "130%"],
			"2xl": ["28px", "130%"],
			"3xl": ["36px", "130%"],
		},
	},
	plugins: [],
}

export default config
