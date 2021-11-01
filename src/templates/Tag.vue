<template>
    <Layout>
        <h1 class="text-xl font-semibold mb-5">{{ $page.tag.title }}</h1>
        <h2 class="pb-2 mb-8 text-lg" v-if="$page.tag.description">{{ $page.tag.description }}</h2>

        <ul class="list-outside list-disc">
            <li v-for="post in $page.tag.belongsTo.edges" :key="post.node.id" class="mt-3">
                <g-link :to="post.node.path">{{ post.node.title }} - {{ post.node.formattedDate }}</g-link>
            </li>
        </ul>
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
                        path
                    }
                }
            }
        }
    }
}
</page-query>

<script lang="ts">
export default {
    metaInfo(): any {
        return {
            title: 'Tag: ' + (this as any).$page.tag.title
        }
    }
}
</script>