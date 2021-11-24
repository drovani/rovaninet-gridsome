<template>
    <Layout>
        <div class="mx-auto container-inner">
            <h1 class="text-3xl font-bold">
                My Thoughts on
                <span class="italic">The Mandalorian</span>
            </h1>
            <p class="mt-6">
                After hate-watching season one of
                <span class="italic">The Mandalorian</span>, I had
                <span class="italic font-extrabold">a lot</span> of thoughts on the matter at the time.
                I didn't write any of them down until the second season was about to come out and I decided to go back and list them out.
            </p>
            <p class="mt-6">
                You'll find that I was mildly fond of this show. There were some entertaining pieces, but overall I found it to be a basic episodic gunslinger-in-space derivative.
                There's nothing particularly unique or extraordinary about the show. It's half-decent entertainment, so long as you ignore continuity errors, dry dialog, and lots of tropes.
            </p>
            <p class="mt-6">There are spoilers throughout, but I don't care.</p>
        </div>
        <div class="mt-10 px-4 rounded-lg bg-background-secondary">
            <h2 class="mt-2 text-2xl font-bold">Posts by Season</h2>
            <PostSnippets :posts="$page.posts.edges"></PostSnippets>
        </div>
    </Layout>
</template>

<page-query>
query Posts {
    posts: allPost(sortBy: "date", order: ASC, filter: {series: {eq: "The Mandalorian"}}){
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
        title: "Thoughts on The Mandalorian"
    },
    components: {
        PostSnippets
    }
}
</script>