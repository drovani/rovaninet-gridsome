<template>
    <div class="item text-sm">
        <div class="h-12 text-center text-base">
            <slot />
            {{ displayTier }}
        </div>
        <template v-if="showDetails">
            <div class="flex rounded px-2" :class="{ 'bg-yellow-100': !isUnlocked }">
                <div class="flex-grow">
                    Unlock: {{ item.unlock }}
                </div>
                <button @click.prevent="$emit('toggleItemEquipped')">
                    <app-icon
                        :icon="['fas', 'thumbtack']"
                        :class="{ 'fa-rotate-90': isEquiped }"
                    ></app-icon>
                </button>
            </div>
            <UpDownButtons
                :showDecrement="tierIndex > 0"
                :showIncrement="item.tiers !== undefined && tierIndex < item.tiers.length - 1"
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
                return Math.min((this.activeTier ?? 1) - 1, this.item.tiers.length - 1);
            } else return null;
        },
        activeTierInfo() {
            return this.item.tiers[this.activeTier - 1];
        },
        description() {
            if (this.item.tiers instanceof Array) {
                let desc = this.item.description;
                const regex = new RegExp(/\{(\d+)\}/, "g");
                const matches = [...this.item.description.matchAll(regex)];
                for (let i = 0; i < matches.length; i++) {
                    const baseValue = Number(matches[i][1]);
                    const tierValue = Number(
                        this.activeTierInfo.description instanceof Array
                            ? this.activeTierInfo.description[i]
                            : this.activeTierInfo.description
                    );
                    desc = desc.replace(matches[i][0], baseValue + tierValue);
                }
                return desc;
            } else {
                return this.item.description;
            }
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
