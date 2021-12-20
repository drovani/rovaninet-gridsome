<template>
    <div>
        <p
            :class="{
                'text-sm': description.length > 60,
            }"
        >
            {{ description }}
        </p>
        <div class="grid grid-cols-3 justify-items-center rounded-xl bg-gray-50 bg-opacity-20 py-1">
            <Attack :role="summon.role" :value="summonAttack" class="h-8 w-8 text-xl p-1" />
            <div class="self-end font-semibold">{{ summon.race }}</div>
            <Health :role="summon.role" :value="summonHealth" class="h-8 w-8 text-xl p-1" />
        </div>
    </div>
</template>

<script>
import Attack from "~/components/Attack.vue";
import Health from "./Health.vue";

export default {
    props: {
        summon: {
            type: Object,
            required: true,
        },
        activeTierInfo: {
            type: Object,
            required: true,
        },
        itemEquippedTier: {
            type: Object,
            required: false,
        },
    },
    computed: {
        description() {
            let desc = this.summon.description;
            const regex = new RegExp(/\{([\w\d\s:\.]+)\}/, "g");
            const matches = [...this.summon.description.matchAll(regex)];
            for (let i = 0; i < matches.length; i++) {
                if (!isNaN(matches[i][1])) {
                    // Found {0}
                    const baseValue = Number(matches[i][1]);
                    const tierValue = () => {
                        if (Array.isArray(this.activeTierInfo.summon.description)) {
                            return Number(this.activeTierInfo.summon.description[i]) || 0;
                        } else {
                            return Number(this.activeTierInfo.summon.description) || 0;
                        }
                    };
                    const itemValue = () => {
                        if (Array.isArray(this.itemEquippedTier?.modifier?.description)) {
                            return Number(this.itemEquippedTier.modifier.description[i]) || 0;
                        } else {
                            return Number(this.itemEquippedTier?.modifier?.description) || 0;
                        }
                    };
                    // console.debug({ baseValue, tierValue: tierValue(), itemValue: itemValue() });
                    desc = desc.replace(matches[i][0], baseValue + tierValue() + itemValue());
                } else {
                    // Found {string}
                    /*
                    console.debug({
                        index: i,
                        match: matches[i][1],
                        itemEquippedTierModifier: this.itemEquippedTier?.modifier,
                        activeTierInfoDescription: this.activeTierInfo?.summon?.description,
                    });
*/
                    if (
                        Array.isArray(this.itemEquippedTier?.modifier?.description) &&
                        this.itemEquippedTier.modifier.description[i] !== undefined &&
                        this.itemEquippedTier.modifier.description[i] !== null
                    ) {
                        // replace {string} with modifier
                        //console.debug(this.itemEquippedTier.modifier.description[i]);
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description[i]
                        );
                    } else if (
                        !Array.isArray(this.itemEquippedTier?.modifier?.description) &&
                        this.itemEquippedTier?.modifier?.description !== undefined &&
                        this.itemEquippedTier.modifier.description !== null
                    ) {
                        // replace {string} with modifier
                        desc = desc.replace(
                            matches[i][0],
                            this.itemEquippedTier.modifier.description
                        );
                    } else if (
                        Array.isArray(this.activeTierInfo.summon.description) &&
                        this.activeTierInfo.summon.description[i] !== undefined &&
                        this.activeTierInfo.summon.description[i] !== null
                    ) {
                        // replace {string} with active tier replacement
                        desc = desc.replace(
                            matches[i][0],
                            this.activeTierInfo.summon.description[i]
                        );
                    } else if (
                        this.activeTierInfo.summon.description !== undefined &&
                        this.activeTierInfo.summon.description !== null
                    ) {
                        desc = desc.replace(matches[i][0], this.activeTierInfo.summon.description);
                    } else {
                        // replace {string} with string (i.e. remove braces)
                        desc = desc.replace(matches[i][0], matches[i][1]);
                    }
                }
            }
            if (this.itemEquippedTier?.modifier?.description instanceof Object) {
                if (this.itemEquippedTier.modifier.description.type === "append") {
                    desc = `${desc} ${this.itemEquippedTier.modifier.description.text}`;
                }
            }
            return desc.replaceAll("{", "").replaceAll("}", "");
        },
        summonAttack() {
            return (
                (this.summon.attack ?? 0) +
                (this.activeTierInfo.summon?.attack ?? 0) +
                (this.itemEquippedTier?.modifier?.summon?.attack ?? 0)
            );
        },
        summonHealth() {
            return (
                (this.summon.health ?? 0) +
                (this.activeTierInfo.summon?.health ?? 0) +
                (this.itemEquippedTier?.modifier?.summon?.health ?? 0)
            );
        },
    },
    components: { Attack, Health },
};
</script>

<style>
</style>