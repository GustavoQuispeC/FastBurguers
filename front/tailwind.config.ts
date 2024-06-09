import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 60%, 100%': { transform: 'initial' },
          '30%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        wave: 'wave 1.5s infinite',
        'wave-200': 'wave 1.5s infinite 0.2s',
        'wave-400': 'wave 1.5s infinite 0.4s',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
  
export default config;
