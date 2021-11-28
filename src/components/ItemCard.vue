<template>
    <div class="item">
        <div class="h-12 text-center">{{ itemName }} {{ activeTier || 5 - item.tiers.length }}</div>
        <template v-if="showDetails">
            <div>Unlock: {{ item.unlock }}</div>
            <UpDownButtons
                :showDecrement="tierIndex > 0"
                :showIncrement="tierIndex < item.tiers.length - 1"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            >
                <div v-if="costToMax > 0">{{ costToMax }}</div>
            </UpDownButtons>
            <div class="h-10 sm:h-32">{{ activeTierInfo.description }}</div>
        </template>
    </div>
</template>
<script>
import UpDownButtons from '~/components/UpDownButtons.vue';
const upgradeCosts = [100, 150, 175];

export default {
    props: {
        itemName: {
            type: String,
            required: true
        },
        item: Object,
        activeTier: {
            type: Number
        },
        costToMax: {
            type: Number,
            required: true
        },
        showDetails: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tierIndex: function () {
            return Math.min((this.activeTier ?? 1) - 1, this.item.tiers.length - 1);
        },
        activeTierInfo: function () {
            return this.item.tiers[this.tierIndex || 0]
        },
    },
    components: {
        UpDownButtons
    }
}
</script>
