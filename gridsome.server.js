// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

module.exports = function(api) {


  api.loadSource(({ getCollection }) => {
    const posts = getCollection("Post");

    const now = new Date();
    posts.data().forEach((node) => {
      if (new Date(node.date) > now) {
        if (process.env.NODE_ENV === "production") {
          posts.removeNode(node.id);
        } else {
          node.title = `DRAFT: ${node.title}`;
        }
      }
    });

    const tagDescriptions = require("./src/store/tagdescriptions.json");

    const tags = getCollection("Tag");
    tags.data().forEach((tag) => {
      if (tagDescriptions[tag.id]) {
        tag.description = tagDescriptions[tag.id];
      }
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
