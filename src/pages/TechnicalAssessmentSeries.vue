<template>
    <Layout>
        <div class="mx-auto container-inner">
            <h1 class="text-3xl font-bold">
                An Assessment of a Technical Assessment
            </h1>
            <p class="mt-6">
                As part of an interview process that I was participating in (as the interviewee), I was assigned a Technical Assessment to assist them in judging my coding capabilities.
                Instead of just throwing together some code and passing it to them, I decided to make a series of blog posts describing my journey.
            </p>
            <p class="mt-6">
                The source code for the project can be found at <a href="https://github.com/drovani/techassessment-basic" class="underline">https://github.com/drovani/techassessment-basic</a>
            </p>
            <p class="mt-6">
                In the end, they decided that I wasn't the right candidate for the role.
            </p>
        </div>
        <div class="mt-10 px-4 rounded-lg bg-background-secondary">
            <PostSnippets :posts="$page.posts.edges"></PostSnippets>
        </div>
    </Layout>
</template>

<page-query>
query Posts {
    posts: allPost(sortBy: "date", order: ASC, filter: {series: {eq: "Technical Assessment"}}){
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

<script lang="ts">
import PostSnippets from "~/components/PostSnippets.vue";

export default {
    metaInfo: {
        title: "An Assessment of a Technical Assessment"
    },
    components: {
        PostSnippets
    }
}
</script>