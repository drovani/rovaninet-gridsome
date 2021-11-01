<template>
  <Layout>
    <h1 class="text-4xl font-semibold mb-5">
      Blog Posts
    </h1>
    <ul class="list-outside list-disc">
      <li v-for="post in $page.posts.edges" :key="post.path" class="mt-3">
      <g-link :to="post.node.path">{{ post.node.title }} - {{ post.node.date }}</g-link> | {{ post.node.timeToRead }} minute read
      </li>
    </ul>
    <Pager :info="$page.posts.pageInfo" />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (perPage: 7, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
      isFirst
      isLast
    }
    edges {
      node {
        title
        path
        date (format: "D MMMM Y")
        timeToRead
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";

export default {
  components: {
    Pager
  },
  metaInfo: {
    title: "David's Sandbox"
  }
}
</script>

<style>
</style>
