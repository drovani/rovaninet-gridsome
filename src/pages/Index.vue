<template>
  <Layout>
    <PageHeader text="Blog Posts"></PageHeader>
    <PostSnippets :posts="$page.posts.edges" :pageInfo="$page.posts.pageInfo"></PostSnippets>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (perPage: 7, page: $page) @paginate {
    totalCount
    pageInfo{
      perPage
      currentPage
      totalPages
      totalItems
      hasNextPage
      hasPreviousPage
      isFirst
      isLast
    }
    edges {
      node {
        title
        path
        date
        formattedDate: date (format: "D MMM Y")
        excerpt
        timeToRead
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
import PostSnippets from "~/components/PostSnippets.vue";
import PageHeader from "~/components/PageHeader.vue";

export default {
  components: {
    Pager,
    PostSnippets,
    PageHeader
  },
  metaInfo: {
    title: "David's Sandbox"
  }
}
</script>

<style>
</style>
