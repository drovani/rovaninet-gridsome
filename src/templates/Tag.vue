<template>
    <Layout>
        <PageHeader :text="$page.tag.title"></PageHeader>
        <h2 class="pb-2 mb-8 text-lg" v-if="$page.tag.description">{{ $page.tag.description }}</h2>

        <PostSnippets :posts="$page.tag.belongsTo.edges"></PostSnippets>
    </Layout>
</template>

<page-query>
query Tag ($id: ID!){
    tag: tag(id:$id){
        title
        description
        belongsTo {
            totalCount
            edges {
                node {
                    ...on Post {
                        title
                        date
                        formattedDate: date (format: "D MMMM Y")
                        excerpt
                        path
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
            title: 'Tag: ' + (this as any).$page.tag.title
        }
    },
    components: {
        PostSnippets,
        PageHeader
    }
}
</script>