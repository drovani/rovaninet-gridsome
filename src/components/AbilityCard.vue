<template>
    <div class="ability bg-gray-100 rounded-md p-1 text-sm" :class="spellSchoolLower">
        <div class="h-10 text-center">{{ abilityName }} {{ activeTier }}</div>
        <template v-if="showDetails">
            <UpDownButtons
                :showDecrement="tierIndex > 0"
                :showIncrement="tierIndex < ability.tiers.length - 1"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            >
                <div v-if="costToMax > 0">{{ costToMax }}</div>
            </UpDownButtons>
            <div class="h-10 sm:h-32">{{ activeTierInfo.description }}</div>
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
import UpDownButtons from '~/components/UpDownButtons.vue';

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
        },
        costToMax: {
            type: Number,
            required: true
        }
    },
    emits: {
        decrementActiveTier: () => {
            if (this.activeTier <= 6 - this.ability.tiers.length) {
                return false;
            }
            else {
                return true;
            }
        },
        incrementActiveTier: () => {
            if (this.activeTier >= ability.tiers.length) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    computed: {
        spellSchoolLower() {
            return this.ability.spell_school?.toLowerCase();
        },
        imagePath() {
            return `/images/mercs/${slug(this.ability.name)}.png`;
        },
        tierIndex() {
            return Math.min((this.activeTier ?? 1) - 1, this.ability.tiers.length - 1);
        },
        activeTierInfo() {
            return this.ability.tiers[this.activeTier - 1];
        }
    },
    components: { UpDownButtons }
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