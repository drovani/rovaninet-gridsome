<template>
    <div
        class="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 rounded-md p-1 text-center"
        :class="{
            'to-yellow-100': ability.spell_school === 'Holy',
            'to-red-300': ability.spell_school === 'Fire',
            'to-green-200': ability.spell_school === 'Nature',
            'to-blue-100': ability.spell_school === 'Arcane',
            'to-blue-500':ability.spell_school === 'Frost',
            'to-gray-600': ability.spell_school === 'Shadow',
            'to-purple-400': ability.spell_school === 'Fel',
            'from-gray-200 via-gray-200  to-yellow-700': ability.summon,
        }"
    >
        <div class="h-12 mb-1" :class="{ 'text-sm': !showDetails, 'text-xl': showDetails }">
            <slot />
            {{ activeTier }}
        </div>
        <template v-if="showDetails">
            <UpDownButtons
                class="px-4"
                :showDecrement="ability.tiers && tierIndex > 0"
                :showIncrement="ability.tiers && tierIndex < ability.tiers.length - 1"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            >
                <div :class="{ invisible: costToMax <= 0 }">{{ costToMax }}</div>
            </UpDownButtons>
            <AbilityDescription
                v-if="ability.description"
                class="h-16 sm:h-32"
                :abilityDescription="ability.description"
                :activeTierInfo="activeTierInfo"
                :itemEquippedTier="itemEquippedTier"
            ></AbilityDescription>
            <SummonDescription
                v-else-if="ability.summon"
                class="h-16 sm:h-32"
                :summon="ability.summon"
                :activeTierInfo="activeTierInfo"
                :itemEquippedTier="itemEquippedTier"
            >
            </SummonDescription>
        </template>
        <div
            class="grid grid-cols-2 text-center"
            :class="{ 'text-base': !showDetails, 'text-xl sm:text-base lg:text-xl': showDetails }"
        >
            <div :class="{ invisible: speed <= 0 }">
                {{ speed }}
                <img src="/images/mercs/speed.png" alt="Speed" class="h-4 w-4 inline" />
            </div>
            <div :class="{ invisible: cooldown === 0 }">
                {{ cooldown }}
                <img src="/images/mercs/cooldown.png" alt="Cooldown" class="h-4 w-4 inline" />
            </div>
            <div class="text-center col-span-2 rounded">{{ ability.spell_school }}</div>
        </div>
    </div>
</template>
<script>
import UpDownButtons from "~/components/UpDownButtons.vue";
import AbilityDescription from "~/components/AbilityDescription.vue";
import SummonDescription from "~/components/SummonDescription.vue";

export default {
    props: {
        ability: Object,
        activeTier: {
            type: Number,
            default: 1,
        },
        showDetails: {
            type: Boolean,
            default: false,
        },
        costToMax: {
            type: Number,
            default: 0,
        },
        itemEquippedTier: {
            type: Object,
            required: false,
        },
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
        },
    },
    computed: {
        speed() {
            if (this.itemEquippedTier?.modifier?.speed) {
                return (
                    this.ability.speed +
                    (this.activeTierInfo.speed ?? 0) +
                    this.itemEquippedTier.modifier.speed
                );
            }
            return (this.ability.speed ?? 0) + (this.activeTierInfo.speed ?? 0);
        },
        cooldown() {
            if (this.itemEquippedTier?.modifier?.cooldown) {
                return (
                    (this.ability.cooldown ?? 0) +
                    (this.activeTierInfo.cooldown ?? 0) +
                    this.itemEquippedTier.modifier.cooldown
                );
            }
            return (this.ability.cooldown ?? 0) + (this.activeTierInfo.cooldown ?? 0);
        },
        tierIndex() {
            return Math.min((this.activeTier ?? 1) - 1, this.ability.tiers.length - 1);
        },
        activeTierInfo() {
            return this.ability.tiers[this.activeTier - 1];
        },
    },
    components: { UpDownButtons, AbilityDescription, SummonDescription },
};
</script>