---
title: HSMercs From The Beginning
category: Rovani's Vue
date: 2022-01-14
series: HSMercs From Scratch
step: 1
tags:
  - vuejs
  - vite
  - vuex
---

As the name of this tutorial states, we are going to start this project from nothing but an empty folder and a few globally installed packages. Each file will be artisanally crafted and explained in detail. Additionally, I am striving to make all examples additive in nature. Instead of just putting "placeholder" text and hard-coding sample data, we will mostly just be creating files and adding code.

> The first in a series of posts on ['HSMercs Helper From Scratch'](/hs-mercs-from-scratch), a tutorial for recreating _[HSMercs Helper](https://hsmercs.rovani.net)_.

## Starting from Complete Scratch

This (and the rest of the posts) assume that the development environment matches the following requirements:

- Windows 10 with WSL2: Ubuntu installed.
- Visual Studio Code with Vetur and Prettier plugins installed.
- Using Node v16 with yarn and vite installed.

Other environments may work, but I have no way to test it, so this is what is supported!

Before creating anything, we need a new repository. Time to create a new directory and initialize that git repo!

```bash
mkdir hsmercs-helper
cd hsmercs-helper
git init
```

## Step-by-Step Tutorial for Recreating HSMercs Helper

The core starting place for any Node application is the `package.json` file. This is where Node looks to understand what to execute when you run various commands, it is where the package manager looks to determine what needs to be downloaded, and where the configuration lies for so many build and runtime utilities.

#### package.json

```json
{
    "name": "hsmercs-helper",
    "version": "0.2.0",
    "private": true,
    "engineStrict": true,
    "engines": {
        "node": "^16"
    },
    "scripts": {
        "dev": "vite"
    },
    "dependencies": {
        "vue": "^3.2.25"
    },
    "devDependencies": {
        "@vitejs/plugin-vue": "^2.0.1",
        "typescript": "^4.5.4",
        "vite": "^2.7.10",
        "vue-tsc": "^0.30.1"
    }
}
```

The first few entries describe the package by giving it a name, a version number that we set to whatever we feel like, and letting the world know that it's not meant for public consumption into other applications. We are also announcing that this package requires v16 (`lts/gallium`) of Node. There are some known issues with running on v17, so we're avoiding that version for now.

The `scripts` entry sets an alias for `yarn dev` to be `yarn vite`. This becomes more useful as we have longer aliases, where we want to include command line switches and conditionals.

The `dependencies` section and the `devDependencies` sections describe what packages are required for production and development environments.

#### .gitignore

```text
node_modules
```

Without the `.gitignore` file, git will tell you there are 2,000+ files that need to be checked in. We don't care about anything in `node_modules`, though. After saving this file, the "to be staged" file list goes back to the three we care about.

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HSMercs Helper</title>
  </head>
  <body>
    <div>
      <nav>HSMercs Helper</nav>
      <main id="app"></main>
    </div>
  </body>
</html>
```

Vite [projects feature](https://vitejs.dev/guide/#index-html-and-project-root) `index.html` as front-and-central in the project root instead of being tucked away inside a `public` folder. The intention being that during development, Vite is a server and `index.html` is the entry point to the application.

## Minimum Renderable Code

```bash
yarn
yarn dev
```

Running `yarn` without arguements tells it to examine the `package.json` file and install all dependencies. The second command says to execute the `dev` script. Vite will create a web server, typically running on port 3000, and can now serve the empty home page.

![HSMercs Helper on localhost:3000](/images/vite-localhost3000.png)

```bash
git add -A  # add the four files we created
git commit -m "minimum renderable code" # commit them to the repo with a comment
git remote add origin https://github.com/{username}/{repo} # add a github repo as the origin
git push --set-upstream-branch origin main # push the commit to a branch named main at the origin
```