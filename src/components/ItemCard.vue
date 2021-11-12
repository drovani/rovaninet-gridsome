<template>
    <div class="item">
        <div>{{ item.name }} {{ itemTier }}</div>
        <div>{{ item.tiers[this.currentTier].description }}</div>
        <div>Unlock: {{ item.unlock }}</div>
    </div>
</template>
<script>
export default {
    props: ['item'],
    data: function () {
        return {
            currentTier: 0
        }
    },
    computed: {
        itemTier: function () {
            return 5 - this.item.tiers.length + this.currentTier;
        }
    }
}
</script>
