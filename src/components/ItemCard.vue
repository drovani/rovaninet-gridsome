<template>
    <div class="item">
        <div class="h-12 text-center">{{ itemName }} {{ activeTier }}</div>
        <template v-if="showDetails">
            <div>Unlock: {{ item.unlock }}</div>
            <UpDownButtons
                :showDecrement="tierIndex <= 0"
                :showIncrement="tierIndex >= item.tiers.length - 1"
                @decrement="$emit('decrementActiveTier')"
                @increment="$emit('incrementActiveTier')"
            ></UpDownButtons>
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
            type: Number,
            default: 1
        },
        showDetails: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tierIndex: function () {
            return Math.min(this.activeTier - 1, this.item.tiers.length - 1);
        },
        activeTierInfo: function () {
            return this.item.tiers[this.tierIndex]
        }
    },
    components: {
        UpDownButtons
    }
}
</script>
