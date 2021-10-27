[![Netlify Deploy Status](https://api.netlify.com/api/v1/badges/aad9cac8-4737-4708-a70f-104749fcd8d7/deploy-status)](https://app.netlify.com/sites/rovaninet/deploys)

# Gridsome + Netlify CMS project

1. Installed Gridsome CLI tool via NPM: `npm install --global @gridsome/cli`
1. Created this project with `gridsome create rovaninet`
1. Navigated into the project directory `cd rovaninet`
1. Validated that it is working with `gridsome develop`
1. Added Tailwind CSS plugin with `yarn add -D gridsome-plugin-tailwindcss tailwindcss@latest`
1. Created the Tailwind config file with `./node_modules/.bin/tailwind init`
1. Ran a build to validate that all is still working `npm run build`
  2. Discovered first problem: "Error: PostCSS plugin tailwindcss requires PostCSS 8."
  2. Found the [fix on Tailwind's site](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)
  2. Uninstalled Tailwind `yarn remove tailwindcss postcss autoprefixer`
  2. Reinstalled with the compatibility build instead `yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`
  2. Ran a build again to validate that _now_ it is working `npm run build`.
1. Installed Netlify CMS packages `yarn add netlify-cms gridsome-plugin-netlify-cms @gridsome/source-filesystem @gridsome/transformer-remark`
1. Updated the Gridsome config file [per instructions](https://www.netlifycms.org/docs/gridsome/#create-a-new-gridsome-website).
1. Added the `./src/admin/index.html`, `./src/admin/index.js`, and `./src/admin/config.yml` files, [pursuant to the instructions](https://www.netlifycms.org/docs/gridsome/#netlify-cms-setup).
1. Committed and Pushed to GitHub repo.
1. Added site to Netlify and made some customizations.
1. Published site and was [surprised that it worked](https://rovaninet.netlify.app/)!