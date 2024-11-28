import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: {
            surface: {
              default: "var(--dirty-gray-200)",
              "default-subtle": "var(--dirty-gray-50)",
              object: "var(--dirty-gray-100)",
              negative: "var(--dirty-gray-950)",
              "negative-subtle": "var(--dirty-gray-900)",
            },
            border: {
              default: "var(--dirty-gray-400)",
              "default-subtle": "var(--dirty-gray-200)",
              negative: "var(--dirty-gray-900)",
            },
            text: {
              title: "var(--dirty-gray-950)",
              subtitle: "var(--dirty-gray-700)",
              body: "var(--dirty-gray-900)",
              caption: "var(--dirty-gray-600)",
              negative: "var(--dirty-gray-50)",
              "negative-subtle": "var(--dirty-gray-100)",
            },
          },
          gray: {
            surface: {
              default: "var(--gray-200)",
              "default-subtle": "var(--gray-50)",
              object: "var(--gray-100)",
              negative: "var(--gray-950)",
              "negative-subtle": "var(--gray-900)",
            },
            border: {
              default: "var(--gray-400)",
              "default-subtle": "var(--gray-200)",
              negative: "var(--gray-900)",
            },
            text: {
              title: "var(--gray-950)",
              subtitle: "var(--gray-700)",
              body: "var(--gray-900)",
              caption: "var(--gray-600)",
              negative: "var(--gray-50)",
              "negative-subtle": "var(--gray-100)",
            },
          },
          error: {
            surface: {
              default: "var(--red-200)",
              "default-subtle": "var(--red-100)",
              negative: "var(--red-950)",
              "negative-subtle": "var(--red-900)",
            },
            border: {
              default: "var(--red-900)",
              "default-subtle": "var(--red-700)",
            },
            text: {
              title: "var(--red-600)",
              subtitle: "var(--red-700)",
              negative: "var(--red-50)",
              "negative-subtle": "var(--red-100)",
            },
          },
          warning: {
            surface: {
              default: "var(--yellow-200)",
              "default-subtle": "var(--yellow-100)",
              negative: "var(--yellow-950)",
              "negative-subtle": "var(--yellow-900)",
            },
            border: {
              default: "var(--yellow-900)",
              "default-subtle": "var(--yellow-700)",
            },
            text: {
              title: "var(--yellow-600)",
              subtitle: "var(--yellow-700)",
              negative: "var(--yellow-50)",
              "negative-subtle": "var(--yellow-100)",
            },
          },
          success: {
            surface: {
              default: "var(--green-200)",
              "default-subtle": "var(--green-100)",
              negative: "var(--green-950)",
              "negative-subtle": "var(--green-900)",
            },
            border: {
              default: "var(--green-900)",
              "default-subtle": "var(--green-700)",
            },
            text: {
              title: "var(--green-600)",
              subtitle: "var(--green-700)",
              negative: "var(--green-50)",
              "negative-subtle": "var(--green-100)",
            },
          },
        },
        dark: {
          primary: {
            surface: {
              default: "var(--dirty-gray-1000)",
              "default-subtle": "var(--dirty-gray-950)",
              object: "var(--dirty-gray-900)",
              negative: "var(--dirty-gray-200)",
              "negative-subtle": "var(--dirty-gray-50)",
            },
            border: {
              default: "var(--dirty-gray-500)",
              "default-subtle": "var(--dirty-gray-700)",
              negative: "var(--dirty-gray-100)",
            },
            text: {
              title: "var(--dirty-gray-50)",
              subtitle: "var(--dirty-gray-300)",
              body: "var(--dirty-gray-100)",
              caption: "var(--dirty-gray-400)",
              negative: "var(--dirty-gray-950)",
              "negative-subtle": "var(--dirty-gray-900)",
            },
          },
          gray: {
            surface: {
              default: "var(--gray-950)",
              "default-subtle": "var(--gray-900)",
              object: "var(--gray-950)",
              negative: "var(--gray-200)",
              "negative-subtle": "var(--gray-50)",
            },
            border: {
              default: "var(--gray-500)",
              "default-subtle": "var(--gray-700)",
              negative: "var(--gray-100)",
            },
            text: {
              title: "var(--gray-50)",
              subtitle: "var(--gray-300)",
              body: "var(--gray-100)",
              caption: "var(--gray-400)",
              negative: "var(--gray-950)",
              "negative-subtle": "var(--gray-900)",
            },
          },
          error: {
            surface: {
              default: "var(--red-800)",
              "default-subtle": "var(--red-900)",
              negative: "var(--red-200)",
              "negative-subtle": "var(--red-300)",
            },
            border: {
              default: "var(--red-800)",
              "default-subtle": "var(--red-500)",
            },
            text: {
              title: "var(--red-100)",
              subtitle: "var(--red-300)",
              negative: "var(--red-700)",
              "negative-subtle": "var(--red-800)",
            },
          },
          warning: {
            surface: {
              default: "var(--yellow-800)",
              "default-subtle": "var(--yellow-900)",
              negative: "var(--yellow-200)",
              "negative-subtle": "var(--yellow-300)",
            },
            border: {
              default: "var(--yellow-800)",
              "default-subtle": "var(--yellow-500)",
            },
            text: {
              title: "var(--yellow-100)",
              subtitle: "var(--yellow-300)",
              negative: "var(--yellow-700)",
              "negative-subtle": "var(--yellow-800)",
            },
          },
          success: {
            surface: {
              default: "var(--green-800)",
              "default-subtle": "var(--green-900)",
              negative: "var(--green-200)",
              "negative-subtle": "var(--green-300)",
            },
            border: {
              default: "var(--green-800)",
              "default-subtle": "var(--green-500)",
            },
            text: {
              title: "var(--green-100)",
              subtitle: "var(--green-300)",
              negative: "var(--green-700)",
              "negative-subtle": "var(--green-800)",
            },
          },
        },
      },
      fontFamily: {
        "app-display": ["app-display-font", "sans-serif"],
        "app-peyda": ["app-peyda-black", "sans-serif"],
        "app-peyda-bold": ["app-peyda-bold", "sans-serif"],
        "app-peyda-extrabold": ["app-peyda-extrabold", "sans-serif"],
        "app-peyda-extralight": ["app-peyda-extralight", "sans-serif"],
        "app-peyda-light": ["app-peyda-light", "sans-serif"],
        "app-peyda-medium": ["app-peyda-medium", "sans-serif"],
        "app-peyda-regular": ["app-peyda-regular", "sans-serif"],
        "app-peyda-semibold": ["app-peyda-semibold", "sans-serif"],
        "app-peyda-thin": ["app-peyda-thin", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
