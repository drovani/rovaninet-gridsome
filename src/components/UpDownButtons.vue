<template>
    <div
        class="grid justify-center text-center text-xl sm:text-base"
        :class="{ 'grid-cols-3': $slots.default, 'grid-cols-2': !$slots.default }"
    >
        <button @click="$emit('decrement')" :class="{ invisible: !showDecrement }">
            <app-icon :icon="['fas', downIcon]"></app-icon>
        </button>
        <slot />
        <button @click="$emit('increment')" :class="{ invisible: !showIncrement }">
            <app-icon :icon="['fas', upIcon]"></app-icon>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        showDecrement: {
            type: Boolean,
            default: true,
        },
        showIncrement: {
            type: Boolean,
            default: true,
        },
        upIcon: { type: String, default: "arrow-circle-up" },
        downIcon: {
            type: String,
            default: "arrow-circle-down",
        },
    },
    emits: ["decrement", "increment"],
};
</script>

<style>
</style>