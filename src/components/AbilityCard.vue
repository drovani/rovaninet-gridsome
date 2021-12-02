<template>
    <div
        class="bg-gray-50 rounded-md p-1 text-sm"
        :class="{
            'bg-yellow-100': ability.spell_school === 'Holy',
            'bg-red-100': ability.spell_school === 'Fire',
            'bg-green-100': ability.spell_school === 'Nature',
        }"
    >
        <div class="h-10 text-center">
            <slot />
            {{ activeTier }}
        </div>
        <template v-if="showDetails">
            <UpDownButtons
                :showDecrement="ability.tiers && tierIndex > 0"
                :showIncrement="ability.tiers && tierIndex < ability.tiers.length - 1"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            >
                <div v-if="costToMax > 0">{{ costToMax }}</div>
            </UpDownButtons>
            <div class="h-10 sm:h-32">{{ description }}</div>
        </template>
        <div class="grid grid-cols-3 lg:grid-cols-2 text-center">
            <div>
                {{ speed }}
                <img src="/images/mercs/speed.png" alt="Speed" class="h-4 w-4 inline" />
            </div>
            <div :class="{ invisible: cooldown === 0 }">
                {{ cooldown }}
                <img src="/images/mercs/cooldown.png" alt="Cooldown" class="h-4 w-4 inline" />
            </div>
            <div class="text-center lg:col-span-2 rounded">{{ ability.spell_school }}</div>
        </div>
    </div>
</template>
<script>
import UpDownButtons from "~/components/UpDownButtons.vue";

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
            required: true,
        },
        itemEquippedTier: {
            type: Object,
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
        description() {
            let desc = this.ability.description;
            const regex = new RegExp(/\{(\d+)\}/, "g");
            const matches = [...this.ability.description.matchAll(regex)];
            for (let i = 0; i < matches.length; i++) {
                const baseValue = Number(matches[i][1]);
                const tierValue = Number(
                    this.activeTierInfo.description instanceof Array
                        ? this.activeTierInfo.description[i]
                        : this.activeTierInfo.description
                );
                const itemValue = () => {
                    if (!this.itemEquippedTier?.modifier?.description) {
                        return 0;
                    } else if (this.itemEquippedTier.modifier.description instanceof Array) {
                        return this.itemEquippedTier.modifier.description[i];
                    } else if (this.itemEquippedTier.modifier.description instanceof Number) {
                        return this.itemEquippedTier.modifier.description;
                    }
                };
                desc = desc.replace(matches[i][0], baseValue + tierValue + itemValue());
            }
            if (this.itemEquippedTier?.modifier?.description instanceof Object) {
                if (this.itemEquippedTier.modifier.description.type === "append") {
                    desc = `${desc} ${this.itemEquippedTier.modifier.description.text}`;
                }
            }
            return desc;
        },
        speed() {
            if (this.itemEquippedTier?.modifier?.speed) {
                return (
                    this.ability.speed +
                    (this.activeTierInfo.speed ?? 0) +
                    this.itemEquippedTier.modifier.speed
                );
            }
            return this.ability.speed + (this.activeTierInfo.speed ?? 0);
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
    components: { UpDownButtons },
};
</script>