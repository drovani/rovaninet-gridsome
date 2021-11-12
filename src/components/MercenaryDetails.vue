<template>
    <section :class="mercenary.role.toLowerCase()" class="p-2 border-2 rounded-md grid grid-cols-4 space-x-2 space-y-4">
        <div class="text-center row-span-6">
            <h2 class="bg-gray-900 text-white rounded-md">{{ mercenary.name }}</h2>
            <span>{{ mercenary.race }}</span>
        </div>
        <div class="col-span-3 text-center mb-4">Abilities</div>
        <AbilityCard v-for="ability in mercenary.abilities" :key="ability.name" :ability="ability" />
        <div class="col-span-3 text-center mb-4">Equipment</div>
        <ItemCard v-for="item in mercenary.equipment" :key="item.name" :item="item" />
    </section>
</template>

<script lang="ts">

import AbilityCard from './AbilityCard.vue';
import ItemCard from './ItemCard.vue';

export default {
    name: "Mercenary",
    props: ['mercenary'],
    components: {
        AbilityCard,
        ItemCard
    }
}
</script>