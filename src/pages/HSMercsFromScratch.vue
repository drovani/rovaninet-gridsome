<template>
    <Layout>
        <div class="mx-auto container-inner">
            <h1 class="text-3xl font-bold">
                Recreating HSMercs Helper in Vue from Scratch
            </h1>
            <p class="mt-6">
                As a project to learn Vue, I created a helper for tracking a player's collection in <a href="https://playhearthstone.com/en-us/mercenaries/" rel="noreferrer noopener" target="_blank" class="underline">Hearthstone Mercenaries</a>. This tutorial serves as a way to walk through recreating this project from the beginning, while explaining various decisions made and the process for expanding the features.
            </p>
            <p class="mt-6">This is a living tutorial where the articles can (and probably will) change as I improve the project.</p>
        </div>
        <div class="mt-10 px-4 rounded-lg bg-background-secondary">
            <h2 class="mt-2 text-2xl font-bold">Posts in Stage Order</h2>
            <PostSnippets :posts="$page.posts.edges"></PostSnippets>
        </div>
    </Layout>
</template>

<page-query>
query Posts {
    posts: allPost(sortBy: "date", order: ASC, filter: {series: {eq: "HSMercs From Scratch"}}){
        totalCount
        pageInfo{
            totalPages
            currentPage
        }
        edges {
            node{
                id
                title
                date
                formattedDate: date (format: "D MMMM Y")
                excerpt
                timeToRead
                path
            }
        }
    }
}
</page-query>

<script>
import PostSnippets from "~/components/PostSnippets.vue";

export default {
    metaInfo: {
        title: "HSMercs Helper From Scratch"
    },
    components: {
        PostSnippets
    }
}
</script>