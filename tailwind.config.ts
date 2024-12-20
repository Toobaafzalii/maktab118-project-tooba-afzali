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
      fontSize: {
        "display-100": [
          "6.25rem",
          {
            fontWeight: "400",
            lineHeight: "156.25px",
          },
        ],
        "display-92": [
          "5.75rem",
          {
            fontWeight: "400",
            lineHeight: "143.75px",
          },
        ],
        "display-88": [
          "5.5rem",
          {
            fontWeight: "400",
            lineHeight: "137.5px",
          },
        ],
        "display-80": [
          "5rem",
          {
            fontWeight: "400",
            lineHeight: "125px",
          },
        ],
        "display-72": [
          "4.5rem",
          {
            fontWeight: "400",
            lineHeight: "112.5px",
          },
        ],
        "display-64": [
          "4rem",
          {
            fontWeight: "400",
            lineHeight: "89.6px",
          },
        ],
        "display-56": [
          "3.5rem",
          {
            fontWeight: "400",
            lineHeight: "78.4px",
          },
        ],
        "display-48": [
          "3rem",
          {
            fontWeight: "400",
            lineHeight: "75px",
          },
        ],
        "display-36": [
          "2.25rem",
          {
            fontWeight: "400",
            lineHeight: "56.25px",
          },
        ],
        "display-32": [
          "2rem",
          {
            fontWeight: "400",
            lineHeight: "50px",
          },
        ],
        "display-28": [
          "1.75rem",
          {
            fontWeight: "400",
            lineHeight: "43.75px",
          },
        ],
        "title-36": [
          "2.25rem",
          {
            fontWeight: "700",
            lineHeight: "50.4px",
          },
        ],
        "title-32": [
          "2rem",
          {
            fontWeight: "700",
            lineHeight: "44.8px",
          },
        ],
        "title-28": [
          "1.75rem",
          {
            fontWeight: "700",
            lineHeight: "39.2px",
          },
        ],
        "title-24": [
          "1.5rem",
          {
            fontWeight: "700",
            lineHeight: "33.8px",
          },
        ],
        "title-20": [
          "1.25rem",
          {
            fontWeight: "700",
            lineHeight: "28px",
          },
        ],
        "title-18": [
          "1.125rem",
          {
            fontWeight: "700",
            lineHeight: "25.2px",
          },
        ],
        "title-16": [
          "1rem",
          {
            fontWeight: "700",
            lineHeight: "22.4px",
          },
        ],
        "title-14": [
          "0.875rem",
          {
            fontWeight: "700",
            lineHeight: "19.6px",
          },
        ],
        "title-12": [
          "0.75rem",
          {
            fontWeight: "700",
            lineHeight: "16.8px",
          },
        ],
        "title-10": [
          "0.625rem",
          {
            fontWeight: "700",
            lineHeight: "14px",
          },
        ],
        "subtitle-24": [
          "1.5rem",
          {
            fontWeight: "500",
            lineHeight: "33.6px",
          },
        ],
        "subtitle-20": [
          "1.25rem",
          {
            fontWeight: "500",
            lineHeight: "28px",
          },
        ],
        "subtitle-18": [
          "1.125rem",
          {
            fontWeight: "500",
            lineHeight: "25.2px",
          },
        ],
        "subtitle-16": [
          "1rem",
          {
            fontWeight: "500",
            lineHeight: "22.4px",
          },
        ],
        "subtitle-14": [
          "0.875rem",
          {
            fontWeight: "500",
            lineHeight: "19.6px",
          },
        ],
        "subtitle-12": [
          "0.75rem",
          {
            fontWeight: "500",
            lineHeight: "18px",
          },
        ],
        "subtitle-10": [
          "0.625rem",
          {
            fontWeight: "500",
            lineHeight: "16px",
          },
        ],
        "subtitle-9": [
          "0.5625rem",
          {
            fontWeight: "500",
            lineHeight: "16px",
          },
        ],
        "body-24": [
          "1.5rem",
          {
            fontWeight: "400",
            lineHeight: "33.6px",
          },
        ],
        "body-20": [
          "1.25rem",
          {
            fontWeight: "400",
            lineHeight: "28px",
          },
        ],
        "body-18": [
          "1.125rem",
          {
            fontWeight: "400",
            lineHeight: "25.2px",
          },
        ],
        "body-16": [
          "1rem",
          {
            fontWeight: "400",
            lineHeight: "22.4px",
          },
        ],
        "body-14": [
          "1rem",
          {
            fontWeight: "400",
            lineHeight: "22.4px",
          },
        ],
        "body-12": [
          "0.875rem",
          {
            fontWeight: "400",
            lineHeight: "18px",
          },
        ],
        "body-10": [
          "0.75rem",
          {
            fontWeight: "400",
            lineHeight: "16px",
          },
        ],
        "body-9": [
          "0.5625rem",
          {
            fontWeight: "400",
            lineHeight: "16px",
          },
        ],
        "caption-20": [
          "1.25rem",
          {
            fontWeight: "300",
            lineHeight: "28px",
          },
        ],
        "caption-18": [
          "1.125rem",
          {
            fontWeight: "300",
            lineHeight: "25.2px",
          },
        ],
        "caption-16": [
          "1rem",
          {
            fontWeight: "300",
            lineHeight: "22.4px",
          },
        ],
        "caption-14": [
          "0.875rem",
          {
            fontWeight: "300",
            lineHeight: "19.6px",
          },
        ],
        "caption-12": [
          "0.75rem",
          {
            fontWeight: "300",
            lineHeight: "20px",
          },
        ],
        "caption-10": [
          "0.625rem",
          {
            fontWeight: "300",
            lineHeight: "18px",
          },
        ],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
