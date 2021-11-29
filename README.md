[![Netlify Deploy Status](https://api.netlify.com/api/v1/badges/aad9cac8-4737-4708-a70f-104749fcd8d7/deploy-status)](https://app.netlify.com/sites/rovaninet/deploys)

# Pre-Launch Todo List:

- [x] Create [About Me](https://github.com/drovani/rovaninet/blob/main/src/pages/About.vue) page
- [x] Using CSS/Tailwind, make h4 tags inline with the paragraph.
- [x] Small images should be inline (https://github.com/drovani/rovaninet/blob/main/posts/2017/2017-03-28-Azure-Command-Queue.md)
- [x] Add a footer to the website with the usual links.
- [x] Create a Categories ~~list page~~ selector.
- [ ] Create Redirect list for old website to new website
  - [x] 2013-2014 post redirects
  - [x] 2015-2016 post redirects
  - [x] 2017-2018 post redirects
  - [x] 2019-2021 post redirects
- [x] Switch DNS records to point to new site!

## Post Years That Still Need Fixing

- [x] 2021 (2 Posts)
- [x] 2020 (5 posts)
- [x] 2019 (12 posts)
- [x] 2018 (14 posts)
- [x] 2017 (16 posts)
- [x] 2016 (12 posts)
- [x] 2015 (10 posts)
- [x] 2014 (19 posts)
- [x] 2013 (4 posts)

# Future Blog/Gridsome Enhancements

- [ ] Add "Next" and "Previous" links to every blog post
- [ ] [Add some Remark plugins](https://github.com/gridsome/gridsome/issues/61) to allow for custom containers and TOC
- [x] Add better styling to the Pager component
- [ ] Add Twitter Card loading for blockquotes that are links to tweets (https://github.com/drovani/rovaninet/blob/main/posts/2020/2020-12-31-Another-Year-In-Review.md)
- [x] Load Tag descriptions from a json file or somewhere other than inside `gridsome.server.js`
- [ ] Integrate [Storybook](https://storybook.js.org/) with the site (instructions found [here](https://mannes.tech/gridsome-storybook/))

# Feature Projects for the Site

- [ ] Hearthstone Mercenaries Helper (replacement for my [Google Sheets](https://docs.google.com/spreadsheets/d/19FBZWszfu286zdRNZ43JvUD2bUvxLfrYTLmO1qSJmEM/edit?usp=sharing))
  - [ ] Responsive list view of all Mercenaries
  - [ ] Load collection from data store instead of static json
  - [ ] Update collection in response to user clicks
  - [ ] Persist collection to _local storage_ (or somewhere)
  - [ ] Allow for export/import of collection (via json file)
  - [ ] Refactor event names to kebab-cased per [Vue.js best practices](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names)
  - [ ] Implement `.sync` modifer [where appropriate](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)
- [ ] Starting writing "Rovani's Vue" and "Rovani's *React*ions"
  - [ ] Build HS Mercs Helper in React.
- [ ] Login Gated Cash Rules Spreadsheet