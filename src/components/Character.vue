<template>
    <div class="hsm_character">{{ character.name }}</div>
</template>

<script>
export default {
    name: "Character",
    data() {
        return {
            character: {
                name: "Default Name"
            }
        }
    }
}
</script>

<style>
.hsm_character {
    padding: 1rem;
    border: thin solid green;
}
</style>