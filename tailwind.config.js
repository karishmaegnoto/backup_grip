/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "575px",
      md: "768px",
      lg: "991px",
      xl: "1199px",
      "2xl": "1330px",
    },
    extend: {
      colors: {
        DarkBlue: "#000", // Buttons Hover
        gradientTo: "#f36585", //  Buttons
        gradpurple: "#f36585", // Sidebar Gradiant
        gradientFrom: "#f36585", // Sidebar Gradiant
        sideBarNavColor: "#ffffff",
        sideBarNavActiveColor: "#ffffff",
        danger: "#e3342f",
      },

      borderRadius: {
        custom: "4px",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      filterImage: {
        filter: "brightness(0) invert(1)",
      },
      ButtonShadow: {
        shadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)",
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      alpha: "lower-alpha",
    },
    variants: {
      extend: {
        display: ["group-focus"],
      },
    },
  },
  plugins: [],
};
