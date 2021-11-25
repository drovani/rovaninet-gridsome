<template>
  <Layout>
    <div class="sm:flex sm:pr-4">
      <PageHeader class="sm:flex-1">Blog Posts</PageHeader>
      <select @change="categorySelected" v-model="category" class="border-r border-b rounded-br mb-4 bg-transparent sm:h-8 sm:mr-2 sm:mb-0">
        <option value selected disabled>All Posts</option>
        <option
          v-for="cat in $static.categories.edges"
          :value="cat.node"
          :key="cat.node.id"
        >{{ cat.node.title }}</option>
      </select>
    </div>
    <PostSnippets :posts="$page.posts.edges" :pageInfo="$page.posts.pageInfo"></PostSnippets>
  </Layout>
</template>

<static-query>
query {
  categories: allCategory(sort: { by: "title", order: ASC}){
    edges{
      node{
        id
        title
        path
      }
    }
  }
}
</static-query>
<page-query>
query ($page: Int) {
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
        category {
          id
        }
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
  data: function () {
    return {
      category: ""
    }
  },
  metaInfo: {
    title: "David's Sandbox"
  },
  methods: {
    categorySelected: function () {
      window.location.href = this.category.path;
    }
  }
}
</script>

<style>
</style>
