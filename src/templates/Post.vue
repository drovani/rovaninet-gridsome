<template>
    <Layout>
        <div v-html="$page.post.content" />
    </Layout>
</template>

<page-query>
query Post ($path: String!) {
    post: post (path: $path) {
        title
        content
    }
}
</page-query>

<script lang="ts">

export default {
    metaInfo() : any {
        return {
            title: (this as any).$page.post.title
        }
    }
}
</script>