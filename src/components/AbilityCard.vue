<template>
    <div class="ability bg-gray-100 rounded-md p-1 text-sm" :class="spellSchoolLower">
        <div class="h-20 text-center">{{ ability.name }} {{ activeTier }}</div>
        <div>
            <img :src="imagePath" :alt="ability.name" />
        </div>
        <div class="grid grid-cols-2 text-center">
            <div>{{ ability.tiers[this.activeTier - 1].speed }}</div>
            <div>{{ ability.tiers[this.activeTier - 1].cooldown }}</div>
        </div>
        <p class="text-center">{{ ability.spell_school }}</p>
    </div>
</template>
<script>
import slug from 'slug';

export default {
    props: {
        ability: Object,
        activeTier: {
            type: Number,
            default: 1
        }
    },
    computed: {
        spellSchoolLower: function () {
            return this.ability.spell_school?.toLowerCase();
        },
        imagePath: function(){
            return `/images/mercs/${ slug(this.ability.name) }.png`;
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