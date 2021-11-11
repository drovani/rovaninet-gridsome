---
title: Migrated to Gridsome + NetlifyCMS
category: Rovani in C♯
excerpt: After lots of fits and starts with other frameworks, platforms, and
  languages - getting up and running with Gridsome, Tailwind, Netlify CMS (with
  Netlify Identity), and GitHub has been suprisingly easy and delightful.
date: 2021-10-27
tags:
  - vue
  - netlify
  - gridsome
---
Throughout this process, I have been using [the repo's readme](https://github.com/drovani/rovaninet#readme) file as a notepad for the steps it took to get everything working. Below are the steps as I put it together to get to the point where I could write this post in the Netlify CMS.


1. Installed Gridsome CLI tool via NPM: `npm install --global @gridsome/cli`
1. Created this project with `gridsome create rovaninet`
1. Navigated into the project directory `cd rovaninet`
1. Validated that it is working with `gridsome develop`
1. Added Tailwind CSS plugin with `yarn add -D gridsome-plugin-tailwindcss tailwindcss@latest`
1. Created the Tailwind config file with `./node_modules/.bin/tailwind init`
1. Ran a build to validate that all is still working `npm run build`
    1. Discovered first problem: "Error: PostCSS plugin tailwindcss requires PostCSS 8."
    1. Found the [fix on Tailwind's site](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)
    1. Uninstalled Tailwind `yarn remove tailwindcss postcss autoprefixer`
    1. Reinstalled with the compatibility build instead `yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`
    1. Ran a build again to validate that _now_ it is working `npm run build`.
1. Installed Netlify CMS packages `yarn add netlify-cms gridsome-plugin-netlify-cms @gridsome/source-filesystem @gridsome/transformer-remark`
1. Updated the Gridsome config file [per instructions](https://www.netlifycms.org/docs/gridsome/#create-a-new-gridsome-website).
1. Added the `./src/admin/index.html`, `./src/admin/index.js`, and `./src/admin/config.yml` files, [pursuant to the instructions](https://www.netlifycms.org/docs/gridsome/#netlify-cms-setup).
1. Committed and Pushed to GitHub repo.
1. Added site to Netlify and made some customizations.
    1. @TODO add details with all of the steps taken inside the Netlify dashboard
1. Published site and was [surprised that it worked](https://rovaninet.netlify.app/)!


## Copying Posts from Jekyll website

1. Created a new post in Netlify CMS to figure out where it puts the posts.
1. Found that it creates `./posts/{{ slug }}.md` and noticed that `./src/admin/config.yml` has that same folder... maybe I'm onto something.
    1. Since my previous blog has all of my posts in the format `./{{ year }}/{{ year }}-{{ month }}-{{ day }}-{{ slug }}.md`, I wanted to find a way for Netlify CMS to create the files in that format, too.
    1. Found what I was looking for under [Configuration Options -> Collections](https://www.netlifycms.org/docs/configuration-options/#collections), which also led me to learning all about various other configurable options.
    1. What ended up being the winner was setting these two values: `slug: "{{year}}-{{month}}-{{day}}-{{slug}}"` and `path: "{{year}}/{{slug}}"`
1. Copied all of the old posts into this repository.
1. Published the site and was surprised to see that my posts all appeared in the admin dashboard!
1. Since the Jekyll site was deducing the publish date from the filename, I needed to write a script to parse each filename and add a `date: YYYY-MM-DD` entry to the front matter.

1. Added a `view_groups` for Year to the config for a little sugar feature.