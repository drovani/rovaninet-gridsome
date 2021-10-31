<template>
    <Layout>
        <h1 class="text-4xl font-semibold mb-1">{{ $page.post.title }}</h1>
        <span class="font-light">{{ $page.post.date }}</span>
        <div class="mt-8 mb-16 prose lg:prose-lg xl:prose-xl" v-html="$page.post.content" />
    </Layout>
</template>

<page-query>
query Post ($path: String!) {
    post: post (path: $path) {
        title
        date (format: "D MMMM Y")
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