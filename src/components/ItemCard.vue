<template>
    <div class="item">
        <div>{{ itemName }} {{ activeTier }}</div>
        <div v-if="showDetails">{{ item.tiers[tierIndex].description }}</div>
        <div>Unlock: {{ item.unlock }}</div>
    </div>
</template>
<script>
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
            return Math.min(this.activeTier - 1, this.item.tiers.length-1);
        }
    }
}
</script>
