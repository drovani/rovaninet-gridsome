<template>
    <div>{{ character.name }}</div>
</template>

<script lang="ts">

import Character from "../types/Character";

export default {
    name: "Character",
    data() {
        return {
            character : Character
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