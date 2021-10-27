# Gridsome + Netlify CMS project

1. Installed Gridsome CLI tool via NPM: `npm install --global @gridsome/cli`
1. Created this project with `gridsome create rovaninet`
1. Navigated into the project directory `cd rovaninet`
1. Validated that it is working with `gridsome develop`
1. Added Tailwind CSS plugin with `npm install -D gridsome-plugin-tailwindcss tailwindcss@latest`
1. Created the Tailwind config file with `./node_modules/.bin/tailwind init`
1. Ran a build to validate that all is still working `npm run build`
  2. Discovered first problem: "Error: PostCSS plugin tailwindcss requires PostCSS 8."
  2. Found the [fix on Tailwind's site](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)
  2. Uninstalled Tailwind `npm uninstall tailwindcss postcss autoprefixer`
  2. Reinstalled with the compatibility build instead `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`
  2. Ran a build again to validate that _now_ it is working `npm run build`.