<template>
  <Layout>
    <PageHeader class="text-center">{{ $page.category.title }}</PageHeader>
    <PostSnippets
      :posts="$page.category.belongsTo.edges"
      :pageInfo="$page.category.belongsTo.pageInfo"
    ></PostSnippets>
  </Layout>
</template>

<page-query>
query CategoryWithPostsPaged ($path: String, $page:Int){
  category: category(path: $path) {
    id
    title
    path
    belongsTo (perPage: 7, page:$page) @paginate{
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
      edges{
        node{
          ... on Post{
            title
            path
            date
            formattedDate: date (format: "D MMMM Y")
            excerpt
            timeToRead
          }
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import PostSnippets from "~/components/PostSnippets.vue"
import PageHeader from "~/components/PageHeader.vue"

export default {
  metaInfo(): any {
    return {
      title: 'Category: ' + (this as any).$page.category.title
    }
  },
  components: {
    PostSnippets,
    PageHeader
  }
}
</script>