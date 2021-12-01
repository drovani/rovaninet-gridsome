<template>
    <div
        class="bg-gray-100 rounded-md p-1 text-sm"
        :class="{
            'bg-yellow-100': ability.spell_school === 'Holy',
            'bg-red-100': ability.spell_school === 'Fire',
            'bg-green-100': ability.spell_school === 'Nature'
        }"
    >
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
            <div class="h-10 sm:h-32">{{ description }}</div>
        </template>
        <div class="grid grid-cols-3 lg:grid-cols-2 text-center">
            <div>{{ speed }}</div>
            <div>{{ cooldown }}</div>
            <div class="text-center lg:col-span-2">{{ ability.spell_school }}</div>
        </div>
    </div>
</template>
<script>
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
        },
        itemEquippedTier: {
            type: Object
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
        description() {
            if (this.itemEquippedTier?.modifier?.description) {
                let desc = this.activeTierInfo.description;
                const regex = new RegExp(/\{(\d+)\}/, 'g');
                const matches = [...desc.matchAll(regex)];
                for (let i = 0; i < matches.length; i++) {
                    desc = desc.replace(matches[i][0], this.itemEquippedTier.modifier.description[i] + Number(matches[i][1]));
                }
                return desc;
            }
            return this.activeTierInfo.description.replaceAll('{', '').replaceAll('}', '');
        },
        speed() {
            if (this.itemEquippedTier?.modifier?.speed) {
                return this.activeTierInfo.speed + this.itemEquippedTier.modifier.speed;
            }
            return this.activeTierInfo.speed;
        },
        cooldown() {
            if (this.itemEquippedTier?.modifier?.cooldown) {
                return this.activeTierInfo.cooldown + this.itemEquippedTier.modifier.cooldown;
            }
            return this.activeTierInfo.cooldown;
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