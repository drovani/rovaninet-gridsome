<template>
    <section
        class="p-2 border-2 rounded-md"
        :class="{
            'border-red-400': mercenary.role === 'Protector',
            'border-green-400': mercenary.role === 'Fighter',
            'border-blue-400': mercenary.role === 'Caster',
        }"
    >
        <header class="bg-gray-900 text-white rounded-md text-center grid grid-cols-3">
            <h2 class="col-span-2">
                {{ mercName }}
            </h2>
            <div>{{ mercenary.race }}</div>
        </header>
        <div class="grid grid-cols-1 space-y-2 sm:space-y-0 sm:grid-cols-3 sm:space-x-2">
            <AbilityCard
                v-for="(ability, name) in mercenary.abilities"
                :key="name"
                :ability="ability"
                :activeTier="activeMerc && activeMerc.abilities[name]"
                @decrementActiveTier="$emit('decrementAbilityActiveTier', mercName, name)"
                @incrementActiveTier="$emit('incrementAbilityActiveTier', mercName, name)"
                >{{ name }}</AbilityCard
            >
        </div>
        <div class="grid grid-cols-1 space-y-2 sm:space-y-0 sm:grid-cols-3 sm:space-x-2">
            <ItemCard
                v-for="(item, name) in mercenary.equipment"
                :key="name"
                :item="item"
                :activeTier="activeMerc && activeMerc.equipment[name]"
                @decrementActiveTier="$emit('decrementItemActiveTier', mercName, name)"
                @incrementActiveTier="$emit('incrementItemActiveTier', mercName, name)"
                >{{ name }}</ItemCard
            >
        </div>
    </section>
</template>

<script>
import AbilityCard from "./AbilityCard.vue";
import ItemCard from "./ItemCard.vue";

export default {
    name: "MercenaryCard",
    props: {
        mercenary: {
            type: Object,
            required: true,
        },
        activeMerc: Object,
        mercName: {
            type: String,
            required: true,
        },
    },
    components: {
        AbilityCard,
        ItemCard,
    },
};
</script>