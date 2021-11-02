<template>
    <h1 class="text-4xl font-semibold mb-5">{{ text }}</h1>
</template>
<script lang="ts">
export default {
    name: "PageHeader",
    props: ["text"]
}
</script>