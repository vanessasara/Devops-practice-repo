/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			// Legacy colors (kept for compatibility)
  			primaryDark: '#1a1f25',
  			lightOrange: '#F5F9E9',
  			darkGray: '#1a1f25',
  			lightGray: '#272c35',
  			// Modern furniture design system
  			furniture: {
  				// Primary text colors
  				charcoal: '#2C3539',
  				navy: '#1F2937',
  				// Background colors
  				cream: '#FAF8F3',
  				beige: '#F5F1E8',
  				'warm-white': '#FDFCFA',
  				// Accent colors
  				terracotta: '#D4735C',
  				'terracotta-light': '#E89580',
  				sage: '#9CAF88',
  				'sage-light': '#B8C9A8',
  				gold: '#C9A962',
  				'gold-light': '#E0C98A',
  				// Neutral grays
  				gray: {
  					50: '#F9FAFB',
  					100: '#F3F4F6',
  					200: '#E5E7EB',
  					300: '#D1D5DB',
  					400: '#9CA3AF',
  					500: '#6B7280',
  					600: '#4B5563',
  					700: '#374151',
  					800: '#1F2937',
  					900: '#111827',
  				},
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			playfair: ['var(--font-playfair)', 'serif'],
  			inter: ['var(--font-inter)', 'sans-serif'],
  			heading: ['var(--font-playfair)', 'serif'],
  			body: ['var(--font-inter)', 'sans-serif'],
  		},
  		spacing: {
  			'section-mobile': '4rem',
  			'section-tablet': '5rem',
  			'section-desktop': '8rem',
  			'section-large': '10rem',
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '3rem',
  				xl: '4rem'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  
  plugins: [require("tailwindcss-animate")],
}

