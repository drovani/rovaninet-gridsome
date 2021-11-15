<template>
    <div class="item">
        <div>{{ item.name }} {{ activeTier }}</div>
        <div>{{ item.tiers[tierIndex].description }}</div>
        <div>Unlock: {{ item.unlock }}</div>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        activeTier: {
            type: Number,
            default: 1
        }
    },
    computed: {
        tierIndex: function () {
            return Math.min(this.activeTier - 1, this.item.tiers.length-1);
        }
    }
}
</script>
