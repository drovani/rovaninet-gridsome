<template>
    <div class="ability bg-gray-100 rounded-md p-1 text-sm" :class="spell_school_lower">
        <div class="h-20 text-center">{{ ability.name }} {{ currentTier + 1 }}</div>
        <div class="grid grid-cols-2 text-center">
            <div>{{ ability.tiers[this.currentTier].speed }}</div>
            <div>{{ ability.tiers[this.currentTier].cooldown }}</div>
        </div>
        <p class="text-center">{{ ability.spell_school }}</p>
    </div>
</template>
<script>
export default {
    props: ['ability'],
    data: function () {
        return {
            currentTier: 0
        }
    },
    computed: {
        spell_school_lower: function () {
            return this.ability.spell_school?.toLowerCase();
        }
    }
}
</script>
<style>
div.ability.holy {
    @apply bg-yellow-100;
}
div.ability.fire {
    @apply bg-red-100;
}
</style>