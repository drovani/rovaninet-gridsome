<template>
    <Layout>
        <article class="mb-16 prose lg:prose-lg xl:prose-xl">
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
            <div class="mt-8 mb-4" v-html="$page.post.content" />
            <footer
                v-if="$page.post.github_discussion"
                class="border-t border-b rounded-full mx-2 px-2 py-2 text-center sm:mx-4 sm:px-4 bg-gray-300"
            >
                Continue the conversation at the GitHub Discussion:
                <br class="hidden sm:inline-block lg:hidden" />
                <a
                    :href="`https://github.com/drovani/rovaninet/discussions/${$page.post.github_discussion}`"
                    rel="noopener"
                    target="_blank"
                >Comments on "{{ $page.post.title }}"</a>
            </footer>
        </article>
    </Layout>
</template>

<page-query>
query Post ($path: String!) {
    post: post (path: $path) {
        title
        date
        formatedDate: date (format: "D MMMM Y")
        github_discussion
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

<script>

export default {
    metaInfo() {
        return {
            title: this.$page.post.title,
            meta: [
                { key: 'og:type', property: 'og:type', content: 'article' },
                { key: 'og:title', property: 'og:title', content: this.$page.post.title, },
                { key: 'description', property: 'description', content: this.$page.post.excerpt },
                { key: 'og:url', property: 'og:url', content: this.$page.post.path },
                { key: 'keywords', name: 'keywords', content: this.keywords },
                { key: 'article:published_time', property: 'article:published_time', content: this.$page.post.date },
                { name: 'twitter:title', content: this.$page.post.title },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:description', content: this.$page.post.excerpt },
                { name: 'twitter:site', content: 'https://rovani.net' },
                { name: 'twitter:creator', content: 'https://twitter.com/davidrovani' }
            ]
        }
    }
}
</script>