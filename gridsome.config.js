// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const { nodeModuleNameResolver } = require("typescript");

module.exports = {
  siteName: "Rovani in C#",
  siteDescription: "David Rovani's personal blog and sandbox.",
  siteUrl: "https://rovani.net",
  titleTemplate: "%s | Rovani in C#",
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "posts/**/*.md",
        typeName: "Post",
        remark: {
          plugins: [
            [
              "gridsome-plugin-remark-shiki",
              { theme: "nord", skipInline: true, showLanguage: true, showLineNumbers: true, highlightLines: true },
            ],
          ]
        },
        refs: {
          tags: {
            typeName: "Tag",
            create: true,
          },
          category:{
            typeName: "Category",
            create: true
          }
        },
      },
    },
    {
      use: "gridsome-plugin-typescript",
    },
  ],
  templates:{
    Post: '/posts/:year/:title',
    Tag: '/tag/:id/',
    Category: '/category/:title/'
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link"
    },
  },
};
