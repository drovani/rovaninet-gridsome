<template>
    <div
        class="health-value bg-center bg-contain bg-no-repeat text-center font-bold text-white"
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
.health-value {
    background-image: url("/images/mercs/neutral-health.png");
}
.protector {
    background-image: url("/images/mercs/protector-health.png");
}
.fighter {
    background-image: url("/images/mercs/fighter-health.png");
}
.caster {
    background-image: url("/images/mercs/caster-health.png");
}
</style>