<template>
    <section :class="mercenary.role.toLowerCase()" class="p-2 border-2 rounded-md">
        <header class="text-center">
            <h2 class="bg-gray-900 text-white rounded-md">{{ mercenary.name }}</h2>
            <span>{{ mercenary.race }}</span>
        </header>
        <div class="grid lg:grid-cols-3 grid-cols-1 space-x-2">
            <AbilityCard v-for="ability in mercenary.abilities" :key="ability.name" :ability="ability" />
        </div>
    </section>
</template>

<script lang="ts">

import AbilityCard from './AbilityCard.vue';

export default {
    name: "Mercenary",
    props: ['mercenary'],
    components:{
        AbilityCard
    }
}
</script>