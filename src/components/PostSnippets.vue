<template>
    <section>
        <Pager
            v-if="pageInfo"
            :info="pageInfo"
            :range="10"
            linkClass="mx-2"
            activeLinkClass="underline font-semibold"
            exactActiveLinkClass="text-blue-500"
            firstLabel="newest"
            prevLabel="previous"
            nextLabel="next"
            lastLabel="oldest"
            class="text-center"
        />
        <article v-for="post in posts" class="my-5 text-lg list-none" :key="post.node.id">
            <h3>
                <g-link class="underline" :to="post.node.path">{{ post.node.title }}</g-link>
                <time
                    pubdate
                    :datetime="post.node.date"
                    class="float-right"
                >{{ post.node.formattedDate }}</time>
            </h3>
            <p>{{ post.node.excerpt }}...</p>
        </article>
        <Pager
            v-if="pageInfo"
            :info="pageInfo"
            :range="10"
            linkClass="mx-2"
            activeLinkClass="underline font-semibold"
            exactActiveLinkClass="text-blue-500"
            firstLabel="newest"
            prevLabel="previous"
            nextLabel="next"
            lastLabel="oldest"
            class="text-center"
        />
    </section>
</template>

<script lang="ts">
import { Pager } from "gridsome";

export default {
    props: ["posts", "pageInfo"],
    components: {
        Pager,
    }
}
</script>