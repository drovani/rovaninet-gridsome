module.exports = {
  purge: {
    content: [
      "./src/**/*.vue",
      "./src/**/*.js",
      "./src/**/.html",
      "./src/**/*.md",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: null,
            "blockquote p:first-of-type::before": {
              content: null,
            },
            "blockquote p:last-of-type::after": {
              content: null,
            },
            "blockquote + figcaption::before": {
              content: "—",
            },
            code: {
              color: "var(--tw-prose-code)",
              fontWeight: "900",
            },
            "code::before": {
              content: null,
            },
            "code::after": {
              content: null,
            },
            img: {
              filter:
                "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
