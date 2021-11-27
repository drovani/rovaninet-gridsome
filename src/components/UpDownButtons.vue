<template>
    <div class="flex justify-center text-2xl sm:text-lg grid grid-cols-2 justify-center sm:px-4">
        <button @click="$emit('decrement')" :class="{ invisible: showDecrement }">
            <app-icon :icon="['fas', 'arrow-circle-down']"></app-icon>
        </button>
        <button @click="$emit('increment')" :class="{ invisible: showIncrement }">
            <app-icon :icon="['fas', 'arrow-circle-up']"></app-icon>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        showDecrement: {
            type: Boolean,
            default: true
        },
        showIncrement: {
            type: Boolean,
            default: true
        },
    },
    emits: ['decrement', 'increment']
}
</script>

<style>
</style>