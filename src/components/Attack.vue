<template>
    <div
        class="attack-value bg-center bg-contain bg-no-repeat text-center font-bold text-white"
        :class="role.toLowerCase()"
    >
        {{ value }}
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.attack-value {
    background-image: url("/images/mercs/neutral-attack.png");
}
.protector {
    background-image: url("/images/mercs/protector-attack.png");
}
.fighter {
    background-image: url("/images/mercs/fighter-attack.png");
}
.caster {
    background-image: url("/images/mercs/caster-attack.png");
}
</style>