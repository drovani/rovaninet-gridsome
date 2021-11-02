<template>
    <Layout>
        <article>
            <header>
                <h1 class="text-4xl font-semibold mb-1">{{ $page.post.title }}</h1>
                <p class="font-light">
                    Published:
                    <time pubdate datetime="$page.post.date">{{ $page.post.formatedDate }}</time>
                </p>
                <p v-if="$page.post.category">
                    Filed under:
                    <g-link :to="$page.post.category.path">{{ $page.post.category.title }}</g-link>
                </p>
            </header>
            <div class="flex flex-wrap mb-4 text-sm">
                <g-link
                    v-for="tag in $page.post.tags"
                    :to="tag.path"
                    :key="tag.id"
                    class="bg-gray-300 rounded-full px-2 py-1 mr-4 mb-4 text-gray-700 hover:text-gray-300 hover:bg-gray-700"
                >{{ tag.title }}</g-link>
            </div>
            <div class="mt-8 mb-16 prose lg:prose-lg xl:prose-xl" v-html="$page.post.content" />
        </article>
    </Layout>
</template>

<page-query>
query Post ($path: String!) {
    post: post (path: $path) {
        title
        date
        formatedDate: date (format: "D MMMM Y")
        path
        category {
            title
            path
        }
        tags {
            title
            path
        }
        timeToRead
        content
    }
}
</page-query>

<script lang="ts">

export default {
    metaInfo(): any {
        const me = (this as any);
        return {
            title: me.$page.post.title,
            meta: [
                { key: 'og:type', property: 'og:type', content: 'article' },
                { key: 'og:title', property: 'og:title', content: me.$page.post.title, },
                { key: 'description', property: 'description', content: me.$page.post.excerpt },
                { key: 'og:url', property: 'og:url', content: me.$page.post.path },
                { key: 'keywords', name: 'keywords', content: me.keywords },
                { key: 'article:published_time', property: 'article:published_time', content: me.$page.post.date },
                { name: 'twitter:title', content: me.$page.post.title },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:description', content: me.$page.post.excerpt },
                { name: 'twitter:site', content: 'https://rovani.net' },
                { name: 'twitter:creator', content: 'https://twitter.com/davidrovani' }
            ]
        }
    }
}
</script>