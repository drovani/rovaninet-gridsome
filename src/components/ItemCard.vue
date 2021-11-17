<template>
    <div class="item">
        <div class="md:text-center">{{ itemName }} {{ activeTier }}</div>
        <template v-if="showDetails">
            <div>Unlock: {{ item.unlock }}</div>
            <div class="flex justify-center">
                <button
                    @click="$emit('decrementActiveTier')"
                    :class="{ invisible: tierIndex <= 0 }"
                >🔽</button>
                <button
                    @click="$emit('incrementActiveTier')"
                    :class="{ invisible: tierIndex >= item.tiers.length - 1 }"
                >🔼</button>
            </div>
            <div>{{ activeTierInfo.description }}</div>
        </template>
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
            return Math.min(this.activeTier - 1, this.item.tiers.length - 1);
        },
        activeTierInfo: function () {
            return this.item.tiers[this.tierIndex]
        }
    }
}
</script>
