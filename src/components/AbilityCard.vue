<template>
    <div
        class="bg-gray-50 rounded-md p-1 text-sm"
        :class="{
            'bg-yellow-100': ability.spell_school === 'Holy',
            'bg-red-100': ability.spell_school === 'Fire',
            'bg-green-100': ability.spell_school === 'Nature',
            'bg-blue-100': ability.spell_school === 'Arcane',
        }"
    >
        <div
            class="h-12 text-center text-base mb-1"
            :class="{ 'text-base': !showDetails, 'text-xl': showDetails }"
        >
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
            <div class="h-16 sm:h-32">{{ description }}</div>
        </template>
        <div class="grid grid-cols-3 lg:grid-cols-2 text-center">
            <div :class="{ invisible: speed <= 0 }">
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
        description() {
            let desc = this.ability.description;
            const regex = new RegExp(/\{([\w\d\s]+)\}/, "g");
            const matches = [...this.ability.description.matchAll(regex)];
            for (let i = 0; i < matches.length; i++) {
                if (!isNaN(matches[i][1])) {
                    // Found {0}
                    const baseValue = Number(matches[i][1]);
                    const tierValue = () => {
                        if (Array.isArray(this.activeTierInfo.description)) {
                            return Number(this.activeTierInfo.description[i]) || 0;
                        } else {
                            return Number(this.activeTierInfo.description) || 0;
                        }
                    };
                    const itemValue = () => {
                        if (Array.isArray(this.itemEquippedTier?.modifier?.description)) {
                            return Number(this.itemEquippedTier.modifier.description[i]) || 0;
                        } else {
                            return Number(this.itemEquippedTier?.modifier?.description) || 0;
                        }
                    };
                    // console.debug({ baseValue, tierValue: tierValue(), itemValue: itemValue() });
                    desc = desc.replace(matches[i][0], baseValue + tierValue() + itemValue());
                } else {
                    // Found {string}
                    /*
                    console.debug({
                        index: i,
                        match: matches[i][1],
                        itemEquippedTier: this.itemEquippedTier?.modifier?.description,
                        activeTierInfo: this.activeTierInfo?.description,
                    });
                    */
                    if (
                        Array.isArray(this.itemEquippedTier?.modifier?.description) &&
                        this.itemEquippedTier.modifier.description[i] !== undefined
                    ) {
                        // replace {string} with modifier
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description[i]
                        );
                    } else if (this.itemEquippedTier?.modifier?.description !== undefined) {
                        // replace {string} with modifier
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description
                        );
                    } else if (
                        Array.isArray(this.activeTierInfo.description) &&
                        this.activeTierInfo.description[i] !== undefined
                    ) {
                        // replace {string} with active tier replacement
                        desc = desc.replace(matches[i][0], this.activeTierInfo.description[i]);
                    } else {
                        // replace {string} with string (i.e. remove braces)
                        desc = desc.replace(matches[i][0], matches[i][1]);
                    }
                }
            }
            if (this.itemEquippedTier?.modifier?.description instanceof Object) {
                if (this.itemEquippedTier.modifier.description.type === "append") {
                    desc = `${desc} ${this.itemEquippedTier.modifier.description.text}`;
                }
            }
            return desc.replaceAll("{", "").replaceAll("}", "");
        },
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
    components: { UpDownButtons },
};
</script>