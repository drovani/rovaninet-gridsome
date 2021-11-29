<template>
    <section>
        <Pager
            v-if="pageInfo"
            :info="pageInfo"
            :range="5"
            linkClass="mx-1 p-1"
            activeLinkClass="font-semibold"
            exactActiveLinkClass="text-white bg-gray-900 rounded"
            class="text-center"
        />
        <article v-for="post in posts" class="my-5 text-lg list-none" :key="post.node.id">
            <header class="sm:flex sm:items-baseline">
                <h3 class="underline sm:flex-1">
                    <g-link :to="post.node.path">{{ post.node.title }}</g-link>
                </h3>
                <div class="text-right">
                    <time class="bg-gray-100 px-2 rounded" pubdate :datetime="post.node.date">{{ post.node.formattedDate }}</time>
                </div>
            </header>
            <p>{{ post.node.excerpt }}...</p>
        </article>
        <Pager
            v-if="pageInfo"
            :info="pageInfo"
            :range="5"
            linkClass="mx-1 p-1"
            activeLinkClass="font-semibold"
            exactActiveLinkClass="text-white bg-gray-900 rounded"
            class="text-center"
        />
    </section>
</template>

<script>
import { Pager } from "gridsome";

export default {
    props: ["posts", "pageInfo"],
    components: {
        Pager,
    }
}
</script>