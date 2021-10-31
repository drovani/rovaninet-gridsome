<template>
    <Layout>
        <Character />
    </Layout>
</template>

<script>

import Character from '~/components/Character.vue';

export default {
    components: {
        Character
    },
    metaInfo() {
        return {
            title: "Hearthstone Mercenaries Helpers"
        }
    }
}
</script>