<template>
    <div class="item text-center text-sm">
        <div class="h-12 text-base">
            <slot />
            {{ displayTier }}
        </div>
        <template v-if="showDetails">
            <div class="flex rounded px-2" :class="{ 'bg-yellow-100': !isUnlocked }">
                <div class="flex-grow">Unlock: {{ item.unlock }}</div>
                <button @click.prevent="$emit('toggleItemEquipped')">
                    <app-icon
                        :icon="['fas', 'thumbtack']"
                        :class="{ 'fa-rotate-90': isEquiped }"
                    ></app-icon>
                </button>
            </div>
            <UpDownButtons
                :showDecrement="item.tiers !== undefined && activeTier > 4 - item.tiers.length + 1"
                :showIncrement="item.tiers !== undefined && activeTier < 4"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            >
                <div v-if="costToMax > 0">{{ costToMax }}</div>
            </UpDownButtons>
            <div class="h-10 sm:h-32">{{ description }}</div>
        </template>
    </div>
</template>
<script>
import UpDownButtons from "~/components/UpDownButtons.vue";

export default {
    props: {
        item: Object,
        activeTier: {
            type: Number,
        },
        isEquiped: {
            type: Boolean,
            default: false,
        },
        isUnlocked: {
            type: Boolean,
            default: false,
        },
        costToMax: {
            type: Number,
            default: 0,
        },
        showDetails: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        tierIndex: function () {
            if (this.item.tiers instanceof Array) {
                return this.item.tiers.length - 4 + (this.activeTier - 1);
            } else return null;
        },
        activeTierInfo() {
            return this.item.tiers[this.tierIndex];
        },
        description() {
            let desc = this.item.description;

            if (this.item.tiers instanceof Array) {
                let tierDesc = Array.isArray(this.activeTierInfo.description)
                    ? this.activeTierInfo.description
                    : [this.activeTierInfo.description];

                const regex = new RegExp(/\{([\w \(\)]+)\}/, "g");
                const matches = [...desc.matchAll(regex)];
                for (let i = 0; i < matches.length; i++) {
                    if (isFinite(matches[i][1])) {
                        // Found {0}
                        const baseValue = Number(matches[i][1]);
                        const tierValue = Number(tierDesc[i]) || 0;

                        desc = desc.replace(matches[i][0], baseValue + tierValue);
                    } else if (tierDesc[i] != undefined && tierDesc[i] != null) {
                        // Found {string}
                        desc = desc.replace(matches[i][0], tierDesc[i]);
                    }
                }
            }
            return desc.replaceAll("{", "").replaceAll("}", "");
        },
        displayTier() {
            return this.activeTier || 5 - (this.item.tiers?.length ?? 1);
        },
    },
    components: {
        UpDownButtons,
    },
};
</script>
