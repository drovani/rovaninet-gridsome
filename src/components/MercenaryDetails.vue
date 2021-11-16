<template>
    <section
        :class="mercenary.role.toLowerCase()"
        class="p-2 border-2 rounded-md grid grid-cols-4 space-x-2 space-y-4"
    >
        <div class="text-center row-span-6">
            <h2 class="bg-gray-900 text-white rounded-md">
                {{ mercName }}
                <span v-if="collected" class="float-right">✔</span>
            </h2>
            <span>{{ mercenary.race }}</span>
        </div>
        <div class="col-span-3 text-center mb-4">Abilities</div>
        <AbilityCard
            v-for="(ability, name) in mercenary.abilities"
            :key="name"
            :abilityName="name"
            :ability="ability"
            :activeTier="collected && collected.abilities[name]"
            :showDetails="true"
            @decrementActiveTier="$emit('decrementAbilityActiveTier', mercName, name)"
            @incrementActiveTier="$emit('incrementAbilityActiveTier', mercName, name)"
        />
        <div class="col-span-3 text-center mb-4">Equipment</div>
        <ItemCard
            v-for="(item, name) in mercenary.equipment"
            :key="name"
            :itemName="name"
            :item="item"
            :activeTier="collected && collected.equipment[name]"
            :showDetails="true"
            @decrementActiveTier="$emit('decrementItemActiveTier', mercName, name)"
            @incrementActiveTier="$emit('incrementItemActiveTier', mercName, name)"
        />
    </section>
</template>

<script>

import AbilityCard from './AbilityCard.vue';
import ItemCard from './ItemCard.vue';

export default {
    name: "MercenaryDetails",
    props: {
        mercenary: Object,
        collected: Object,
        mercName: String
    },
    emits: ['decrementAbilityActiveTier', 'incrementAbilityActiveTier', 'decrementItemActiveTier', 'incrementItemActiveTier'],
    components: {
        AbilityCard,
        ItemCard
    }
}
</script>