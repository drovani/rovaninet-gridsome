<template>
    <div class="ability bg-gray-100 rounded-md p-1 text-sm" :class="spellSchoolLower">
        <div class="h-20 text-center">{{ abilityName }} {{ activeTier }}</div>
        <div v-if="showDetails">
            <button @click="$emit('decrementActiveTier')">🔽</button>
            <button @click="$emit('incrementActiveTier')">🔼</button>
        </div>
        <div v-if="showDetails">{{ activeTierInfo.description }}</div>
        <div class="grid grid-cols-2 text-center">
            <div>{{ activeTierInfo.speed }}</div>
            <div>{{ activeTierInfo.cooldown }}</div>
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
        },
        showDetails: {
            type: Boolean,
            default: false
        },
        abilityName: {
            type: String,
            required: true
        }
    },
    emits: {
        decrementActiveTier: () => {
            if (this.activeTier <= 6 - this.ability.tiers.length) {
                return false;
            } else {
                return true;
            }
        },
        incrementActiveTier: () => {
            if (this.activeTier >= ability.tiers.length) {
                return false;
            } else {
                return true;
            }
        }
    },
    computed: {
        spellSchoolLower: function () {
            return this.ability.spell_school?.toLowerCase();
        },
        imagePath: function () {
            return `/images/mercs/${slug(this.ability.name)}.png`;
        },
        activeTierInfo: function () {
            return this.ability.tiers[this.activeTier - 1]
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