<template>
    <section
        :class="mercenary.role.toLowerCase()"
        class="p-2 border-2 rounded-md relative inline-block"
    >
        <button
            class="absolute top-1 right-1 w-6 inline hidden sm:inline"
            @click="$emit('closeMercDetails')"
        >
            <app-icon :icon="['fas', 'times-circle']"></app-icon>
        </button>
        <div class="grid grid-cols-1 sm:grid-cols-4 sm:space-x-2 space-y-4">
            <div class="sm:row-span-6">
                <header class="text-center bg-gray-900 text-white rounded-md flex px-1">
                    <span v-if="collected">
                        <app-icon :icon="['fas', 'check']"></app-icon>
                    </span>
                    <h2 class="flex-grow">{{ mercName }}</h2>
                    <button class="float-right sm:hidden" @click="$emit('closeMercDetails')">
                        <app-icon :icon="['fas', 'times-circle']"></app-icon>
                    </button>
                </header>
                <div class="text-center">{{ mercenary.race }}</div>
            </div>
            <div class="sm:col-span-3 text-center mt-4">Abilities</div>
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
            <div class="sm:col-span-3 text-center mb-4">Equipment</div>
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
        </div>
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
    emits: ['closeMercDetails', 'decrementAbilityActiveTier', 'incrementAbilityActiveTier', 'decrementItemActiveTier', 'incrementItemActiveTier'],
    components: {
        AbilityCard,
        ItemCard
    }
}
</script>