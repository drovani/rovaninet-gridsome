<template>
    <div class="item">
        <div class="h-12 text-center">{{ itemName }} {{ activeTier || 5 - item.tiers.length }}</div>
        <template v-if="showDetails">
            <div class="flex">
                <div class="flex-grow">Unlock: {{ item.unlock }}</div>
                <div @click="$emit('toggleItemEquipped')">
                    <app-icon :icon="['fas', 'thumbtack']" :class="{ 'fa-rotate-90': isEquiped }"></app-icon>
                </div>
            </div>
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
        isEquiped: {
            type: Boolean,
            default: false
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
