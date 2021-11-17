<template>
    <div class="ability bg-gray-100 rounded-md p-1 text-sm" :class="spellSchoolLower">
        <div class="h-15 text-center">{{ abilityName }} {{ activeTier }}</div>
        <template v-if="showDetails">
            <div class="flex justify-center">
                <button @click="$emit('decrementActiveTier')">🔽</button>
                <button @click="$emit('incrementActiveTier')">🔼</button>
            </div>
            <div>{{ activeTierInfo.description }}</div>
        </template>
        <div class="grid grid-cols-3 lg:grid-cols-2 text-center">
            <div>{{ activeTierInfo.speed }}</div>
            <div>{{ activeTierInfo.cooldown }}</div>
            <div class="text-center lg:col-span-2">{{ ability.spell_school }}</div>
        </div>
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