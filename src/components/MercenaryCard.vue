<template>
    <section :class="mercenary.role.toLowerCase()" class="p-2 border-2 rounded-md">
        <header class="text-center">
            <h2 class="bg-gray-900 text-white rounded-md">{{ mercName }}</h2>
            <span>{{ mercenary.race }}</span>
        </header>
        <div class="grid lg:grid-cols-3 grid-cols-1 space-x-2">
            <AbilityCard
                v-for="(ability, name) in mercenary.abilities"
                :key="name"
                :abilityName="name"
                :ability="ability"
                :activeTier="collected && collected.abilities[name]"
                @decrement="$emit('decrementAbility', mercName, name)"
                @increment="$emit('incrementAbility', mercName, name)"
            />
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 space-x-2">
            <ItemCard
                v-for="(item, name) in mercenary.equipment"
                :key="name"
                :itemName="name"
                :item="item"
                :activeTier="collected && collected.equipment[name]"
                @decrement="$emit('decrementItem', mercName, name)"
                @increment="$emit('incrementItem', mercName, name)"
            />
        </div>
    </section>
</template>

<script lang="ts">

import AbilityCard from './AbilityCard.vue';
import ItemCard from './ItemCard.vue';

export default {
    name: "MercenaryCard",
    props: {
        mercenary: Object,
        collected: Object,
        mercName: String
    },
    emits: ['decrementAbility', 'incrementAbility', 'decrementItem', 'incrementItem'],
    components: {
        AbilityCard,
        ItemCard
    }
}
</script>